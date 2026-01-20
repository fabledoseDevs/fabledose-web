import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modalContent || 1000};
`;

export const PopupBody = styled.div`
  background: ${({ theme }) => theme.palette.byElement.background.white};
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.8rem;
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const Input = styled.input`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.palette.byColor.white.ecru};
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.palette.byElement.text.purple};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-weight: 600;
  transition: opacity 0.2s;

  background: ${({ theme, primary }) =>
    primary ? theme.palette.byElement.text.purple : 'transparent'};
  color: ${({ theme, primary }) =>
    primary
      ? theme.palette.byElement.text.white
      : theme.palette.byElement.text.purple};
  border: ${({ theme, primary }) =>
    primary ? 'none' : `1px solid ${theme.palette.byElement.text.purple}`};

  &:hover {
    opacity: 0.8;
  }
`;
