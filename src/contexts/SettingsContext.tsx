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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      if (user) {
        getUserSettings(user.uid).then(userSettings => {
          if (userSettings) {
            const normalizedPlan = normalizePlan(userSettings.plan);
            const normalizedUserSettings: Settings = {
              ...userSettings,
              plan: normalizedPlan,
              password:
                typeof userSettings.password === 'string'
                  ? userSettings.password
                  : DEFAULT_PASSWORD_PLACEHOLDER,
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
              });
            } else {
              setSettings(normalizedUserSettings);

              if (
                userSettings.plan !== normalizedPlan ||
                typeof userSettings.password !== 'string'
              ) {
                updateUserSettings(user.uid, {
                  plan: normalizedPlan,
                  password: normalizedUserSettings.password,
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
              storyLanguage: 'auto',
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
        updateUserEmail,
        updateUserPassword,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
