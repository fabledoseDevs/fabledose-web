import { useEffect, useState } from 'react';

import type {
  UseSettingsStaticInfo as UseSettingsStaticInfoType,
  UseSettingsStaticInfoReturnValues,
} from './SettingsStaticInfo.types';

const useSettingsStaticInfo: UseSettingsStaticInfoType = () => {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const fetchValue = async () => {
      // Mock firebase fetch
      console.info('Fetching static info status from firebase...');
      const mockValue = 'Aktywny';
      setStatus(mockValue);
    };

    fetchValue();
  }, []);

  return {
    status,
  } as UseSettingsStaticInfoReturnValues;
};

export default useSettingsStaticInfo;
