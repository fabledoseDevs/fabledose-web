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
 * Persistent or standalone audiobook player inputs.
 *
 * @remarks
 * Mount the player only after loading its saved position. Remount it when the account,
 * language or recording changes. Controlled liked state must follow acknowledged writes;
 * the player never changes a controlled heart optimistically.
 * Errors in persistence are owned by the parent; media failures are reported by the player.
 *
 * @example
 * ```tsx
 * <Audiobook source={source} onClose={close} initialPositionSeconds={42}
 *   liked={isFavorited} likeDisabled={pending} onLikeChange={toggleFavorite}
 *   onPlaybackPositionChange={record} onPlaybackCommit={commit} />
 * ```
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
  onPlaybackPositionChange?: (seconds: number, duration: number) => void;
  /** Explicit checkpoint on pause, seek, close or completion; periodic updates remain local. */
  onPlaybackCommit?: (
    seconds: number,
    duration: number,
    completed: boolean,
  ) => void;
  /** Saved seconds applied once after metadata loads; invalid or past-end positions restart at zero. */
  initialPositionSeconds?: number;
  /** Controlled acknowledged favorite state. When omitted, initialLiked supplies local-only behavior. */
  liked?: boolean;
  /** Disables the heart during loading, signed-out playback or an outstanding favorite mutation. */
  likeDisabled?: boolean;
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
  /** True after a media load or play failure; cleared by a successful play attempt or source change. */
  playbackError: boolean;
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
  /** Mirrors native play events, including external media controls. */
  handlePlay: () => void;
  /** Commits the latest position when playback pauses. */
  handlePause: () => void;
  /** Pauses, commits and invokes the close callback. */
  handleClose: () => void;
  /** Surfaces media loading and decoding errors. */
  handleError: () => void;
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
