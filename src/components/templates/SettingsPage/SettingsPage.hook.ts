import { useParams, usePathname, useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';
import type { FableFontFamily } from '@/contexts/SettingsContext.types';
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
  const { settings, updateSettings } = useSettings();
  const [displayName, setDisplayName] = useState('');
  useEffect(() => {
    if (settings?.displayName) {
      setDisplayName(settings.displayName);
    }
  }, [settings?.displayName]);

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleDisplayNameBlur = () => {
    if (settings?.displayName !== displayName) {
      updateSettings({ displayName });
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

  const navigateToPlanPage = () => {
    router.push(`/${currentLang}/plan`);
  };

  const handleFontSizeChange = (value: number) => {
    updateSettings({ fontSize: value });
  };

  const handleFontFamilyChange = (value: string) => {
    const normalizedValue: FableFontFamily =
      value === 'serif'
        ? 'serif'
        : value === 'dyslexic' || value === 'dyslexia'
        ? 'dyslexic'
        : 'sans';
    updateSettings({ fontFamily: normalizedValue });
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

  const handleNewsChange = (value: boolean) => {
    updateSettings({ notificationsNews: value });
  };

  const handlePaymentsChange = (value: boolean) => {
    updateSettings({ notificationsPayments: value });
  };

  const handleAnalyticalChange = (value: boolean) => {
    updateSettings({ cookiesAnalytical: value });
  };

  const handleMarketingChange = (value: boolean) => {
    updateSettings({ cookiesMarketing: value });
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
    planLabel,
    updateSettings,
    handleDisplayNameChange,
    handleDisplayNameBlur,
    navigateToPlanPage,
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
    handleNewsChange,
    handlePaymentsChange,
    handleAnalyticalChange,
    handleMarketingChange,
  };
};
