import { useEffect, useRef, useState } from 'react';

import {
  type UseAudiobook as UseAudiobookType,
  AUDIOBOOK_SOURCE_TYPE,
} from './Audiobook.types';

const SEEK_SECONDS = 10;
const PLAYBACK_SPEEDS = [1, 1.25, 1.5, 2];
const POLLING_INTERVAL_MS = 500;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const useAudiobook: UseAudiobookType = ({
  source,
  onLikeChange,
  onPlaybackPositionChange,
  initialLiked = false,
  initialSpeedIndex = 0,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [bufferedPercent, setBufferedPercent] = useState<number>(0);
  const [speedIndex, setSpeedIndex] = useState<number>(
    clamp(initialSpeedIndex, 0, PLAYBACK_SPEEDS.length - 1),
  );

  const syncPlaybackState = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const nextCurrentTime = Number.isFinite(audio.currentTime)
      ? audio.currentTime
      : 0;
    const nextDuration =
      Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : 0;

    setCurrentTime(nextCurrentTime);
    setDuration(nextDuration);
    onPlaybackPositionChange?.(nextCurrentTime);

    if (audio.buffered.length > 0 && nextDuration > 0) {
      const lastBufferedIndex = audio.buffered.length - 1;
      const bufferedEnd = audio.buffered.end(lastBufferedIndex);
      setBufferedPercent(clamp((bufferedEnd / nextDuration) * 100, 0, 100));
      return;
    }

    setBufferedPercent(0);
  };

  const handlePlayToggle = async (): Promise<void> => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const handleSeek = (delta: number) => {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    audio.currentTime = clamp(audio.currentTime + delta, 0, audio.duration);
    syncPlaybackState();
  };

  const handleSeekForward = () => {
    handleSeek(SEEK_SECONDS);
  };

  const handleSeekBackward = () => {
    handleSeek(-SEEK_SECONDS);
  };

  const handleSpeedCycle = () => {
    const audio = audioRef.current;
    const nextSpeedIndex = (speedIndex + 1) % PLAYBACK_SPEEDS.length;
    const nextSpeed = PLAYBACK_SPEEDS[nextSpeedIndex];

    setSpeedIndex(nextSpeedIndex);

    if (audio) {
      audio.playbackRate = nextSpeed;
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(previousIsLiked => {
      const nextIsLiked = !previousIsLiked;
      onLikeChange?.(nextIsLiked);
      return nextIsLiked;
    });
  };

  const handleProgressSeek = (nextPercent: number) => {
    const audio = audioRef.current;

    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
      return;
    }

    audio.currentTime = (clamp(nextPercent, 0, 100) / 100) * audio.duration;
    syncPlaybackState();
  };

  const handleLoadedMetadata = () => {
    syncPlaybackState();
  };

  const handleTimeUpdate = () => {
    syncPlaybackState();
  };

  const handleProgress = () => {
    syncPlaybackState();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    syncPlaybackState();
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBufferedPercent(0);
    setSpeedIndex(clamp(initialSpeedIndex, 0, PLAYBACK_SPEEDS.length - 1));

    audio.pause();
    audio.currentTime = 0;
  }, [initialSpeedIndex, source.audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.playbackRate = PLAYBACK_SPEEDS[speedIndex];
  }, [speedIndex]);

  useEffect(() => {
    const shouldPoll =
      isPlaying || source.sourceType === AUDIOBOOK_SOURCE_TYPE.SERVER;

    if (!shouldPoll) {
      return;
    }

    const pollingInterval = window.setInterval(() => {
      syncPlaybackState();
    }, POLLING_INTERVAL_MS);

    return () => {
      window.clearInterval(pollingInterval);
    };
  }, [isPlaying, source.sourceType]);

  return {
    audioRef,
    isPlaying,
    isLiked,
    speedLabel: `x${PLAYBACK_SPEEDS[speedIndex]
      .toFixed(2)
      .replace(/\.00$/, '')}`,
    playedPercent: duration > 0 ? (currentTime / duration) * 100 : 0,
    bufferedPercent,
    handlePlayToggle,
    handleSeekForward,
    handleSeekBackward,
    handleSpeedCycle,
    handleLikeToggle,
    handleProgressSeek,
    handleLoadedMetadata,
    handleTimeUpdate,
    handleProgress,
    handleEnded,
  };
};
