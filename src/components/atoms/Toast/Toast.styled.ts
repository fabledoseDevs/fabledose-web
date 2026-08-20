import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div<{ $isExiting?: boolean }>`
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  max-width: calc(100% - 32px);
  background: ${({ theme }) => theme.palette.byElement.background.extraDarkPurple};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 9999;
  animation: ${({ $isExiting }) => ($isExiting ? slideOut : slideIn)} 0.3s ease-out forwards;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => theme.palette.byElement.background.transparentWhite['20']};
  pointer-events: none;

  @media ${({ theme }) => theme.media.mobile} {
    bottom: 80px;
  }
`;
