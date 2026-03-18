import styled from '@emotion/styled';

export const CataloguePageBody = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.byElement.background.purple};
  padding: 24px 16px 82px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: 70px;
    width: calc(100% - 70px);
    padding: 36px 32px 36px;
  }

  @media ${({ theme }) => theme.media.desktop} {
    padding: 40px 48px;
  }
`;

export const TopSection = styled.section`
  width: 100%;
  margin: 24px auto 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

export const SearchFieldHolder = styled.div`
  width: 100%;
  max-width: 420px;
  margin-top: 6px;
  position: relative;
`;

export const MobileQuickResults = styled.div`
  margin-top: 12px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.palette.byElement.background.white};
  background-color: ${({ theme }) =>
    theme.palette.byElement.background.darkPurple};
  overflow: hidden;

  @media ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;

export const MobileQuickResultsSection = styled.div`
  padding: 12px;

  &:not(:last-of-type) {
    border-bottom: 1px solid
      ${({ theme }) =>
        theme.palette.byElement.background.transparentWhite['20']};
  }
`;

export const MobileQuickResultsTitle = styled.h3`
  margin: 0 0 8px;
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.palette.byElement.text.white};
`;

export const MobileQuickResultButton = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  display: block;
  background: ${({ theme, isSelected }) =>
    isSelected
      ? theme.palette.byElement.background.transparentWhite['20']
      : 'transparent'};
  border: 0;
  color: ${({ theme }) => theme.palette.byElement.text.ecru};
  text-align: left;
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
`;

export const MainContent = styled.section`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: minmax(300px, 1.2fr) minmax(260px, 1fr) minmax(
        260px,
        1fr
      );
    align-items: start;
    gap: 24px;
    margin-top: 56px;
  }
`;

export const Column = styled.div`
  min-height: 0;
`;

export const DesktopOnlyColumn = styled(Column)`
  display: none;

  @media ${({ theme }) => theme.media.tablet} {
    display: block;
  }
`;
