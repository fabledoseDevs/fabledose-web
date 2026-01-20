import InfoTooltip from '@/atoms/InfoTooltip';

import useSettingsRadio from './SettingsRadio.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  Label,
  RadioOptionBox,
  RadioWrapper,
  SettingsRadioBody,
} from './SettingsRadio.styled';
import type { SettingsRadio as SettingsRadioType } from './SettingsRadio.types';

export const SettingsRadio: SettingsRadioType = ({ label, options, info }) => {
  const { selectedValue, selectOption } = useSettingsRadio(options);

  return (
    <SettingsRadioBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <RadioWrapper>
          {options.map(option => (
            <RadioOptionBox
              key={option.value}
              isSelected={selectedValue === option.value}
              isDisabled={option.isDisabled}
              onClick={() => !option.isDisabled && selectOption(option.value)}
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
};
