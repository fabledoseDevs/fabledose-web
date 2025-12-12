import type { ReactElement } from 'react';
/**
 * @module
 * This file defines the types and interfaces for the TagIcon component.
 */

/**
 * Available tag names that determine which icon and tooltip content to render.
 *
 * @remarks
 * Examples:
 * - `AGE_3`: "Age 3" suitability tag
 * - `HELPFULNESS`: promotes kindness and helping others
 * - `MODERATION`: encourages balance and avoiding excess
 */
export enum TAG_NAME {
  AGE_3 = 'age-3',
  AGE_5 = 'age-5',
  CLASSIC_FABLE = 'classic-fable',
  CONTEMPORARY_FABLE = 'contemporary-fable',
  RESPONSIBILITY = 'responsibility',
  CAREFULNESS = 'carefulness',
  HELPFULNESS = 'helpfulness',
  DILIGENCE = 'diligence',
  PRIVACY = 'privacy',
  FAMILY = 'family',
  DEATH = 'death',
  TOXIC_RELATIONS = 'toxic-relations',
  MODERATION = 'moderation',
  COOPERATION = 'cooperation',
  REPARATION = 'reparation',
}

/**
 * Interface for TagIcon component props.
 *
 * @property icon - Enum name of the icon to render (one of {@link TAG_NAME}).
 * @property isWarning - When true, the icon appears more vivid to indicate a warning state.
 */
export interface TagIconProps {
  icon: TAG_NAME;
  isWarning?: boolean;
}

/**
 * Metadata describing a specific tag/icon.
 *
 * @property title - Human-readable short name of the tag (e.g., "Age 3").
 * @property description - Brief description displayed inside the tooltip.
 * @property iconUrl - URL for the icon graphic; can be empty if no asset is available.
 */
export interface TagMeta {
  title: string;
  description: string;
  iconUrl: string;
}

/**
 * Arguments accepted by the {@link UseTagIcon} hook.
 *
 * @property icon - Tag name to render metadata and icon for.
 * @property isWarning - Optional flag to render warning visual state.
 */
export interface UseTagIconArgs {
  icon: TAG_NAME;
  isWarning?: boolean;
}

/**
 * Return values provided by the {@link UseTagIcon} hook.
 *
 * @property meta - Metadata describing the selected tag/icon.
 * @property isTooltipVisible - Whether the tooltip is currently visible.
 * @property showTooltip - Shows the tooltip.
 * @property hideTooltip - Hides the tooltip.
 * @property toggleTooltip - Toggles the tooltip visibility state.
 * @property isWarning - Normalized warning flag affecting visuals.
 */
export interface UseTagIconReturnValues {
  meta: TagMeta;
  isTooltipVisible: boolean;
  showTooltip: () => void;
  hideTooltip: () => void;
  toggleTooltip: () => void;
  isWarning: boolean;
}

/**
 * Hook that encapsulates TagIcon logic: computes icon metadata and manages tooltip state.
 *
 * @param args - The hook arguments controlling returned values.
 *  - `icon`: Tag name to retrieve metadata and icon asset for.
 *  - `isWarning`: Optional flag enabling warning style.
 *
 * @returns Object with metadata, tooltip state, and helper handlers.
 */
export type UseTagIcon = (args: UseTagIconArgs) => UseTagIconReturnValues;

/**
 * Component renders a circular tag icon with an optional tooltip.
 * The icon color and tooltip message are derived from the selected {@link TAG_NAME}.
 *
 * @param props - Component properties:
 *  - `icon`: Tag name (one of {@link TAG_NAME}).
 *  - `isWarning`: Optional flag enabling warning visual state.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <TagIcon icon={TAG_NAME.AGE_3} />
 * ```
 */
export type TagIcon = (props: TagIconProps) => ReactElement;
