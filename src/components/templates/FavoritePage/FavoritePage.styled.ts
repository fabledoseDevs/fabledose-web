import styled from '@emotion/styled';

export const FavoritePageBody = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;

  @media ${({ theme }) => theme.media.tablet} {
    padding: 60px 40px;
    margin-left: 70px;
  }
`;

export const SectionSpacing = styled.section`
  margin-bottom: 60px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: 80px;
  }
`;

export const CarouselSection = styled.section`
  margin-bottom: 60px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: 80px;
  }
`;
