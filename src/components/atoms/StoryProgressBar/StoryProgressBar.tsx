import {
  BufferedTrack,
  PlayedTrack,
  RangeInput,
  StoryProgressBarBody,
} from './StoryProgressBar.styled';
import type { StoryProgressBar as StoryProgressBarType } from './StoryProgressBar.types';

const clampPercent = (value: number): number =>
  Math.min(100, Math.max(0, value));

export const StoryProgressBar: StoryProgressBarType = ({
  playedPercent,
  bufferedPercent = 0,
  onSeek,
  ariaLabel = 'Audiobook progress',
  disabled = false,
}) => {
  const safePlayedPercent = clampPercent(playedPercent);
  const safeBufferedPercent = clampPercent(bufferedPercent);

  return (
    <StoryProgressBarBody>
      <BufferedTrack percent={safeBufferedPercent} />
      <PlayedTrack percent={safePlayedPercent} />
      <RangeInput
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={safePlayedPercent}
        onChange={event => onSeek(Number(event.target.value))}
        aria-label={ariaLabel}
        disabled={disabled}
      />
    </StoryProgressBarBody>
  );
};
