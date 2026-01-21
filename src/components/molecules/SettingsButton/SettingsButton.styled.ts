import styled from '@emotion/styled';

export const SettingsButtonBody = styled.div`
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

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 16px;
`;

export const CustomButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.palette.byColor.white.full};
  cursor: pointer;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.headline};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};

  span:first-of-type {
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  }

  span:last-of-type {
    font-family: ${({ theme }) => theme.typography.fonts.default};
  }
`;
