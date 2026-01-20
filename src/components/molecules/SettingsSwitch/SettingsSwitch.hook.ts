import { useEffect, useState } from 'react';

import type {
  UseSettingsSwitch as UseSettingsSwitchType,
  UseSettingsSwitchReturnValues,
} from './SettingsSwitch.types';

const useSettingsSwitch: UseSettingsSwitchType = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

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

  return {
    isActive,
    toggleSwitch,
  } as UseSettingsSwitchReturnValues;
};

export default useSettingsSwitch;
