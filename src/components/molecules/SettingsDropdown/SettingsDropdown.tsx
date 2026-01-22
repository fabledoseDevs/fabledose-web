import React from 'react';

import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';
import InfoTooltip from '@/atoms/InfoTooltip';

import useSettingsDropdown from './SettingsDropdown.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  DropdownWrapper,
  Label,
  SettingsDropdownBody,
} from './SettingsDropdown.styled';
import type { SettingsDropdown as SettingsDropdownType } from './SettingsDropdown.types';

export const SettingsDropdown: SettingsDropdownType = ({
  label,
  options,
  info,
  defaultValue,
  onChange,
}) => {
  const { handleDropdownChange } = useSettingsDropdown(onChange);

  return (
    <SettingsDropdownBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <DropdownWrapper>
          <Dropdown
            title={defaultValue || label}
            options={options}
            defaultValue={defaultValue}
            onChange={handleDropdownChange}
            colorScheme={COLOR_SCHEME.WHITE}
          />
        </DropdownWrapper>
        <ActionsWrapper>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsDropdownBody>
  );
};
