import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the AudoButtons component.
 */

/**
 * Available button variants for audiobook controls.
 *
 * @remarks
 * - `CLOSE`: Closes audiobook player.
 * - `SPEED`: Cycles playback speed.
 * - `SEEK_BACKWARD`: Jumps playback backward.
 * - `PLAY_TOGGLE`: Toggles play/pause state.
 * - `SEEK_FORWARD`: Jumps playback forward.
 * - `LIKE`: Toggles favorite state.
 */
export enum AUDIO_BUTTON_VARIANT {
  CLOSE = 'close',
  SPEED = 'speed',
  SEEK_BACKWARD = 'seekBackward',
  PLAY_TOGGLE = 'playToggle',
  SEEK_FORWARD = 'seekForward',
  LIKE = 'like',
}

/**
 * Interface for AudoButtons component props.
 *
 * @property variant - Visual and behavioral button variant from {@link AUDIO_BUTTON_VARIANT}.
 * @property onClick - Callback triggered when button is clicked.
 * @property ariaLabel - Accessible label for assistive technologies.
 * @property isPlaying - Optional play state, used by PLAY_TOGGLE variant.
 * @property isLiked - Optional favorite state, used by LIKE variant.
 * @property speedLabel - Optional speed text (for example `x1.25`) used by SPEED variant.
 * @property seekAmount - Optional seek amount displayed as small badge for seek variants.
 * @property disabled - If true, disables button interaction.
 */
export interface AudoButtonsProps {
  variant: AUDIO_BUTTON_VARIANT;
  onClick: () => void;
  ariaLabel: string;
  isPlaying?: boolean;
  isLiked?: boolean;
  speedLabel?: string;
  seekAmount?: number;
  disabled?: boolean;
}

/**
 * Values resolved by icon selector for AudoButtons.
 *
 * @property icon - Rendered icon element.
 * @property badge - Optional badge shown below seek buttons (for example `10`).
 * @property helperLabel - Optional helper label shown below speed button (for example `x1.0`).
 */
export interface GetAudoButtonIconValues {
  icon: ReactElement;
  badge?: string;
  helperLabel?: string;
}

/**
 * Function that maps button props to icon and helper/badge labels.
 *
 * @param props - AudoButtons properties used to resolve icon and indicators.
 * @returns Icon and optional labels for rendering.
 */
export type GetAudoButtonIcon = (
  props: AudoButtonsProps,
) => GetAudoButtonIconValues;

/**
 * Component renders AudoButtons.
 * It displays one audiobook control button and optional state indicators.
 *
 * @param props - The component properties:
 *  - `variant`: Selects control type and icon.
 *  - `onClick`: Trigger function for user interaction.
 *  - `ariaLabel`: Accessible label.
 *  - `isPlaying`: Optional play/pause state.
 *  - `isLiked`: Optional favorite state.
 *  - `speedLabel`: Optional speed text for speed control.
 *  - `seekAmount`: Optional seek amount for seek controls.
 *  - `disabled`: Optional disabled state.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <AudoButtons
 *   variant={AUDIO_BUTTON_VARIANT.PLAY_TOGGLE}
 *   onClick={() => console.log('toggle')}
 *   ariaLabel="Play audiobook"
 *   isPlaying={false}
 * />
 * ```
 */
export type AudoButtons = (props: AudoButtonsProps) => ReactElement;
