'use client';

import type { User } from 'firebase/auth';
import { onAuthStateChanged, verifyBeforeUpdateEmail } from 'firebase/auth';
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
            // User document exists, check if email needs syncing
            if (user.email && userSettings.email !== user.email) {
              const updatedSettings = { ...userSettings, email: user.email };
              setSettings(updatedSettings);
              updateUserSettings(user.uid, { email: user.email });
            } else {
              setSettings(userSettings);
            }
          } else {
            // This is a new user, create their settings document
            const defaultSettings: Settings = {
              displayName: user.displayName || 'Anonymous',
              email: user.email || '',
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
      // URL to redirect back to. This must be in the authorized domains list
      // in your Firebase console.
      url: window.location.href,
      handleCodeInApp: true,
    };

    try {
      await verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings);
      // We can also update our local state to give immediate feedback
      // while letting Firebase handle the final confirmed update.
      updateSettings({ email: newEmail });
      // Optionally, you could show a toast notification here.
      alert('Verification email sent! Please check your new email address.');
    } catch (error) {
      // Handle errors, e.g., email already in use, requires recent login, etc.
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

  return (
    <SettingsContext.Provider
      value={{ settings, updateSettings, updateUserEmail }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
