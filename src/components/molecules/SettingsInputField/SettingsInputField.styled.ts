import styled from '@emotion/styled';

export const SettingsInputFieldBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
  padding: 16px 0;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  margin-bottom: 8px;
  min-width: 200px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: 0;
    margin-right: 24px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const ValueDisplay = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  flex: 1;
`;

export const CardDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};

  svg {
    width: 28px;
    height: 28px;
  }
`;

export const InputField = styled.input`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.inputs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ theme }) =>
    theme.palette.byElement.background.transparentWhite['10']};
  border: 1px solid
    ${({ theme }) => theme.palette.byElement.background.transparentWhite['30']};
  border-radius: 4px;
  padding: 4px 8px;
  flex: 1;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.palette.byColor.white.full};
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.byElement.text.white};
  }
`;
