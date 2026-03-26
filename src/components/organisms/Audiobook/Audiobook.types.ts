import type { ReactElement, RefObject } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Audiobook organism.
 */

/**
 * Supported audio source location types.
 *
 * @remarks
 * - `LOCAL`: Audio file delivered locally (for example static asset).
 * - `SERVER`: Audio file streamed/served remotely.
 */
export enum AUDIOBOOK_SOURCE_TYPE {
  LOCAL = 'local',
  SERVER = 'server',
}

/**
 * Basic audiobook source descriptor.
 *
 * @property title - Audiobook title displayed in player header.
 * @property coverUrl - URL/path to cover image.
 * @property audioUrl - URL/path to audio file.
 * @property sourceType - Optional source type, defaults to local behavior when omitted.
 */
export interface AudiobookSource {
  title: string;
  coverUrl: string;
  audioUrl: string;
  sourceType?: AUDIOBOOK_SOURCE_TYPE;
}

/**
 * Interface for Audiobook component props.
 *
 * @property source - Source object describing title, cover and audio URL.
 * @property onClose - Callback fired when user clicks close/back button.
 * @property onLikeChange - Optional callback fired when like state changes.
 * @property onPlaybackPositionChange - Optional callback fired with current playback time in seconds.
 * @property initialLiked - Optional initial liked/favorite state.
 * @property initialSpeedIndex - Optional initial playback speed index from predefined speed list.
 */
export interface AudiobookProps {
  source: AudiobookSource;
  onClose: () => void;
  onLikeChange?: (isLiked: boolean) => void;
  onPlaybackPositionChange?: (seconds: number) => void;
  initialLiked?: boolean;
  initialSpeedIndex?: number;
}

/**
 * Return values exposed by useAudiobook hook.
 *
 * @property audioRef - Ref for internal audio element.
 * @property isPlaying - Indicates whether audio is currently playing.
 * @property isLiked - Current favorite state.
 * @property speedLabel - Display label for current playback speed.
 * @property playedPercent - Played progress in percent.
 * @property bufferedPercent - Buffered progress in percent.
 * @property handlePlayToggle - Toggles audio playback state.
 * @property handleSeekForward - Seeks forward by fixed offset.
 * @property handleSeekBackward - Seeks backward by fixed offset.
 * @property handleSpeedCycle - Cycles through predefined playback speeds.
 * @property handleLikeToggle - Toggles favorite state.
 * @property handleProgressSeek - Seeks audio to percentage chosen on progress bar.
 * @property handleLoadedMetadata - Syncs state when audio metadata is loaded.
 * @property handleTimeUpdate - Syncs state during playback updates.
 * @property handleProgress - Syncs buffered progress updates.
 * @property handleEnded - Handles end-of-track behavior.
 */
export interface UseAudiobookReturnValues {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  isLiked: boolean;
  speedLabel: string;
  playedPercent: number;
  bufferedPercent: number;
  handlePlayToggle: () => Promise<void>;
  handleSeekForward: () => void;
  handleSeekBackward: () => void;
  handleSpeedCycle: () => void;
  handleLikeToggle: () => void;
  handleProgressSeek: (nextPercent: number) => void;
  handleLoadedMetadata: () => void;
  handleTimeUpdate: () => void;
  handleProgress: () => void;
  handleEnded: () => void;
}

/**
 * Hook used by Audiobook to manage player state, controls and progress synchronization.
 *
 * @param props - Audiobook props used to initialize and control player behavior.
 * @returns Object with state fields and event handlers used by Audiobook UI.
 */
export type UseAudiobook = (props: AudiobookProps) => UseAudiobookReturnValues;

/**
 * Component renders Audiobook player.
 * Combines cover image, title, playback controls and progress bar.
 *
 * @param props - The component properties:
 *  - `source`: Audio source metadata and URLs.
 *  - `onClose`: Handler for close action.
 *  - `onLikeChange`: Optional like state callback.
 *  - `onPlaybackPositionChange`: Optional playback position callback in seconds.
 *  - `initialLiked`: Optional initial liked state.
 *  - `initialSpeedIndex`: Optional initial playback speed index.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Audiobook
 *   source={{
 *     title: 'Trzy małe świnki',
 *     coverUrl: '/mockImages/mockCover.jpg',
 *     audioUrl: '/mockAudio/three-little-pigs.mp3',
 *   }}
 *   onClose={() => console.log('close')}
 * />
 * ```
 */
export type Audiobook = (props: AudiobookProps) => ReactElement;
