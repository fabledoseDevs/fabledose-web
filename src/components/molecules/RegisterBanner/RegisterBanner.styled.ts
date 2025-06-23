import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const slideAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 6px));
  } 
`;

export const RegisterBannerBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CtaContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.headlines.big.fontSize};
  font-family: ${({ theme }) => theme.typography.headlines.big.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;

export const Slider = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding-top: 24px;
  overflow: hidden;

  &:hover {
    div {
      animation-play-state: paused;
    }
  }
`;

export const TilesGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  white-space: nowrap;
  animation: ${slideAnimation} 20s infinite linear;
`;
