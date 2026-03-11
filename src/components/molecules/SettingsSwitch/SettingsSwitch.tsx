import InfoTooltip from '@/atoms/InfoTooltip';
import { useDictionary } from '@/lang/DictionaryProvider';

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

export const SettingsSwitch: SettingsSwitchType = ({
  label,
  info,
  value,
  onChange,
}) => {
  const dictionary = useDictionary();
  const settingsSwitchDictionary = dictionary.settingsPage.SettingsSwitch;
  const { isActive, toggleSwitch } = useSettingsSwitch(value ?? true, onChange);

  return (
    <SettingsSwitchBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <SwitchWrapper>
          <ToggleTrack isActive={isActive} onClick={toggleSwitch}>
            <ToggleThumb isActive={isActive} />
          </ToggleTrack>
          <StateLabel>
            {isActive
              ? settingsSwitchDictionary.enabled
              : settingsSwitchDictionary.disabled}
          </StateLabel>
        </SwitchWrapper>
        <ActionsWrapper>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsSwitchBody>
  );
};
