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
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
`;

export const CtaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
  gap: 1.6rem;
  text-align: center;
  width: 100%;
  padding: 0 1.6rem;

  @media ${({ theme }) => theme.media.laptop} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.headlines.big.fontSize};
  font-family: ${({ theme }) => theme.typography.headlines.big.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
`;

export const Slider = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 4.8rem 0;
  overflow: hidden;
  width: 100dvw;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      div {
        animation-play-state: paused;
      }
    }
  }
`;

export const WhiteBackground = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
  width: 100%;
  height: 30%;
`;

export const TilesGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  white-space: nowrap;
  animation: ${slideAnimation} 20s infinite linear;
`;
