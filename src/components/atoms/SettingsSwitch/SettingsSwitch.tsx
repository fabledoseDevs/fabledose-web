import { InformationCircleIcon } from '@heroicons/react/24/outline';

import useSettingsSwitch from './SettingsSwitch.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  IconButton,
  InfoWrapper,
  Label,
  SettingsSwitchBody,
  StateLabel,
  SwitchWrapper,
  ToggleThumb,
  ToggleTrack,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
} from './SettingsSwitch.styled';
import type { SettingsSwitch as SettingsSwitchType } from './SettingsSwitch.types';

export const SettingsSwitch: SettingsSwitchType = ({ label, info }) => {
  const {
    isActive,
    toggleSwitch,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } = useSettingsSwitch();

  return (
    <SettingsSwitchBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <SwitchWrapper>
          <ToggleTrack isActive={isActive} onClick={toggleSwitch}>
            <ToggleThumb isActive={isActive} />
          </ToggleTrack>
          <StateLabel>{isActive ? 'włączona' : 'wyłączona'}</StateLabel>
        </SwitchWrapper>
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
    </SettingsSwitchBody>
  );
};
