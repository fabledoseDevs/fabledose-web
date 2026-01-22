import { useCallback } from 'react';

import type { UseSettingsDropdown } from './SettingsDropdown.types';

export const useSettingsDropdown: UseSettingsDropdown = onChange => {
  const updateFirebase = useCallback(async (value: string) => {
    // TODO: Implement firebase update
    try {
      console.info('Updating firebase with value:', value);
      // Here will be the logic to update user settings in Firebase
    } catch (error) {
      console.error('Failed to update settings in Firebase:', error);
    }
  }, []);

  const handleDropdownChange = useCallback(
    (value: string) => {
      onChange?.(value);
      updateFirebase(value);
    },
    [onChange, updateFirebase],
  );

  return {
    handleDropdownChange,
  };
};

export default useSettingsDropdown;
