import { InformationCircleIcon } from '@heroicons/react/24/outline';

import useSettingsRangeField from './SettingsRangeField.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  IconButton,
  InfoWrapper,
  Label,
  RangeWrapper,
  SettingsRangeFieldBody,
  Slider,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
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
  const {
    value,
    handleRangeChange,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } = useSettingsRangeField();

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
          <InfoWrapper>
            <IconButton
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
              onClick={toggleTooltip}
              aria-label="Info"
            >
              <InformationCircleIcon />
            </IconButton>
            {isTooltipVisible && (
              <Tooltip role="tooltip">
                <TooltipTitle>{info.title}</TooltipTitle>
                <TooltipDesc>{info.description}</TooltipDesc>
              </Tooltip>
            )}
          </InfoWrapper>
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsRangeFieldBody>
  );
};
