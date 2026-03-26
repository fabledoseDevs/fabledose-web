import styled from '@emotion/styled';

import { theme } from '@/styles/theme';

export const AudiobookBody = styled.section`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px 16px;
  border-radius: 30px;
  background: ${theme.palette.byElement.background.gradientWhite};

  @media ${theme.media.tablet} {
    padding: 24px;
  }

  @media ${theme.media.laptop} {
    padding: 28px 36px 32px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 1 / 1;
  margin: 8px auto 18px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px ${theme.palette.byElement.shadows.purple['20']};

  img {
    object-fit: cover;
  }

  @media ${theme.media.tablet} {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

export const ControlsArea = styled.div`
  width: 100%;
`;

export const TitleRow = styled.div`
  margin-bottom: 12px;
`;

export const ProgressRow = styled.div`
  margin-bottom: 26px;
`;

export const ActionsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  @media ${theme.media.tablet} {
    gap: 22px;
  }
`;
