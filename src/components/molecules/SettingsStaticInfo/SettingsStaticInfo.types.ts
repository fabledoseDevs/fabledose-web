import type { ReactElement } from 'react';

import type { InfoTooltipContent } from '@/atoms/InfoTooltip';

/**
 * @module
 * This file defines the types and interfaces for SettingsStaticInfo component.
 */

/**
 * Interface for SettingsStaticInfo component props.
 *
 * @property label - The label of the static info field.
 * @property info - The content for the info tooltip.
 */
export interface SettingsStaticInfoProps {
  label: string;
  info: InfoTooltipContent;
}

/**
 * Interface for the values returned by the useSettingsStaticInfo hook.
 *
 * @property status - The non-editable status value fetched from the backend.
 */
export interface UseSettingsStaticInfoReturnValues {
  status: string;
}

/**
 * Hook to manage the state and logic for the SettingsStaticInfo component.
 *
 * @returns An object containing the state for the static info.
 */
export type UseSettingsStaticInfo = () => UseSettingsStaticInfoReturnValues;

/**
 * Component renders a settings static info field.
 *
 * @param props - The component properties:
 *  - `label`: The label of the info field.
 *  - `info`: The content for the info tooltip.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsStaticInfo
 *   label="Status:"
 *   info={{
 *     title: 'Status',
 *     description: 'To jest informacja o aktualnym statusie.'
 *   }}
 * />
 * ```
 */
export type SettingsStaticInfo = (
  props: SettingsStaticInfoProps,
) => ReactElement;
