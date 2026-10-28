import { useId } from 'react';

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
  isDisabled = false,
  stateLabels,
  useStatusColors = false,
  surface = 'dark',
}) => {
  const labelId = useId();
  const dictionary = useDictionary();
  const settingsSwitchDictionary = dictionary.settingsPage.SettingsSwitch;
  const { isActive: localActive, toggleSwitch } = useSettingsSwitch(
    value ?? true,
    onChange,
  );

  const isActive = value ?? localActive;
  const toggle = () => {
    if (!isDisabled) {
      if (value !== undefined) onChange?.(!value);
      else toggleSwitch();
    }
  };

  return (
    <SettingsSwitchBody>
      <Label id={labelId} $light={surface === 'light'}>
        {label}
      </Label>
      <ContentWrapper>
        <SwitchWrapper>
          <ToggleTrack
            type="button"
            role="switch"
            aria-checked={isActive}
            aria-labelledby={labelId}
            disabled={isDisabled}
            isActive={isActive}
            $light={surface === 'light'}
            onClick={toggle}
          >
            <ToggleThumb isActive={isActive} />
          </ToggleTrack>
          <StateLabel
            $light={surface === 'light'}
            $status={
              useStatusColors
                ? isActive
                  ? 'available'
                  : 'excluded'
                : undefined
            }
          >
            {isActive
              ? stateLabels?.enabled || settingsSwitchDictionary.enabled
              : stateLabels?.disabled || settingsSwitchDictionary.disabled}
          </StateLabel>
        </SwitchWrapper>
        {info && (
          <ActionsWrapper>
            <InfoTooltip content={info} />
          </ActionsWrapper>
        )}
      </ContentWrapper>
    </SettingsSwitchBody>
  );
};
