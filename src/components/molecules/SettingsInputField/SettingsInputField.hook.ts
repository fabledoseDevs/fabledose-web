import { type ChangeEvent, useEffect, useState } from 'react';

import {
  type UseSettingsInputField as UseSettingsInputFieldType,
  type UseSettingsInputFieldReturnValues,
  FIELD_VARIANT,
} from './SettingsInputField.types';

const useSettingsInputField: UseSettingsInputFieldType = (
  variant: FIELD_VARIANT,
  valueProp?: string,
  onChangeProp?: (e: ChangeEvent<HTMLInputElement>) => void,
) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(valueProp || '');
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    // When the value prop changes from the parent (e.g., after being fetched from Firebase),
    // update the internal state of this hook.
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const updateValueOnBackend = async (newValue: string) => {
    // This logic is now handled by the onBlur prop passed from the parent.
    // This function can be kept for other variants if needed, or removed.
    console.info(
      'Value update is now handled by the parent component:',
      newValue,
    );
  };

  const toggleEditMode = () => {
    if (variant === FIELD_VARIANT.CREDIT_CARD) {
      setIsPopupOpen(prev => !prev);
      return;
    }
    // The parent's onBlur now handles backend updates.
    setIsEditMode(prev => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // First, update the local state to make the input responsive.
    setValue(e.target.value);
    // Then, if an onChange handler was passed from the parent, call it.
    if (onChangeProp) {
      onChangeProp(e);
    }
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
