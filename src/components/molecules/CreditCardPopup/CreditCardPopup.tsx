import useCreditCardPopup from './CreditCardPopup.hook';
import {
  Actions,
  Button,
  Input,
  Overlay,
  PopupBody,
  Title,
} from './CreditCardPopup.styled';
import type { CreditCardPopup as CreditCardPopupType } from './CreditCardPopup.types';

export const CreditCardPopup: CreditCardPopupType = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const { cardNumber, handleCardNumberChange, handleSave } = useCreditCardPopup(
    {
      onSave,
      onClose,
    },
  );

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <PopupBody onClick={e => e.stopPropagation()}>
        <Title>Enter Card Information</Title>
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={16}
          autoFocus
        />
        <Actions>
          <Button onClick={onClose}>Cancel</Button>
          <Button primary onClick={handleSave}>
            Save
          </Button>
        </Actions>
      </PopupBody>
    </Overlay>
  );
};
