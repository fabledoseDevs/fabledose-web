import styled from '@emotion/styled';

export const SettingsRadioBody = styled.div`
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

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
`;

export const RadioOptionBox = styled.div<{
  isSelected: boolean;
  isDisabled?: boolean;
  optionFontFamily?: string;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.palette.byColor.white.full};
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.byColor.white.full : 'transparent'};
  color: ${({ theme, isSelected, isDisabled }) => {
    if (isDisabled)
      return theme.palette.byElement.background.transparentWhite['30'];
    return isSelected
      ? theme.palette.byElement.text.purple
      : theme.palette.byElement.text.white;
  }};
  font-family: ${({ theme, optionFontFamily }) =>
    optionFontFamily || theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  transition: all 0.3s ease;
  min-width: 60px;
  text-align: center;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

  &:hover {
    ${({ isSelected, isDisabled, theme }) =>
      !isSelected &&
      !isDisabled &&
      `background: ${theme.palette.byElement.background.transparentWhite['10']};`}
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;
