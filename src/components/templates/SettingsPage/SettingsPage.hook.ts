import { FirebaseError } from 'firebase/app';
import { useParams, usePathname, useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import { handleLanguageChange } from '@/lang/lang.helpers';

import type { UseSettingsPage as UseSettingsPageType } from './SettingsPage.types';
import { SETTINGS_TAB } from './SettingsPage.types';

export const useSettingsPage: UseSettingsPageType = () => {
  const { settingsPage } = useDictionary();
  const [activeTab, setActiveTab] = useState<SETTINGS_TAB>(
    SETTINGS_TAB.PROFILE_N_ACCOUNT,
  );
  const tabs = Object.values(SETTINGS_TAB);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';
  const { settings, updateSettings, updateUserEmail, updateUserPassword } =
    useSettings();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordModalFeedback, setPasswordModalFeedback] = useState('');
  const [isPasswordUpdatePending, setIsPasswordUpdatePending] = useState(false);

  useEffect(() => {
    if (settings?.displayName) {
      setDisplayName(settings.displayName);
    }
    if (settings?.email) {
      setEmail(settings.email);
    }
  }, [settings?.displayName, settings?.email]);

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleDisplayNameBlur = () => {
    if (settings?.displayName !== displayName) {
      updateSettings({ displayName });
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailBlur = () => {
    if (settings?.email !== email) {
      updateUserEmail(email);
    }
  };

  const displayLanguage = (() => {
    switch (currentLang) {
      case 'pl':
        return 'Polski';
      case 'en':
        return 'English';
      default:
        return 'Language';
    }
  })();

  const handleLanguageSelection = (selectedOption: string) => {
    handleLanguageChange(selectedOption, currentLang, pathname, router);
  };

  const planLabel = (() => {
    switch (settings?.plan) {
      case 'family':
        return settingsPage.profile_n_account.plan.family;
      case 'ultimate':
        return settingsPage.profile_n_account.plan.ultimate;
      case 'free':
      default:
        return settingsPage.profile_n_account.plan.free;
    }
  })();

  const openPlanModal = () => {
    setIsPlanModalOpen(true);
  };

  const closePlanModal = () => {
    setIsPlanModalOpen(false);
  };

  const handlePlanChange = (plan: 'free' | 'family' | 'ultimate') => {
    updateSettings({ plan });
    setIsPlanModalOpen(false);
  };

  const openPasswordModal = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setPasswordModalFeedback('');
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    if (!isPasswordUpdatePending) {
      setIsPasswordModalOpen(false);
    }
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordModalFeedback(
        settingsPage.profile_n_account.password.validationRequired,
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordModalFeedback(
        settingsPage.profile_n_account.password.validationMismatch,
      );
      return;
    }

    setPasswordModalFeedback('');
    setIsPasswordUpdatePending(true);

    try {
      await updateUserPassword(currentPassword, newPassword);
      setIsPasswordModalOpen(false);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/wrong-password'
      ) {
        setPasswordModalFeedback(
          settingsPage.profile_n_account.password.wrongCurrentPassword,
        );
      } else if (
        error instanceof FirebaseError &&
        error.code === 'auth/requires-recent-login'
      ) {
        setPasswordModalFeedback(
          settingsPage.profile_n_account.password.recentLoginRequired,
        );
      } else if (
        error instanceof FirebaseError &&
        error.code === 'auth/weak-password'
      ) {
        setPasswordModalFeedback(error.message);
      } else if (error instanceof Error) {
        setPasswordModalFeedback(error.message);
      } else {
        setPasswordModalFeedback(
          settingsPage.profile_n_account.password.updateFailed,
        );
      }
    } finally {
      setIsPasswordUpdatePending(false);
    }
  };

  const handleFontSizeChange = (value: number) => {
    updateSettings({ fontSize: value });
  };

  const handleFontFamilyChange = (value: string) => {
    updateSettings({ fontFamily: value });
  };

  const handleTextBackgroundChange = (value: string) => {
    updateSettings({ textBackground: value });
  };

  const handleBackgroundIntensityChange = (value: number) => {
    updateSettings({ backgroundIntensity: value });
  };

  const handleStoryLanguageChange = (value: string) => {
    updateSettings({ storyLanguage: value });
  };

  const handleIllustrationAnimationChange = (value: boolean) => {
    updateSettings({ illustrationAnimation: value });
  };

  const handleAnimationQualityChange = (value: string) => {
    updateSettings({ animationQuality: value });
  };

  const handleNarrationChange = (value: boolean) => {
    updateSettings({ narration: value });
  };

  const handleNarrationVolumeChange = (value: number) => {
    updateSettings({ narrationVolume: value });
  };

  const handleBackgroundMusicChange = (value: boolean) => {
    updateSettings({ backgroundMusic: value });
  };

  const handleMusicVolumeChange = (value: number) => {
    updateSettings({ musicVolume: value });
  };

  return {
    activeTab,
    setActiveTab,
    tabs,
    currentLang,
    displayLanguage,
    handleLanguageSelection,
    settings,
    displayName,
    email,
    isPlanModalOpen,
    isPasswordModalOpen,
    currentPassword,
    newPassword,
    confirmNewPassword,
    passwordModalFeedback,
    isPasswordUpdatePending,
    planLabel,
    updateSettings,
    updateUserEmail,
    updateUserPassword,
    handleDisplayNameChange,
    handleDisplayNameBlur,
    handleEmailChange,
    handleEmailBlur,
    openPlanModal,
    closePlanModal,
    handlePlanChange,
    openPasswordModal,
    closePasswordModal,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handlePasswordUpdate,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleTextBackgroundChange,
    handleBackgroundIntensityChange,
    handleStoryLanguageChange,
    handleIllustrationAnimationChange,
    handleAnimationQualityChange,
    handleNarrationChange,
    handleNarrationVolumeChange,
    handleBackgroundMusicChange,
    handleMusicVolumeChange,
  };
};
