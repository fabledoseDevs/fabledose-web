import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const thinkingPulse = keyframes`
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
`;

const fadeOutSlow = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ResetButtonWrapper = styled.button<{ $isClicked?: boolean }>`
  margin: 5px auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 0.5px;
  line-height: 1;
  padding: 1rem 1.2rem;
  border-radius: 24px;
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ theme }) => theme.palette.byElement.background.transparentWhite['10']};
  border: 2px solid ${({ theme }) => theme.palette.byElement.background.transparentWhite['30']};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  animation: ${({ $isClicked }) => ($isClicked ? fadeOutSlow : 'none')} 1.2s ease-out forwards;

  @media ${({ theme }) => theme.media.laptop} {
    padding: 1.2rem 2.4rem;
  }

  &:hover {
    background: ${({ theme }) => theme.palette.byElement.background.transparentWhite['10']};
    border-color: ${({ theme }) => theme.palette.byElement.background.transparentWhite['30']};
  }

  &:active {
    background: ${({ theme }) => theme.palette.byElement.background.transparentWhite['10']};
  }

  &:disabled {
    background: ${({ theme }) => theme.palette.byElement.background.transparentWhite['05']};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;

export const IconText = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1;
`;

export const LabelText = styled.span`
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  transition: opacity 1s ease, max-width 1s ease;

  ${ResetButtonWrapper}:hover & {
    opacity: 1;
    max-width: 200px;
  }
`;

export const ThinkingDot = styled.span<{ $delay: number }>`
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: currentColor;
  animation: ${thinkingPulse} 1.8s infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  margin: 0 2px;
`;
