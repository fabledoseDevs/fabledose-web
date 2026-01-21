import { useState } from 'react';

import type { UseSettingsPage as UseSettingsPageType } from './SettingsPage.types';
import { SETTINGS_TAB } from './SettingsPage.types';

export const useSettingsPage: UseSettingsPageType = () => {
  const [activeTab, setActiveTab] = useState<SETTINGS_TAB>(
    SETTINGS_TAB.PROFILE_N_ACCOUNT,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { activeTab, setActiveTab, isModalOpen, openModal, closeModal };
};
