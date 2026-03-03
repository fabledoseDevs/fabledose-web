'use client';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { auth } from '@/config/firebase';
import { getUserSettings, updateUserSettings } from '@/config/firestore';

import { debounce } from './debounce.helper';
import type {
  Settings,
  SettingsContextType,
  SettingsProvider as SettingsProviderType,
  SettingsProviderProps,
  UseSettings,
} from './SettingsContext.types';

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const useSettings: UseSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: SettingsProviderType = ({
  children,
}: SettingsProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (user) {
        getUserSettings(user.uid).then(userSettings => {
          if (userSettings) {
            setSettings(userSettings);
          } else {
            // Initialize with default settings if none exist
            const defaultSettings = {
              displayName: user.displayName || 'Anonymous',
            };
            setSettings(defaultSettings);
            updateUserSettings(user.uid, defaultSettings);
          }
        });
      } else {
        setSettings(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const debouncedUpdate = useCallback(
    debounce((userId: string, newSettings: Partial<Settings>) => {
      updateUserSettings(userId, newSettings);
    }, 1000),
    [],
  );

  const updateSettings = (newSettings: Partial<Settings>) => {
    if (settings && user) {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);
      debouncedUpdate(user.uid, updatedSettings);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
