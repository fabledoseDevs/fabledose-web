import { useEffect, useState } from 'react';

import type {
  UseSettingsSwitch as UseSettingsSwitchType,
  UseSettingsSwitchReturnValues,
} from './SettingsSwitch.types';

const useSettingsSwitch: UseSettingsSwitchType = (
  initialValue,
  onValueChange,
) => {
  const [isActive, setIsActive] = useState<boolean>(initialValue);

  useEffect(() => {
    setIsActive(initialValue);
  }, [initialValue]);

  const toggleSwitch = () => {
    const newValue = !isActive;
    setIsActive(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return {
    isActive,
    toggleSwitch,
  } as UseSettingsSwitchReturnValues;
};

export default useSettingsSwitch;
