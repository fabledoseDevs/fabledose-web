import { type ChangeEvent, useEffect, useState } from 'react';

import {
  type UseSettingsInputField as UseSettingsInputFieldType,
  type UseSettingsInputFieldReturnValues,
  FIELD_VARIANT,
} from './SettingsInputField.types';

const useSettingsInputField: UseSettingsInputFieldType = (
  variant: FIELD_VARIANT,
) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchValue = async () => {
      // Mock firebase fetch
      console.info('Fetching value from firebase...');
      const mockValue =
        variant === FIELD_VARIANT.CREDIT_CARD ? '1234567812345678' : 'janek';
      setValue(mockValue);
    };

    fetchValue();
  }, [variant]);

  const updateValueOnBackend = async (newValue: string) => {
    // Mock firebase update
    console.info('Updating value on backend (Firebase):', newValue);
  };

  const toggleEditMode = () => {
    if (variant === FIELD_VARIANT.CREDIT_CARD) {
      setIsPopupOpen(prev => !prev);
      return;
    }

    if (isEditMode) {
      updateValueOnBackend(value);
    }
    setIsEditMode(prev => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const closePopup = () => setIsPopupOpen(false);

  const handleCardSave = (cardNumber: string) => {
    setValue(cardNumber);
    updateValueOnBackend(cardNumber);
    setIsPopupOpen(false);
  };

  return {
    isEditMode,
    value,
    toggleEditMode,
    handleInputChange,
    isPopupOpen,
    closePopup,
    handleCardSave,
  } as UseSettingsInputFieldReturnValues;
};

export default useSettingsInputField;
