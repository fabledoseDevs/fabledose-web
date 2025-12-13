import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

import type { STORY_CARD_VARIANT } from './StoryCard.types';

export const StoryCardBody = styled.section<{ variant: STORY_CARD_VARIANT }>`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;

  ${({ variant }) =>
    variant === 'compact'
      ? css`
          max-width: 1800px;
          height: 800px;
          border-radius: 24px;
          margin: 0 auto;
        `
      : css`
          width: 100vw;
          height: 100vh;
          border-radius: 0;
          padding-left: 40px;
        `};
`;

export const MediaLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${theme.zIndex.standard};
`;

export const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const GradientShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: ${theme.zIndex.medium};
  background: linear-gradient(
    90deg,
    rgba(31, 21, 62, 0.9) 0%,
    rgba(31, 21, 62, 0.75) 25%,
    rgba(31, 21, 62, 0.45) 50%,
    rgba(31, 21, 62, 0.1) 58%,
    rgba(31, 21, 62, 0) 62%
  );
`;

export const ContentLayer = styled.div`
  position: relative;
  z-index: ${theme.zIndex.high};
  display: flex;
  align-items: stretch;
  height: 100%;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  padding: 24px 20px 24px 20px;
  width: 100%;

  @media ${theme.media.tablet} {
    padding: 40px;
    width: min(820px, 60%);
  }

  @media ${theme.media.desktop} {
    padding: 56px;
    width: min(860px, 48%);
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ButtonsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media ${theme.media.tablet} {
    grid-template-columns: repeat(2, auto);
    justify-content: start;
  }
`;

export const SingleButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const TagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;
