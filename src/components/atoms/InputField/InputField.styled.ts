import styled from '@emotion/styled';

export const InputContainer = styled.div<{ width?: number }>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

export const InputBody = styled.input<{ width?: number; hasError?: boolean }>`
  display: block;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  min-width: 280px;
  height: 44px;
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  font-family: ${({ theme }) => theme.typography.inputs.default.fontFamily};
  font-size: ${({ theme }) => theme.typography.inputs.default.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? 'red' : theme.palette.byElement.background.purple};
  border-radius: 22px;
  padding: 12px 40px 12px 16px;

  &::placeholder {
    color: #999;
    opacity: 1;
  }

  &:focus,
  &:focus-visible,
  &:active {
    border: 2px solid
      ${({ theme, hasError }) =>
        hasError ? 'red' : theme.palette.byElement.background.purple};
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const ErrorMessage = styled.div`
  position: relative;
  color: red;
  font-size: ${({ theme }) => theme.typography.inputs.error.fontSize};
  margin-top: 4px;
  padding-left: 24px;
  font-family: ${({ theme }) => theme.typography.inputs.error.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};

  svg {
    position: absolute;
    left: 6px;
    top: 0;
    display: inline-block;
    width: 16px;
    height: 16px;
  }
`;
