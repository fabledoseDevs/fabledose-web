import type { ReactElement } from 'react';

import type { InfoTooltipContent } from '@/atoms/InfoTooltip';

/**
 * @module
 * This file defines the types and interfaces for SettingsSwitch component.
 */

/**
 * Interface for SettingsSwitch component props.
 *
 * @property label - The label of the switch field.
 * @property info - The content for the info tooltip.
 * @property value - Boolean flag indicating if the switch is active.
 * @property onChange - Function to toggle the switch state.
 */
export interface SettingsSwitchProps {
  label: string;
  info: InfoTooltipContent;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

/**
 * Interface for the values returned by the useSettingsSwitch hook.
 *
 * @property isActive - Boolean flag indicating if the switch is active.
 * @property toggleSwitch - Function to toggle the switch state.
 */
export interface UseSettingsSwitchReturnValues {
  isActive: boolean;
  toggleSwitch: () => void;
}

/**
 * Hook to manage the state and logic for the SettingsSwitch component.
 *
 * @param initialValue - The initial state of the switch (default is true).
 * @param onValueChange - Callback triggered when the switch state changes.
 *
 * @returns An object containing the state and handlers for the switch.
 */
export type UseSettingsSwitch = (
  initialValue: boolean,
  onValueChange?: (value: boolean) => void,
) => UseSettingsSwitchReturnValues;

/**
 * Component renders a settings switch field with a toggle.
 *
 * @param props - The component properties:
 *  - `label`: The label of the switch field.
 *  - `info`: The content for the info tooltip.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsSwitch
 *   label="Status:"
 *   info={{
 *     title: 'Status',
 *     description: 'Włącz lub wyłącz funkcję.'
 *   }}
 * />
 * ```
 */
export type SettingsSwitch = (props: SettingsSwitchProps) => ReactElement;
