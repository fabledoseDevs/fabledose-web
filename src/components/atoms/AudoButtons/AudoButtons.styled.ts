import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

import { AUDIO_BUTTON_VARIANT } from './AudoButtons.types';

export const AudoButtonsBody = styled.button<{
  variant: AUDIO_BUTTON_VARIANT;
}>`
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: ${theme.palette.byElement.text.purple};
  transition: transform 120ms ease, opacity 120ms ease;

  ${({ variant }) =>
    variant === AUDIO_BUTTON_VARIANT.PLAY_TOGGLE
      ? css`
          width: 72px;
          height: 72px;
        `
      : css`
          width: 44px;
          height: 44px;
        `}

  &:hover:not(:disabled) {
    cursor: pointer;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SpeedLabel = styled.span`
  position: absolute;
  bottom: -14px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${theme.typography.fonts.default};
  font-size: 1.4rem;
  font-weight: ${theme.typography.fontWeights.medium};
  line-height: 1;
  white-space: nowrap;
`;

export const SeekBadge = styled.span`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: ${theme.typography.fonts.default};
  font-size: 1.2rem;
  font-weight: ${theme.typography.fontWeights.semibold};
  line-height: 1;
`;
