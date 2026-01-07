import { type ChangeEvent, useEffect, useState } from 'react';

import type {
  UseSettingsInputField as UseSettingsInputFieldType,
  UseSettingsInputFieldReturnValues,
} from './SettingsInputField.types';

const useSettingsInputField: UseSettingsInputFieldType = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchValue = async () => {
      // Mock firebase fetch
      console.info('Fetching value from firebase...');
      const mockValue = 'janek';
      setValue(mockValue);
    };

    fetchValue();
  }, []);

  const updateValueOnBackend = async (newValue: string) => {
    // Mock firebase update
    console.info('Updating value on backend (Firebase):', newValue);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      updateValueOnBackend(value);
    }
    setIsEditMode(prev => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);
  const toggleTooltip = () => setIsTooltipVisible(prev => !prev);

  return {
    isEditMode,
    value,
    toggleEditMode,
    handleInputChange,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } as UseSettingsInputFieldReturnValues;
};

export default useSettingsInputField;
