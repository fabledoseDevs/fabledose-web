import InfoTooltip from '@/atoms/InfoTooltip';

import useSettingsSwitch from './SettingsSwitch.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  Label,
  SettingsSwitchBody,
  StateLabel,
  SwitchWrapper,
  ToggleThumb,
  ToggleTrack,
} from './SettingsSwitch.styled';
import type { SettingsSwitch as SettingsSwitchType } from './SettingsSwitch.types';

export const SettingsSwitch: SettingsSwitchType = ({ label, info }) => {
  const { isActive, toggleSwitch } = useSettingsSwitch();

  return (
    <SettingsSwitchBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <SwitchWrapper>
          <ToggleTrack isActive={isActive} onClick={toggleSwitch}>
            <ToggleThumb isActive={isActive} />
          </ToggleTrack>
          <StateLabel>{isActive ? 'włączone' : 'wyłączona'}</StateLabel>
        </SwitchWrapper>
        <ActionsWrapper>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsSwitchBody>
  );
};
