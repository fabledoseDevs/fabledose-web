import type { ChangeEvent, ReactElement } from 'react';

import type { InfoTooltipContent } from '@/atoms/InfoTooltip';

/**
 * @module
 * This file defines the types and interfaces for SettingsRangeField component.
 */

/**
 * Interface for SettingsRangeField component props.
 *
 * @property label - The label of the range field.
 * @property info - The content for the info tooltip.
 * @property min - The minimum value of the range.
 * @property max - The maximum value of the range.
 * @property step - The step value of the range.
 * @property unit - The unit of the value (e.g., 'px').
 */
export interface SettingsRangeFieldProps {
  label: string;
  info: InfoTooltipContent;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

/**
 * Interface for the values returned by the useSettingsRangeField hook.
 *
 * @property value - The current numeric value of the range field.
 * @property handleRangeChange - Event handler for range input changes.
 */
export interface UseSettingsRangeFieldReturnValues {
  value: number;
  handleRangeChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Hook to manage the state and logic for the SettingsRangeField component.
 *
 * @returns An object containing the state and handlers for the range field.
 */
export type UseSettingsRangeField = () => UseSettingsRangeFieldReturnValues;

/**
 * Component renders a settings range field with a slider.
 *
 * @param props - The component properties:
 *  - `label`: The label of the range field.
 *  - `info`: The content for the info tooltip.
 *  - `min`: The minimum value (default 0).
 *  - `max`: The maximum value (default 100).
 *  - `step`: The step value (default 1).
 *  - `unit`: The unit of the value (e.g., 'px').
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsRangeField
 *   label="Rozmiar czcionki:"
 *   info={{
 *     title: 'Font Size',
 *     description: 'Adjust the font size for better readability.'
 *   }}
 *   min={12}
 *   max={24}
 *   unit="px"
 * />
 * ```
 */
export type SettingsRangeField = (
  props: SettingsRangeFieldProps,
) => ReactElement;
