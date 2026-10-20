import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  padding: 16px;
  background-color: rgba(23, 15, 47, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

export const ModalContainer = styled.div<{ $width?: number }>`
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
  border-radius: 24px;
  width: ${({ $width }) => ($width ? `${$width}px` : 'auto')};
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.modalContent};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

export const ModalHeader = styled.div`
  padding: 24px 64px 16px 24px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fonts.headline};
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const CloseIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.byElement.text.purple};
  }

  &:hover {
    opacity: 0.7;
  }
`;

export const ModalContent = styled.div`
  padding: 0 24px 24px;
  min-height: 0;
  min-width: 0;
  overscroll-behavior: contain;
  overflow-y: auto;
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fonts.default};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const ModalFooter = styled.div`
  padding: 16px 32px 32px;
  display: flex;
  justify-content: center;
`;
