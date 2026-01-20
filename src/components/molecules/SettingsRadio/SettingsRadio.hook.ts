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

  return {
    selectedValue,
    selectOption,
  } as UseSettingsRadioReturnValues;
};

export default useSettingsRadio;
