import { type ChangeEvent, useEffect, useState } from 'react';

import type {
  UseSettingsRangeField as UseSettingsRangeFieldType,
  UseSettingsRangeFieldReturnValues,
} from './SettingsRangeField.types';

const useSettingsRangeField: UseSettingsRangeFieldType = () => {
  const [value, setValue] = useState<number>(18);

  useEffect(() => {
    const fetchValue = async () => {
      // Mock firebase fetch
      console.info('Fetching value from firebase...');
      const mockValue = 18;
      setValue(mockValue);
    };

    fetchValue();
  }, []);

  const updateValueOnBackend = async (newValue: number) => {
    // Mock firebase update
    console.info('Updating value on backend (Firebase):', newValue);
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    updateValueOnBackend(newValue);
  };

  return {
    value,
    handleRangeChange,
  } as UseSettingsRangeFieldReturnValues;
};

export default useSettingsRangeField;
