import React from 'react';

import { useDropdown } from './Dropdown.hook';
import {
  DropdownArrow,
  DropdownBody,
  DropdownHeader,
  DropdownOptions,
  Input,
  Label,
  Option,
} from './Dropdown.styled';
import type { DropdownTypes } from './Dropdown.types';
import { COLOR_SCHEME } from './Dropdown.types';

export const Dropdown: DropdownTypes = ({
  options,
  title,
  defaultValue,
  colorScheme = COLOR_SCHEME.WHITE,
  onChange,
  name,
  isInitiallyOpen = false,
}) => {
  const {
    selectedValue,
    handleChange,
    normalizedOptions,
    isOpen,
    toggleOpen,
    displayValue,
    dropdownRef,
    radioGroupName,
  } = useDropdown({
    options,
    defaultValue,
    onChange,
    title,
    isInitiallyOpen,
    name,
  });

  return (
    <DropdownBody ref={dropdownRef}>
      <DropdownHeader
        colorScheme={colorScheme}
        isopen={isOpen}
        onClick={toggleOpen}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {displayValue}
        <DropdownArrow isopen={isOpen} />
      </DropdownHeader>

      <DropdownOptions isopen={isOpen}>
        {normalizedOptions.map(option => (
          <Option
            key={option.value}
            colorScheme={colorScheme}
            data-selected={selectedValue === option.value}
            onClick={() => handleChange(option.value)}
          >
            <Input
              type="radio"
              name={radioGroupName}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)}
              aria-label={option.label}
            />
            <Label>{option.label}</Label>
          </Option>
        ))}
      </DropdownOptions>
    </DropdownBody>
  );
};
