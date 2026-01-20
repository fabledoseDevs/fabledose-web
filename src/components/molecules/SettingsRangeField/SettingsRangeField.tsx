import InfoTooltip from '@/atoms/InfoTooltip';

import useSettingsRangeField from './SettingsRangeField.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  Label,
  RangeWrapper,
  SettingsRangeFieldBody,
  Slider,
  ValueDisplay,
} from './SettingsRangeField.styled';
import type { SettingsRangeField as SettingsRangeFieldType } from './SettingsRangeField.types';

export const SettingsRangeField: SettingsRangeFieldType = ({
  label,
  info,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
}) => {
  const { value, handleRangeChange } = useSettingsRangeField();

  return (
    <SettingsRangeFieldBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <RangeWrapper>
          <Slider
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleRangeChange}
          />
          <ValueDisplay>
            {value}
            {unit}
          </ValueDisplay>
        </RangeWrapper>
        <ActionsWrapper>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsRangeFieldBody>
  );
};
