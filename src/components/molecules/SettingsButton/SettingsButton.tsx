import Button from '@/atoms/Button';
import InfoTooltip from '@/atoms/InfoTooltip';

import {
  ActionsWrapper,
  ContentWrapper,
  CustomButton,
  Label,
  SettingsButtonBody,
} from './SettingsButton.styled';
import type { SettingsButton as SettingsButtonType } from './SettingsButton.types';

export const SettingsButton: SettingsButtonType = ({
  label,
  info,
  buttonProps,
  customButtonText,
  customButtonRightText,
  onCustomButtonClick,
}) => {
  const renderButton = () => {
    if (buttonProps) {
      return <Button {...buttonProps} />;
    }

    return (
      <CustomButton onClick={onCustomButtonClick}>
        <span>{customButtonText}</span>
        {customButtonRightText && <span>{customButtonRightText}</span>}
      </CustomButton>
    );
  };

  return (
    <SettingsButtonBody>
      <Label>{label}</Label>
      <ContentWrapper>
        {renderButton()}
        <ActionsWrapper>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsButtonBody>
  );
};
