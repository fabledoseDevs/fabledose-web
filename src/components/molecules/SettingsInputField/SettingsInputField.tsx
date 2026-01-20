import { CreditCardIcon, PencilIcon } from '@heroicons/react/24/outline';

import InfoTooltip from '@/atoms/InfoTooltip';

import CreditCardPopup from '../CreditCardPopup';
import useSettingsInputField from './SettingsInputField.hook';
import {
  ActionsWrapper,
  CardDisplay,
  ContentWrapper,
  IconButton,
  InputField,
  Label,
  SettingsInputFieldBody,
  ValueDisplay,
} from './SettingsInputField.styled';
import {
  type SettingsInputField as SettingsInputFieldType,
  FIELD_VARIANT,
} from './SettingsInputField.types';

export const SettingsInputField: SettingsInputFieldType = ({
  label,
  info,
  variant = FIELD_VARIANT.TEXT,
}) => {
  const {
    isEditMode,
    value,
    toggleEditMode,
    handleInputChange,
    isPopupOpen,
    closePopup,
    handleCardSave,
  } = useSettingsInputField(variant);

  const isCreditCard = variant === FIELD_VARIANT.CREDIT_CARD;

  const renderValue = () => {
    if (isCreditCard) {
      const lastTwo = value.slice(-2);
      const dots = '•'.repeat(Math.max(0, value.length - 2));
      return (
        <CardDisplay>
          <CreditCardIcon />
          <span>
            {dots}
            {lastTwo}
          </span>
        </CardDisplay>
      );
    }

    if (variant === FIELD_VARIANT.PASSWORD) {
      return <ValueDisplay>{'•'.repeat(value.length)}</ValueDisplay>;
    }

    return <ValueDisplay>{value}</ValueDisplay>;
  };

  return (
    <SettingsInputFieldBody>
      <Label>{label}</Label>
      <ContentWrapper>
        {isEditMode && !isCreditCard ? (
          <InputField
            type={variant === FIELD_VARIANT.PASSWORD ? 'password' : 'text'}
            value={value}
            onChange={handleInputChange}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            onBlur={e => {
              if (
                e.relatedTarget instanceof HTMLElement &&
                e.relatedTarget.closest('button')
              ) {
                return;
              }
              toggleEditMode();
            }}
          />
        ) : (
          renderValue()
        )}
        <ActionsWrapper>
          <IconButton onClick={toggleEditMode} aria-label="Edit">
            <PencilIcon />
          </IconButton>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
      {isCreditCard && (
        <CreditCardPopup
          isOpen={isPopupOpen}
          onClose={closePopup}
          onSave={handleCardSave}
        />
      )}
    </SettingsInputFieldBody>
  );
};
