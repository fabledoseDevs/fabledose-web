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

import { debounce } from './debounce.helper';
import type {
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

const normalizePlan = (plan: unknown): UserPlan =>
  plan === 'family' || plan === 'ultimate' ? plan : DEFAULT_PLAN;

type LegacyNotificationAndCookiesSettings = {
  news?: boolean;
  payments?: boolean;
  analytical?: boolean;
  marketing?: boolean;
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
  const settingsRef = useRef<Settings | null>(null);
  const latestPlanRefreshRef = useRef<number>(0);
  const refreshInFlightRef = useRef<Promise<UserPlan> | null>(null);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (user) {
        getUserSettings(user.uid).then(userSettings => {
          if (userSettings) {
            const settingsWithLegacySupport = userSettings as Settings &
              LegacyNotificationAndCookiesSettings;
            const normalizedPlan = normalizePlan(userSettings.plan);
            const normalizedUserSettings: Settings = {
              ...userSettings,
              plan: normalizedPlan,
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
              updateUserSettings(user.uid, {
                email: user.email,
                plan: normalizedPlan,
                password: normalizedUserSettings.password,
                fontSize: userSettings.fontSize ?? 16,
                fontFamily: userSettings.fontFamily ?? 'sans',
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
                userSettings.fontFamily === undefined ||
                userSettings.illustrationAnimation === undefined ||
                settingsWithLegacySupport.notificationsNews === undefined ||
                settingsWithLegacySupport.notificationsPayments === undefined ||
                settingsWithLegacySupport.cookiesAnalytical === undefined ||
                settingsWithLegacySupport.cookiesMarketing === undefined
              ) {
                updateUserSettings(user.uid, {
                  plan: normalizedPlan,
                  password: normalizedUserSettings.password,
                  fontSize: userSettings.fontSize ?? 16,
                  fontFamily: userSettings.fontFamily ?? 'sans',
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
              displayName: user.displayName || 'Anonymous',
              email: user.email || '',
              password: DEFAULT_PASSWORD_PLACEHOLDER,
              plan: DEFAULT_PLAN,
              parentalControl: false,
              fontSize: 16,
              fontFamily: 'sans',
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
      debouncedUpdate(user.uid, newSettings);
    }
  };

  const refreshPlanFromFirebase = useCallback(async (): Promise<UserPlan> => {
    const now = Date.now();
    const cacheWindowMs = 5000;

    if (!user) {
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

    refreshInFlightRef.current = (async () => {
      const userSettings = await getUserSettings(user.uid);
      const refreshedPlan = normalizePlan(userSettings?.plan);

      if (settingsRef.current?.plan !== refreshedPlan) {
        setSettings(previous =>
          previous ? { ...previous, plan: refreshedPlan } : previous,
        );
      }

      if (userSettings?.plan !== refreshedPlan) {
        updateUserSettings(user.uid, { plan: refreshedPlan });
      }

      latestPlanRefreshRef.current = Date.now();
      return refreshedPlan;
    })();

    try {
      return await refreshInFlightRef.current;
    } finally {
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
