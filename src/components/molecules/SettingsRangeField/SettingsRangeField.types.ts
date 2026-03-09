import type { ReactElement } from 'react';

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
 * @property value - The current value of the range.
 * @property onChange - The callback function triggered when the range value changes.
 */
export interface SettingsRangeFieldProps {
  label: string;
  info: InfoTooltipContent;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  value?: number;
  onChange?: (value: number) => void;
}

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
