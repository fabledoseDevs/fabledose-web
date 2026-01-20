import styled from '@emotion/styled';

export const SettingsSwitchBody = styled.div`
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

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
`;

export const ToggleTrack = styled.div<{ isActive: boolean }>`
  width: 48px;
  height: 24px;
  background: ${({ theme, isActive }) =>
    isActive
      ? '#4485FF' // Adjusted based on image - standard toggle blue
      : theme.palette.byElement.background.transparentWhite['30']};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  border: 1px solid white;
`;

export const ToggleThumb = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: ${({ isActive }) => (isActive ? '25px' : '1px')};
  transition: left 0.3s ease;
`;

export const StateLabel = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;
