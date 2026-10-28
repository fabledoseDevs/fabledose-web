'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  type ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { normalizeChildPolicy } from '@/config/childPolicy';
import {
  createChildProfile,
  deleteChildProfile,
  editChildProfile,
  normalizeChildProfile,
  updateChildPolicy,
} from '@/config/childProfiles';
import type {
  ChildProfile,
  ChildProfileDraft,
} from '@/config/childProfiles.types';
import { auth, db } from '@/config/firebase';

import type {
  ChildProfilesContextValue,
  ChildProfilesProviderProps,
} from './ChildProfilesContext.types';

const Context = createContext<ChildProfilesContextValue | null>(null);
const storageKey = (uid: string) => `fabledose:profile:${uid}`;
const readSelection = (uid: string): string | null => {
  try {
    return localStorage.getItem(storageKey(uid));
  } catch {
    return null;
  }
};

export const ChildProfilesProvider = ({
  children,
}: ChildProfilesProviderProps): ReactElement => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [activeProfileId, setActive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [revision, setRevision] = useState(0);
  const epoch = useRef(0);
  const busy = useRef(false);
  const selected = useRef<string | null>(null);
  const select = useCallback((uid: string, id: string | null) => {
    if (selected.current !== id) {
      window.dispatchEvent(new Event('fabledose:profile-changing'));
      selected.current = id;
      setActive(id);
      setRevision(value => value + 1);
    }
    try {
      if (id) localStorage.setItem(storageKey(uid), id);
      else localStorage.removeItem(storageKey(uid));
    } catch {
      /* Selection still works when browser storage is unavailable. */
    }
  }, []);
  useEffect(() => {
    let unsubscribe = () => {};
    const stopAuth = onAuthStateChanged(auth, user => {
      const token = ++epoch.current;
      unsubscribe();
      busy.current = false;
      setSaving(false);
      setError(false);
      setLoading(Boolean(user));
      setProfiles([]);
      selected.current = null;
      setActive(null);
      setRevision(value => value + 1);
      setUserId(user?.uid ?? null);
      if (!user) return;
      let first = true;
      unsubscribe = onSnapshot(
        collection(db, 'users', user.uid, 'childProfiles'),
        { includeMetadataChanges: true },
        snapshot => {
          if (token !== epoch.current || auth.currentUser?.uid !== user.uid)
            return;
          if (snapshot.metadata.hasPendingWrites) return;
          const next = snapshot.docs
            .flatMap(item => {
              const data = item.data();
              try {
                const draft = normalizeChildProfile(data as ChildProfileDraft);
                if (!Number.isFinite(data.createdAt)) return [];
                return [
                  {
                    ...draft,
                    policy: normalizeChildPolicy(data.policy),
                    id: item.id,
                    createdAt: data.createdAt as number,
                    deleting: data.deleting === true,
                  },
                ];
              } catch {
                return [];
              }
            })
            .sort(
              (a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id),
            );
          setProfiles(next);
          const wanted = first ? readSelection(user.uid) : selected.current;
          first = false;
          select(
            user.uid,
            next.some(item => item.id === wanted && !item.deleting)
              ? wanted
              : null,
          );
          setLoading(false);
          setError(false);
        },
        () => {
          if (token !== epoch.current) return;
          setLoading(false);
          setError(true);
        },
      );
    });
    return () => {
      ++epoch.current;
      unsubscribe();
      stopAuth();
    };
  }, [reload, select]);
  const mutate = async (
    operation: (uid: string) => Promise<unknown>,
  ): Promise<boolean> => {
    if (!userId || loading || busy.current || auth.currentUser?.uid !== userId)
      return false;
    const token = epoch.current;
    busy.current = true;
    setSaving(true);
    setError(false);
    try {
      await operation(userId);
      return token === epoch.current && auth.currentUser?.uid === userId;
    } catch {
      if (token === epoch.current) setError(true);
      return false;
    } finally {
      if (token === epoch.current) {
        busy.current = false;
        setSaving(false);
      }
    }
  };
  return (
    <Context.Provider
      value={{
        userId,
        profiles,
        activeProfileId,
        revision,
        loading,
        saving,
        error,
        retry: () => setReload(value => value + 1),
        selectProfile: id => {
          if (
            userId &&
            !loading &&
            !saving &&
            (id === null ||
              profiles.some(item => item.id === id && !item.deleting))
          )
            select(userId, id);
        },
        saveProfile: (draft, id) =>
          mutate(uid =>
            id
              ? editChildProfile(uid, id, draft)
              : createChildProfile(uid, draft),
          ),
        setStoryAvailable: (id, storyId, available) =>
          mutate(uid => updateChildPolicy(uid, id, { storyId, available })),
        saveSchedule: (id, schedule) =>
          mutate(uid => updateChildPolicy(uid, id, { schedule })),
        removeProfile: id => mutate(uid => deleteChildProfile(uid, id)),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useChildProfiles = (): ChildProfilesContextValue => {
  const context = useContext(Context);
  if (!context) throw new Error('ChildProfilesProvider is required');
  return context;
};
