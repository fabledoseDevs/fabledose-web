import { useEffect, useState } from 'react';

import type {
  SettingsRadioOption,
  UseSettingsRadio as UseSettingsRadioType,
  UseSettingsRadioReturnValues,
} from './SettingsRadio.types';

const useSettingsRadio: UseSettingsRadioType = (
  options: SettingsRadioOption[],
) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchValue = async () => {
      console.info('Fetching radio state from firebase...');
      const mockValue = options.length > 0 ? options[0].value : null;
      setSelectedValue(mockValue);
    };

    fetchValue();
  }, [options]);

  const updateValueOnBackend = async (newValue: string) => {
    console.info('Updating radio state on backend (Firebase):', newValue);
  };

  const selectOption = (value: string) => {
    setSelectedValue(value);
    updateValueOnBackend(value);
  };

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);
  const toggleTooltip = () => setIsTooltipVisible(prev => !prev);

  return {
    selectedValue,
    selectOption,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } as UseSettingsRadioReturnValues;
};

export default useSettingsRadio;
