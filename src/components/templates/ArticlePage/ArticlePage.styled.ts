import styled from '@emotion/styled';

export const ArticlePageBody = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.byElement.background.purple};
  padding: 28px 16px 82px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: 70px;
    width: calc(100% - 70px);
    padding: 36px 32px;
  }

  @media ${({ theme }) => theme.media.desktop} {
    padding: 44px 48px;
  }
`;

export const ArticlePageContent = styled.section`
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
`;

export const ArticlePageHeadlineWrapper = styled.header`
  margin: 8px 0 54px;
  text-align: center;
`;

export const ArticleSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const ArticleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ParagraphsHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BulletList = styled.ul`
  margin: 0 0 0 22px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.palette.byElement.text.ecru};

  li::marker {
    color: ${({ theme }) => theme.palette.byElement.text.ecru};
  }

  p {
    margin: 0;
  }
`;
