import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { DropdownOption, UseDropdown } from './Dropdown.types';

export const useDropdown: UseDropdown = ({
  options,
  defaultValue,
  onChange,
  title,
  isInitiallyOpen = false,
  name,
}) => {
  const normalizedOptions = useMemo(
    (): DropdownOption[] =>
      options.map(option =>
        typeof option === 'string' ? { value: option, label: option } : option,
      ),
    [options],
  );

  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || '',
  );
  const [isOpen, setIsOpen] = useState<boolean>(isInitiallyOpen);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const radioGroupName = useMemo(
    () => name || `dropdown-${title.toLowerCase().replace(/\s+/g, '-')}`,
    [name, title],
  );

  const handleChange = useCallback(
    (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
      onChange?.(value);
    },
    [onChange],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const displayValue = useMemo(() => {
    if (selectedValue) {
      const selectedOption = normalizedOptions.find(
        option => option.value === selectedValue,
      );
      return selectedOption?.label || selectedValue;
    }
    return title;
  }, [selectedValue, normalizedOptions, title]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return {
    selectedValue,
    handleChange,
    normalizedOptions,
    isOpen,
    toggleOpen,
    displayValue,
    dropdownRef,
    radioGroupName,
  };
};
