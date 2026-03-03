import { useState } from 'react';

import { useSettings } from '@/contexts/SettingsContext';

import type { UseSettingsPage as UseSettingsPageType } from './SettingsPage.types';
import { SETTINGS_TAB } from './SettingsPage.types';

export const useSettingsPage: UseSettingsPageType = () => {
  const [activeTab, setActiveTab] = useState<SETTINGS_TAB>(
    SETTINGS_TAB.PROFILE_N_ACCOUNT,
  );
  const { settings, updateSettings } = useSettings();

  return { activeTab, setActiveTab, settings, updateSettings };
};
