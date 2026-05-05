import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { SLIDE_TEXT_POSITION } from './SingleSlide.types';

const toFontFamily = (fontFamily: string): string => {
  if (fontFamily === 'serif') {
    return 'var(--slide-font-headline, YesevaOne, serif)';
  }

  if (fontFamily === 'dyslexia') {
    return '"OpenDyslexic", "Comic Sans MS", sans-serif';
  }

  return 'var(--slide-font-default, Baloo2, sans-serif)';
};

const getOverlayOpacity = (backgroundIntensity: number): number => {
  const normalized = Math.min(100, Math.max(0, backgroundIntensity));
  return normalized / 100;
};

const toTextBackgroundColor = (
  textBackground: string,
  backgroundIntensity: number,
): string => {
  const normalizedOpacity = getOverlayOpacity(backgroundIntensity);

  if (textBackground === 'light') {
    return `rgba(255, 255, 255, ${Math.max(0.2, normalizedOpacity * 0.8)})`;
  }

  if (textBackground === 'dark') {
    return `rgba(16, 10, 33, ${Math.max(0.2, normalizedOpacity * 0.9)})`;
  }

  return 'transparent';
};

const toTextPositionStyles = (
  textPosition: SLIDE_TEXT_POSITION,
): ReturnType<typeof css> => {
  if (textPosition === SLIDE_TEXT_POSITION.TOP_LEFT) {
    return css`
      justify-content: flex-start;
      align-items: flex-start;
    `;
  }

  if (textPosition === SLIDE_TEXT_POSITION.TOP_CENTER) {
    return css`
      justify-content: center;
      align-items: flex-start;
    `;
  }

  if (textPosition === SLIDE_TEXT_POSITION.TOP_RIGHT) {
    return css`
      justify-content: flex-end;
      align-items: flex-start;
    `;
  }

  if (textPosition === SLIDE_TEXT_POSITION.MIDDLE_LEFT) {
    return css`
      justify-content: flex-start;
      align-items: center;
    `;
  }

  if (textPosition === SLIDE_TEXT_POSITION.MIDDLE_RIGHT) {
    return css`
      justify-content: flex-end;
      align-items: center;
    `;
  }

  if (textPosition === SLIDE_TEXT_POSITION.BOTTOM_LEFT) {
    return css`
      justify-content: flex-start;
      align-items: flex-end;
    `;
  }

  if (textPosition === SLIDE_TEXT_POSITION.BOTTOM_RIGHT) {
    return css`
      justify-content: flex-end;
      align-items: flex-end;
    `;
  }

  return css`
    justify-content: center;
    align-items: flex-end;
  `;
};

const isCenterRowPosition = (textPosition: SLIDE_TEXT_POSITION): boolean =>
  textPosition === SLIDE_TEXT_POSITION.TOP_CENTER ||
  textPosition === SLIDE_TEXT_POSITION.BOTTOM_CENTER;

export const SingleSlideBody = styled.article<{ isActive: boolean }>`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.88)};
  transition: opacity 0.45s ease;
`;

export const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
`;

export const BackgroundVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const BackgroundShade = styled.div<{ backgroundIntensity: number }>`
  position: absolute;
  inset: 0;
  background: rgba(
    0,
    0,
    0,
    ${({ backgroundIntensity }) =>
      getOverlayOpacity(backgroundIntensity) * 0.35}
  );
`;

export const TextLayer = styled.div<{ textPosition: SLIDE_TEXT_POSITION }>`
  position: absolute;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.high};
  padding: 82px 18px 90px;
  display: flex;
  pointer-events: none;
  ${({ textPosition }) => toTextPositionStyles(textPosition)};

  @media ${({ theme }) => theme.media.tablet} {
    padding: 82px 30px 100px;
  }

  @media ${({ theme }) => theme.media.laptop} {
    padding: 82px 44px 116px;
  }
`;

export const TextBlock = styled.div<{
  textPosition: SLIDE_TEXT_POSITION;
  textBackground: string;
  backgroundIntensity: number;
}>`
  width: 100%;
  max-width: 100%;
  padding: 14px 16px;
  border-radius: 16px;
  box-sizing: border-box;
  background: ${({ textBackground, backgroundIntensity }) =>
    toTextBackgroundColor(textBackground, backgroundIntensity)};

  @media ${({ theme }) => theme.media.tablet} {
    padding: 18px 20px;
  }

  @media ${({ theme }) => theme.media.laptop} {
    width: ${({ textPosition }) =>
      isCenterRowPosition(textPosition) ? '100%' : 'auto'};
    max-width: ${({ textPosition }) =>
      isCenterRowPosition(textPosition) ? '100%' : 'min(720px, 44vw)'};
    padding: 20px 24px;
  }

  @media ${({ theme }) => theme.media.desktop} {
    min-width: ${({ textPosition }) =>
      isCenterRowPosition(textPosition) ? '100%' : '50%'};
  }
`;

export const SlideParagraph = styled.p<{
  fontSize: number;
  fontFamily: string;
  textTone: 'light' | 'dark';
}>`
  --slide-font-default: ${({ theme }) => theme.typography.fonts.default};
  --slide-font-headline: ${({ theme }) => theme.typography.fonts.headline};
  margin: 0;
  color: ${({ textTone, theme }) =>
    textTone === 'dark'
      ? theme.palette.byElement.text.purple
      : theme.palette.byElement.text.white};
  text-shadow: ${({ textTone, theme }) =>
    textTone === 'dark'
      ? 'none'
      : `0 2px 12px ${theme.palette.byElement.shadows.purple['20']}`};
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-family: ${({ fontFamily }) => toFontFamily(fontFamily)};
  line-height: 1.45;

  & + & {
    margin-top: 0.8em;
  }
`;
