import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

export const StoryProgressBarBody = styled.div`
  position: relative;
  width: 100%;
  height: 18px;
`;

export const BufferedTrack = styled.div<{ percent: number }>`
  position: absolute;
  top: 7px;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: ${theme.palette.byColor.grey.light};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ percent }) => `${percent}%`};
    height: 100%;
    border-radius: 999px;
    background: ${theme.palette.byColor.grey.light};
  }
`;

export const PlayedTrack = styled.div<{ percent: number }>`
  position: absolute;
  top: 7px;
  left: 0;
  width: ${({ percent }) => `${percent}%`};
  height: 4px;
  border-radius: 999px;
  background: ${theme.palette.byElement.background.purple};
  pointer-events: none;
`;

export const RangeInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  background: transparent;
  margin: 0;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: transparent;
  }

  &::-moz-range-track {
    height: 4px;
    background: transparent;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    border-radius: 50%;
    border: 0;
    background: ${theme.palette.byElement.background.purple};
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 0;
    background: ${theme.palette.byElement.background.purple};
  }
`;
