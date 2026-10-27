import { useCallback, useEffect, useRef, useState } from 'react';

import { type UseAudiobook as UseAudiobookType } from './Audiobook.types';

const SEEK_SECONDS = 10;
const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 2];
const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const useAudiobook: UseAudiobookType = props => {
  const {
    source,
    initialLiked = false,
    liked,
    initialSpeedIndex = 0,
    initialPositionSeconds = 0,
  } = props;
  const callbacks = useRef(props);
  callbacks.current = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const restored = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localLiked, setLocalLiked] = useState(initialLiked);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedPercent, setBufferedPercent] = useState(0);
  const [playbackError, setPlaybackError] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(
    clamp(initialSpeedIndex, 0, PLAYBACK_SPEEDS.length - 1),
  );

  const sync = useCallback((notify = true) => {
    const audio = audioRef.current;
    if (!audio || !restored.current) return;
    const seconds = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    const length =
      Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : 0;
    setCurrentTime(seconds);
    setDuration(length);
    if (notify && length > 0 && !audio.ended)
      callbacks.current.onPlaybackPositionChange?.(seconds, length);
    setBufferedPercent(
      audio.buffered.length && length > 0
        ? clamp(
            (audio.buffered.end(audio.buffered.length - 1) / length) * 100,
            0,
            100,
          )
        : 0,
    );
  }, []);
  const commit = useCallback((completed = false) => {
    const audio = audioRef.current;
    if (
      !audio ||
      !restored.current ||
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    )
      return;
    callbacks.current.onPlaybackCommit?.(
      audio.currentTime,
      audio.duration,
      completed || audio.ended,
    );
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    restored.current = false;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBufferedPercent(0);
    setPlaybackError(false);
    setSpeedIndex(clamp(initialSpeedIndex, 0, PLAYBACK_SPEEDS.length - 1));
    audio?.pause();
    if (audio) audio.currentTime = 0;
  }, [source.audioUrl, initialSpeedIndex]);
  useEffect(() => {
    if (audioRef.current)
      audioRef.current.playbackRate = PLAYBACK_SPEEDS[speedIndex];
  }, [speedIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, [source.audioUrl]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0)
      return;
    if (!restored.current) {
      // A shortened/replaced recording must not start already ended.
      audio.currentTime =
        Number.isFinite(initialPositionSeconds) &&
        initialPositionSeconds >= 0 &&
        initialPositionSeconds < audio.duration
          ? initialPositionSeconds
          : 0;
      restored.current = true;
    }
    sync(false);
  };
  const handlePlayToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
      setPlaybackError(false);
    } catch {
      setPlaybackError(true);
      setIsPlaying(false);
    }
  };
  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (
      !audio ||
      !restored.current ||
      !Number.isFinite(audio.duration) ||
      audio.duration <= 0
    )
      return;
    audio.currentTime = clamp(seconds, 0, audio.duration);
    sync();
    commit(audio.currentTime >= audio.duration);
  };
  const handleLikeToggle = () => {
    const next = !(liked ?? localLiked);
    if (liked === undefined) setLocalLiked(next);
    callbacks.current.onLikeChange?.(next);
  };
  const handlePause = () => {
    setIsPlaying(false);
    commit();
  };
  const handleEnded = () => {
    setIsPlaying(false);
    sync(false);
    commit(true);
  };
  const handleClose = () => {
    audioRef.current?.pause();
    commit();
    callbacks.current.onClose();
  };
  return {
    audioRef,
    isPlaying,
    isLiked: liked ?? localLiked,
    playbackError,
    speedLabel: `x${PLAYBACK_SPEEDS[speedIndex]
      .toFixed(2)
      .replace(/\.00$/, '')}`,
    playedPercent: duration > 0 ? (currentTime / duration) * 100 : 0,
    bufferedPercent,
    handlePlayToggle,
    handleSeekForward: () =>
      seek((audioRef.current?.currentTime || 0) + SEEK_SECONDS),
    handleSeekBackward: () =>
      seek((audioRef.current?.currentTime || 0) - SEEK_SECONDS),
    handleProgressSeek: percent =>
      seek((clamp(percent, 0, 100) / 100) * (audioRef.current?.duration || 0)),
    handleSpeedCycle: () =>
      setSpeedIndex(value => (value + 1) % PLAYBACK_SPEEDS.length),
    handleLikeToggle,
    handleLoadedMetadata,
    handleTimeUpdate: () => sync(),
    handleProgress: () => sync(false),
    handlePlay: () => setIsPlaying(true),
    handlePause,
    handleEnded,
    handleClose,
    handleError: () => {
      setPlaybackError(true);
      setIsPlaying(false);
    },
  };
};
