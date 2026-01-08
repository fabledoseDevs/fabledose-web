import { useEffect, useState } from 'react';

import type {
  UseSettingsSwitch as UseSettingsSwitchType,
  UseSettingsSwitchReturnValues,
} from './SettingsSwitch.types';

const useSettingsSwitch: UseSettingsSwitchType = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchValue = async () => {
      // Mock firebase fetch
      console.info('Fetching switch state from firebase...');
      const mockValue = true;
      setIsActive(mockValue);
    };

    fetchValue();
  }, []);

  const updateValueOnBackend = async (newValue: boolean) => {
    // Mock firebase update
    console.info('Updating switch state on backend (Firebase):', newValue);
  };

  const toggleSwitch = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    updateValueOnBackend(newValue);
  };

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);
  const toggleTooltip = () => setIsTooltipVisible(prev => !prev);

  return {
    isActive,
    toggleSwitch,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } as UseSettingsSwitchReturnValues;
};

export default useSettingsSwitch;
