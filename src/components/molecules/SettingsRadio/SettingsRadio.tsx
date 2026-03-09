import InfoTooltip from '@/atoms/InfoTooltip';

import {
  ActionsWrapper,
  ContentWrapper,
  Label,
  RadioOptionBox,
  RadioWrapper,
  SettingsRadioBody,
} from './SettingsRadio.styled';
import type { SettingsRadio as SettingsRadioType } from './SettingsRadio.types';

export const SettingsRadio: SettingsRadioType = ({
  label,
  options,
  info,
  value,
  onChange,
}) => (
  <SettingsRadioBody>
    <Label>{label}</Label>
    <ContentWrapper>
      <RadioWrapper>
        {options.map(option => (
          <RadioOptionBox
            key={option.value}
            isSelected={value === option.value}
            isDisabled={option.isDisabled}
            onClick={() => !option.isDisabled && onChange?.(option.value)}
          >
            {option.label}
          </RadioOptionBox>
        ))}
      </RadioWrapper>
      <ActionsWrapper>
        <InfoTooltip content={info} />
      </ActionsWrapper>
    </ContentWrapper>
  </SettingsRadioBody>
);
