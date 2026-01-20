import type { ReactElement } from 'react';

import type { InfoTooltipContent } from '@/atoms/InfoTooltip';

/**
 * @file
 * This file defines the types and interfaces for SettingsRadio component.
 *
 * The SettingsRadio have following properites.
 */

/**
 * Interface for a single radio option.
 *
 * @property label - The display label for the option.
 * @property value - The unique value of the option.
 * @property isDisabled - Whether the option is disabled.
 */
export interface SettingsRadioOption {
  label: string;
  value: string;
  isDisabled?: boolean;
}

/**
 * Interface for SettingsRadio component props.
 *
 * @property label - The label of the radio group field.
 * @property options - The list of radio options.
 * @property info - The content for the info tooltip.
 */
export interface SettingsRadioProps {
  label: string;
  options: SettingsRadioOption[];
  info: InfoTooltipContent;
}

/**
 * Interface for the values returned by the useSettingsRadio hook.
 *
 * @property selectedValue - The currently selected option value.
 * @property selectOption - Function to select an option.
 */
export interface UseSettingsRadioReturnValues {
  selectedValue: string | null;
  selectOption: (value: string) => void;
}

/**
 * Hook to manage the state and logic for the SettingsRadio component.
 *
 * @returns An object containing the state and handlers for the radio group.
 */
export type UseSettingsRadio = (
  options: SettingsRadioOption[],
) => UseSettingsRadioReturnValues;

/**
 * Component renders a settings radio group with box-styled options.
 *
 * @param props - The component properties:
 *  - `label`: The label of the radio group.
 *  - `options`: The list of radio options.
 *  - `info`: The content for the info tooltip.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsRadio
 *   label="Tło tekstu:"
 *   options={[
 *     { label: 'brak', value: 'none' },
 *     { label: 'jasne', value: 'light' },
 *     { label: 'ciemne', value: 'dark' }
 *   ]}
 *   info={{
 *     title: 'Tło tekstu',
 *     description: 'Wybierz kolor tła tekstu.'
 *   }}
 * />
 * ```
 */
export type SettingsRadio = (props: SettingsRadioProps) => ReactElement;
