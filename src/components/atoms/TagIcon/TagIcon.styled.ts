import styled from '@emotion/styled';

import type { Theme } from '@/styles/types';

export const TagIconBody = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const circleBackground = (theme: Theme) =>
  theme.palette.byElement.background.transparentWhite['10'];
const circleBorder = (theme: Theme) =>
  `2px solid ${theme.palette.byElement.background.transparentWhite['30']}`;

export const IconCircle = styled.div<{
  isWarning: boolean;
}>`
  width: 54px;
  height: 54px;
  min-width: 54px;
  min-height: 54px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme, isWarning }) =>
    isWarning
      ? theme.palette.byElement.background.white
      : circleBackground(theme)};
  border: ${({ theme, isWarning }) =>
    isWarning
      ? `2px solid ${theme.palette.byColor.white.full}`
      : circleBorder(theme)};
  backdrop-filter: blur(8px);
  box-sizing: border-box;
  cursor: default;
`;

export const IconImg = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
`;

export const IconMask = styled.div<{
  src: string;
  isWarning: boolean;
}>`
  width: 52px;
  height: 52px;
  background-color: ${({ theme, isWarning }) =>
    isWarning
      ? theme.palette.byColor.red.regular
      : theme.palette.byColor.white.full};
  -webkit-mask: url(${({ src }) => src}) no-repeat center / contain;
  mask: url(${({ src }) => src}) no-repeat center / contain;
`;

export const FallbackGlyph = styled.span<{
  isWarning: boolean;
}>`
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme, isWarning }) =>
    isWarning
      ? theme.palette.byColor.purple.regular
      : theme.palette.byColor.white.full};
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 100px;
  max-width: 240px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.byElement.background.white};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  border: 1px solid ${({ theme }) => theme.palette.byColor.white.ecru};
  box-shadow: 0 8px 8px
    ${({ theme }) => theme.palette.byElement.shadows.purple['10']};
  z-index: ${({ theme }) => theme.zIndex.higher};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  font-size: 1.2rem;
  line-height: 1.2;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.byElement.background.white}
      transparent transparent transparent;
  }
`;

export const TooltipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const TooltipDesc = styled.div`
  opacity: 0.85;
`;
