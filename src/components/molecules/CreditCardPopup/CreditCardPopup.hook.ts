import { useState } from 'react';

import type {
  UseCreditCardPopup,
  UseCreditCardPopupReturnValues,
} from './CreditCardPopup.types';

const useCreditCardPopup: UseCreditCardPopup = ({ onSave, onClose }) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic numeric filter
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(val);
  };

  const handleSave = () => {
    if (cardNumber.length >= 12) {
      onSave(cardNumber);
      setCardNumber('');
      onClose();
    }
  };

  return {
    cardNumber,
    handleCardNumberChange,
    handleSave,
  } as UseCreditCardPopupReturnValues;
};

export default useCreditCardPopup;
