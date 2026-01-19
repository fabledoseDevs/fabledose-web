import { InformationCircleIcon } from '@heroicons/react/24/outline';

import useSettingsRadio from './SettingsRadio.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  IconButton,
  InfoWrapper,
  Label,
  RadioOptionBox,
  RadioWrapper,
  SettingsRadioBody,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
} from './SettingsRadio.styled';
import type { SettingsRadio as SettingsRadioType } from './SettingsRadio.types';

export const SettingsRadio: SettingsRadioType = ({ label, options, info }) => {
  const {
    selectedValue,
    selectOption,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } = useSettingsRadio(options);

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
    </SettingsRadioBody>
  );
};
