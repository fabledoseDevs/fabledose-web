import styled from '@emotion/styled';

export const SettingsPageBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  margin-bottom: 50px;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    margin-bottom: 0;
    margin-left: 70px;
    width: calc(100% - 70px);
  }
`;

export const SettingsMenuColumn = styled.div`
  background-color: ${({ theme }) =>
    theme.palette.byElement.background.darkPurple};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 16px;
  padding: 24px;

  @media ${({ theme }) => theme.media.tablet} {
    width: 240px;
    min-width: 240px;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 0;
    padding: 48px 24px;
  }
`;

export const SettingsContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 12px;
  flex: 1;
  padding: 24px;

  @media ${({ theme }) => theme.media.tablet} {
    padding: 48px;
  }
`;

export const Content = styled.div`
  max-width: 660px;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const LegalLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LegalLinkItem = styled.li`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  cursor: pointer;
  display: flex;
  align-items: center;

  &::before {
    content: '•';
    margin-right: 8px;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const CookieStaticWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CookieLabel = styled.span`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  margin-left: 48px;
`;

export const CookieState = styled.span`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.4rem;
  margin-right: 48px;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.palette.byElement.text.white
      : theme.palette.byElement.text.ecru};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.8rem;
  font-weight: ${({ theme, isActive }) =>
    isActive
      ? theme.typography.fontWeights.semibold
      : theme.typography.fontWeights.regular};
  text-align: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.palette.byElement.text.white};
  }

  @media ${({ theme }) => theme.media.tablet} {
    text-align: left;
    padding: 12px 0;
  }
`;
