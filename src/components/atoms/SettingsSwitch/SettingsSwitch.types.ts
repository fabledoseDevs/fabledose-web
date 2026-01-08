import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for SettingsSwitch component.
 */

/**
 * Interface for the info tooltip content.
 *
 * @property title - The title of the tooltip.
 * @property description - The description or body text of the tooltip.
 */
export interface SettingsSwitchInfo {
  title: string;
  description: string;
}

/**
 * Interface for SettingsSwitch component props.
 *
 * @property label - The label of the switch field.
 * @property info - The content for the info tooltip.
 */
export interface SettingsSwitchProps {
  label: string;
  info: SettingsSwitchInfo;
}

/**
 * Interface for the values returned by the useSettingsSwitch hook.
 *
 * @property isActive - Boolean flag indicating if the switch is active.
 * @property toggleSwitch - Function to toggle the switch state.
 * @property isTooltipVisible - Boolean flag for tooltip visibility.
 * @property showTooltip - Function to show the tooltip.
 * @property hideTooltip - Function to hide the tooltip.
 * @property toggleTooltip - Function to toggle the tooltip visibility.
 */
export interface UseSettingsSwitchReturnValues {
  isActive: boolean;
  toggleSwitch: () => void;
  isTooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  toggleTooltip: () => void;
}

/**
 * Hook to manage the state and logic for the SettingsSwitch component.
 *
 * @returns An object containing the state and handlers for the switch.
 */
export type UseSettingsSwitch = () => UseSettingsSwitchReturnValues;

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
