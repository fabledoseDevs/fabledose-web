'use client';

import Image from 'next/image';

import AudoButtons from '@/atoms/AudoButtons';
import { AUDIO_BUTTON_VARIANT } from '@/atoms/AudoButtons/AudoButtons.types';
import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import StoryProgressBar from '@/atoms/StoryProgressBar';

import { useAudiobook } from './Audiobook.hook';
import {
  ActionsRow,
  AudiobookBody,
  ControlsArea,
  CoverWrapper,
  ProgressRow,
  TitleRow,
  TopBar,
} from './Audiobook.styled';
import type { Audiobook as AudiobookType } from './Audiobook.types';

export const Audiobook: AudiobookType = props => {
  const { source, onClose } = props;
  const {
    audioRef,
    isPlaying,
    isLiked,
    speedLabel,
    playedPercent,
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
  } = useAudiobook(props);

  return (
    <AudiobookBody>
      <TopBar>
        <AudoButtons
          variant={AUDIO_BUTTON_VARIANT.CLOSE}
          onClick={onClose}
          ariaLabel="Close audiobook player"
        />
      </TopBar>

      <CoverWrapper>
        <Image
          src={source.coverUrl}
          alt={source.title}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          priority={false}
        />
      </CoverWrapper>

      <ControlsArea>
        <TitleRow>
          <Headline
            weight={HEADLINE_TYPE.SMALL}
            color={HEADLINE_FOREGROUND_COLOR.PURPLE}
          >
            {source.title}
          </Headline>
        </TitleRow>

        <ProgressRow>
          <StoryProgressBar
            playedPercent={playedPercent}
            bufferedPercent={bufferedPercent}
            onSeek={handleProgressSeek}
            ariaLabel={`Playback progress for ${source.title}`}
          />
        </ProgressRow>

        <ActionsRow>
          <AudoButtons
            variant={AUDIO_BUTTON_VARIANT.SPEED}
            onClick={handleSpeedCycle}
            ariaLabel={`Change playback speed, current ${speedLabel}`}
            speedLabel={speedLabel}
          />
          <AudoButtons
            variant={AUDIO_BUTTON_VARIANT.SEEK_BACKWARD}
            onClick={handleSeekBackward}
            ariaLabel="Go back 10 seconds"
            seekAmount={10}
          />
          <AudoButtons
            variant={AUDIO_BUTTON_VARIANT.PLAY_TOGGLE}
            onClick={() => {
              void handlePlayToggle();
            }}
            ariaLabel={isPlaying ? 'Pause audiobook' : 'Play audiobook'}
            isPlaying={isPlaying}
          />
          <AudoButtons
            variant={AUDIO_BUTTON_VARIANT.SEEK_FORWARD}
            onClick={handleSeekForward}
            ariaLabel="Skip forward 10 seconds"
            seekAmount={10}
          />
          <AudoButtons
            variant={AUDIO_BUTTON_VARIANT.LIKE}
            onClick={handleLikeToggle}
            ariaLabel={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            isLiked={isLiked}
          />
        </ActionsRow>
      </ControlsArea>

      <audio
        ref={audioRef}
        preload="metadata"
        src={source.audioUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgress}
        onEnded={handleEnded}
      />
    </AudiobookBody>
  );
};
