'use client';

import type { User } from 'firebase/auth';
import {
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  updatePassword,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { auth } from '@/config/firebase';
import { getUserSettings, updateUserSettings } from '@/config/firestore';
import { useDictionary } from '@/lang/DictionaryProvider';

import type {
  FableFontFamily,
  LegacyNotificationAndCookiesSettings,
  Settings,
  SettingsContextType,
  SettingsProvider as SettingsProviderType,
  SettingsProviderProps,
  UserPlan,
  UseSettings,
} from './SettingsContext.types';

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

const DEFAULT_PLAN: UserPlan = 'free';
const DEFAULT_PASSWORD_PLACEHOLDER = '';
const DEFAULT_FONT_FAMILY: FableFontFamily = 'sans';

const normalizePlan = (plan: unknown): UserPlan =>
  plan === 'family' || plan === 'ultimate' ? plan : DEFAULT_PLAN;

const normalizeFontFamily = (fontFamily: unknown): FableFontFamily => {
  if (fontFamily === 'serif') {
    return 'serif';
  }

  if (fontFamily === 'dyslexic' || fontFamily === 'dyslexia') {
    return 'dyslexic';
  }

  return DEFAULT_FONT_FAMILY;
};

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
  const { settingsPage } = useDictionary();
  const [user, setUser] = useState<User | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [settingsLoadError, setSettingsLoadError] = useState(false);
  const [loadRevision, setLoadRevision] = useState(0);
  const retrySettingsLoad = useCallback(
    () => setLoadRevision(value => value + 1),
    [],
  );
  const settingsRef = useRef<Settings | null>(null);
  const latestPlanRefreshRef = useRef<number>(0);
  const sessionRef = useRef(0);
  const refreshInFlightRef = useRef<Promise<UserPlan> | null>(null);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, user => {
      const session = ++sessionRef.current;
      setSettingsLoadError(false);
      settingsRef.current = null;
      setSettings(null);
      latestPlanRefreshRef.current = 0;
      refreshInFlightRef.current = null;
      setUser(user);
      if (user) {
        getUserSettings(user.uid)
          .then(async userSettings => {
            if (
              !active ||
              session !== sessionRef.current ||
              auth.currentUser?.uid !== user.uid
            )
              return;
            if (userSettings) {
              const settingsWithLegacySupport = userSettings as Settings &
                LegacyNotificationAndCookiesSettings;
              const normalizedPlan = normalizePlan(userSettings.plan);
              const normalizedUserSettings: Settings = {
                ...userSettings,
                plan: normalizedPlan,
                fontFamily: normalizeFontFamily(userSettings.fontFamily),
                password:
                  typeof userSettings.password === 'string'
                    ? userSettings.password
                    : DEFAULT_PASSWORD_PLACEHOLDER,
                notificationsNews:
                  settingsWithLegacySupport.notificationsNews ??
                  settingsWithLegacySupport.news ??
                  true,
                notificationsPayments:
                  settingsWithLegacySupport.notificationsPayments ??
                  settingsWithLegacySupport.payments ??
                  true,
                cookiesAnalytical:
                  settingsWithLegacySupport.cookiesAnalytical ??
                  settingsWithLegacySupport.analytical ??
                  true,
                cookiesMarketing:
                  settingsWithLegacySupport.cookiesMarketing ??
                  settingsWithLegacySupport.marketing ??
                  true,
              };

              // User document exists, check if email needs syncing
              if (user.email && userSettings.email !== user.email) {
                const updatedSettings = {
                  ...normalizedUserSettings,
                  email: user.email,
                };
                setSettings(updatedSettings);
                await updateUserSettings(user.uid, {
                  email: user.email,
                  plan: normalizedPlan,
                  password: normalizedUserSettings.password,
                  fontSize: userSettings.fontSize ?? 16,
                  fontFamily: normalizeFontFamily(userSettings.fontFamily),
                  textBackground: userSettings.textBackground ?? 'none',
                  backgroundIntensity: userSettings.backgroundIntensity ?? 50,
                  storyLanguage: userSettings.storyLanguage ?? 'auto',
                  illustrationAnimation:
                    userSettings.illustrationAnimation ?? true,
                  animationQuality: userSettings.animationQuality ?? 'high',
                  narration: userSettings.narration ?? true,
                  narrationVolume: userSettings.narrationVolume ?? 80,
                  backgroundMusic: userSettings.backgroundMusic ?? true,
                  musicVolume: userSettings.musicVolume ?? 60,
                  notificationsNews: normalizedUserSettings.notificationsNews,
                  notificationsPayments:
                    normalizedUserSettings.notificationsPayments,
                  cookiesAnalytical: normalizedUserSettings.cookiesAnalytical,
                  cookiesMarketing: normalizedUserSettings.cookiesMarketing,
                });
              } else {
                setSettings(normalizedUserSettings);

                if (
                  userSettings.plan !== normalizedPlan ||
                  typeof userSettings.password !== 'string' ||
                  userSettings.fontFamily !==
                    normalizedUserSettings.fontFamily ||
                  userSettings.illustrationAnimation === undefined ||
                  settingsWithLegacySupport.notificationsNews === undefined ||
                  settingsWithLegacySupport.notificationsPayments ===
                    undefined ||
                  settingsWithLegacySupport.cookiesAnalytical === undefined ||
                  settingsWithLegacySupport.cookiesMarketing === undefined
                ) {
                  await updateUserSettings(user.uid, {
                    plan: normalizedPlan,
                    password: normalizedUserSettings.password,
                    fontSize: userSettings.fontSize ?? 16,
                    fontFamily: normalizeFontFamily(userSettings.fontFamily),
                    textBackground: userSettings.textBackground ?? 'none',
                    backgroundIntensity: userSettings.backgroundIntensity ?? 50,
                    storyLanguage: userSettings.storyLanguage ?? 'auto',
                    illustrationAnimation:
                      userSettings.illustrationAnimation ?? true,
                    animationQuality: userSettings.animationQuality ?? 'high',
                    narration: userSettings.narration ?? true,
                    narrationVolume: userSettings.narrationVolume ?? 80,
                    backgroundMusic: userSettings.backgroundMusic ?? true,
                    musicVolume: userSettings.musicVolume ?? 60,
                    notificationsNews: normalizedUserSettings.notificationsNews,
                    notificationsPayments:
                      normalizedUserSettings.notificationsPayments,
                    cookiesAnalytical: normalizedUserSettings.cookiesAnalytical,
                    cookiesMarketing: normalizedUserSettings.cookiesMarketing,
                  });
                }
              }
            } else {
              // This is a new user, create their settings document
              const defaultSettings: Settings = {
                registrationCompleted: false,
                displayName: user.displayName || 'Anonymous',
                email: user.email || '',
                password: DEFAULT_PASSWORD_PLACEHOLDER,
                plan: DEFAULT_PLAN,
                parentalControl: false,
                fontSize: 16,
                fontFamily: DEFAULT_FONT_FAMILY,
                textBackground: 'none',
                backgroundIntensity: 50,
                storyLanguage: 'auto',
                illustrationAnimation: true,
                animationQuality: 'high',
                narration: true,
                narrationVolume: 80,
                backgroundMusic: true,
                musicVolume: 60,
                notificationsNews: true,
                notificationsPayments: true,
                cookiesAnalytical: true,
                cookiesMarketing: true,
              };
              await updateUserSettings(user.uid, defaultSettings);
              if (
                active &&
                session === sessionRef.current &&
                auth.currentUser?.uid === user.uid
              ) {
                setSettings(defaultSettings);
              }
            }
          })
          .catch(error => {
            if (active && session === sessionRef.current) {
              setSettings(null);
              setSettingsLoadError(true);
              console.error('Failed to load settings', error);
            }
          });
      } else {
        setSettings(null);
      }
    });

    return () => {
      active = false;
      ++sessionRef.current;
      unsubscribe();
    };
  }, [loadRevision]);

  const completeRegistration = useCallback(async (): Promise<void> => {
    if (!user || !settingsRef.current || auth.currentUser?.uid !== user.uid) {
      throw new Error('Account settings are not ready.');
    }
    if (settingsRef.current.registrationCompleted !== false) return;
    const session = sessionRef.current;
    const patch: Partial<Settings> = {
      plan: DEFAULT_PLAN,
      registrationCompleted: true,
    };
    await updateUserSettings(user.uid, patch);
    if (session !== sessionRef.current || auth.currentUser?.uid !== user.uid) {
      throw new Error('Account changed during registration.');
    }
    setSettings(previous => (previous ? { ...previous, ...patch } : previous));
  }, [user]);

  const updateSettings = useCallback(
    (newSettings: Partial<Settings>): void => {
      if (!user || !settingsRef.current || auth.currentUser?.uid !== user.uid)
        return;
      setSettings(previous =>
        previous ? { ...previous, ...newSettings } : previous,
      );
      void updateUserSettings(user.uid, newSettings).catch(error => {
        console.error('Failed to save settings', error);
      });
    },
    [user],
  );

  const refreshPlanFromFirebase = useCallback(async (): Promise<UserPlan> => {
    const now = Date.now();
    const cacheWindowMs = 5000;

    if (!user || auth.currentUser?.uid !== user.uid) {
      return DEFAULT_PLAN;
    }

    if (refreshInFlightRef.current) {
      return refreshInFlightRef.current;
    }

    if (
      settingsRef.current &&
      now - latestPlanRefreshRef.current < cacheWindowMs &&
      settingsRef.current.plan
    ) {
      return normalizePlan(settingsRef.current.plan);
    }

    const session = sessionRef.current;
    const request = (async () => {
      const userSettings = await getUserSettings(user.uid);
      if (session !== sessionRef.current || auth.currentUser?.uid !== user.uid)
        return DEFAULT_PLAN;
      const refreshedPlan = normalizePlan(userSettings?.plan);

      if (settingsRef.current?.plan !== refreshedPlan) {
        setSettings(previous =>
          previous ? { ...previous, plan: refreshedPlan } : previous,
        );
      }

      if (userSettings?.plan !== refreshedPlan) {
        await updateUserSettings(user.uid, { plan: refreshedPlan });
      }

      latestPlanRefreshRef.current = Date.now();
      return refreshedPlan;
    })();

    refreshInFlightRef.current = request;
    try {
      return await request;
    } catch (error) {
      console.error('Failed to refresh plan', error);
      return auth.currentUser?.uid === user.uid
        ? normalizePlan(settingsRef.current?.plan)
        : DEFAULT_PLAN;
    } finally {
      if (refreshInFlightRef.current === request)
        refreshInFlightRef.current = null;
    }
  }, [user]);

  const updateUserEmail = async (newEmail: string) => {
    if (!user) {
      throw new Error('User must be logged in to update email.');
    }

    const actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true,
    };

    try {
      await verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings);
      updateSettings({ email: newEmail });
      alert(settingsPage.profile_n_account.email.verificationEmailSent);
    } catch (error) {
      console.error('Error sending verification email:', error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert(
          'An unknown error occurred during email update. Contact support.',
        );
      }
    }
  };

  const updateUserPassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    if (!user) {
      throw new Error('User must be logged in to update password.');
    }

    if (!user.email) {
      throw new Error(
        'User email is missing. Password update is not possible.',
      );
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    updateSettings({ password: '*'.repeat(Math.max(newPassword.length, 8)) });
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        settingsLoadError,
        retrySettingsLoad,
        completeRegistration,
        updateSettings,
        refreshPlanFromFirebase,
        updateUserEmail,
        updateUserPassword,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
