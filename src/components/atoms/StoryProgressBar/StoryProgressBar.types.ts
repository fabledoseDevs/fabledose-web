import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the StoryProgressBar component.
 */

/**
 * Interface for StoryProgressBar component props.
 *
 * @property playedPercent - Current playback position in percent (0-100).
 * @property bufferedPercent - Optional buffered amount in percent (0-100).
 * @property onSeek - Callback fired when user seeks; receives next percentage value.
 * @property ariaLabel - Optional accessible label for the range input.
 * @property disabled - If true, disables interactions with the progress bar.
 */
export interface StoryProgressBarProps {
  playedPercent: number;
  bufferedPercent?: number;
  onSeek: (nextPercent: number) => void;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * Component renders StoryProgressBar.
 * Displays played and buffered progress and allows seeking by click/drag.
 *
 * @param props - The component properties:
 *  - `playedPercent`: Current playback progress in percent.
 *  - `bufferedPercent`: Optional buffered progress in percent.
 *  - `onSeek`: Called with the new percent when progress is changed.
 *  - `ariaLabel`: Optional accessible label for the control.
 *  - `disabled`: If true, blocks interactions.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <StoryProgressBar
 *   playedPercent={35}
 *   bufferedPercent={62}
 *   onSeek={nextPercent => console.log(nextPercent)}
 * />
 * ```
 */
export type StoryProgressBar = (props: StoryProgressBarProps) => ReactElement;
