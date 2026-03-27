import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ForwardIcon,
  HeartIcon as HeartIconOutline,
} from '@heroicons/react/24/outline';
import {
  ArrowLeftCircleIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

import { AudoButtonsBody, SeekBadge, SpeedLabel } from './AudoButtons.styled';
import type {
  AudoButtons as AudoButtonsType,
  GetAudoButtonIcon as GetAudoButtonIconType,
} from './AudoButtons.types';
import {
  type GetAudoButtonIconValues,
  AUDIO_BUTTON_VARIANT,
} from './AudoButtons.types';

const getAudoButtonIcon: GetAudoButtonIconType = ({
  variant,
  isPlaying = false,
  isLiked = false,
  speedLabel = 'x1.0',
  seekAmount = 10,
}) => {
  switch (variant) {
    case AUDIO_BUTTON_VARIANT.CLOSE:
      return { icon: <ArrowLeftCircleIcon /> };
    case AUDIO_BUTTON_VARIANT.SPEED:
      return { icon: <ForwardIcon />, helperLabel: speedLabel };
    case AUDIO_BUTTON_VARIANT.SEEK_BACKWARD:
      return { icon: <ArrowUturnLeftIcon />, badge: `${seekAmount}` };
    case AUDIO_BUTTON_VARIANT.SEEK_FORWARD:
      return { icon: <ArrowUturnRightIcon />, badge: `${seekAmount}` };
    case AUDIO_BUTTON_VARIANT.LIKE:
      return { icon: isLiked ? <HeartIconSolid /> : <HeartIconOutline /> };
    case AUDIO_BUTTON_VARIANT.PLAY_TOGGLE:
      return { icon: isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon /> };
    default:
      return { icon: <PlayCircleIcon /> };
  }
};

export const AudoButtons: AudoButtonsType = props => {
  const { variant, onClick, ariaLabel, disabled = false } = props;
  const { icon, badge, helperLabel }: GetAudoButtonIconValues =
    getAudoButtonIcon(props);

  return (
    <AudoButtonsBody
      type="button"
      variant={variant}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon}
      {badge ? <SeekBadge>{badge}</SeekBadge> : null}
      {helperLabel ? <SpeedLabel>{helperLabel}</SpeedLabel> : null}
    </AudoButtonsBody>
  );
};
