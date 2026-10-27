import styled from '@emotion/styled';

import { ResetButtonWrapper } from '@/atoms/ResetButton/ResetButton.styled';
import { Tooltip } from '@/atoms/TagIcon/TagIcon.styled';

export const StoryPageBody = styled.main<{
  $isIntro?: boolean;
  $sidebarHidden?: boolean;
}>`
  width: 100%;
  min-height: 100vh;
  margin-left: 0;
  transition: margin-left 0.3s ease-in-out;
  overflow-x: hidden;

  @media ${({ theme }) => theme.media.tablet} {
    width: ${({ $sidebarHidden }) =>
      $sidebarHidden ? '100%' : 'calc(100% - 70px)'};
    margin-left: ${({ $sidebarHidden }) => ($sidebarHidden ? '0' : '70px')};
  }
`;

export const StoryPageCenteredContent = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 16px calc(74px + env(safe-area-inset-bottom, 0px));
  @media ${({ theme }) => theme.media.tablet} {
    padding: 24px;
  }
  box-sizing: border-box;
`;

export const AudioPageContent = styled(StoryPageCenteredContent)`
  flex-direction: column;
  gap: 16px;

  > * {
    max-width: 1024px;
  }
`;

export const IntroWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
`;

export const FavoriteControl = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 10;
  width: 54px;
  height: 54px;
`;

export const FavoriteButton = styled(ResetButtonWrapper)``;

export const FavoriteTooltip = styled(Tooltip)`
  top: calc(100% + 8px);
  bottom: auto;
  left: auto;
  right: 0;
  transform: none;
  width: max-content;

  &::after {
    top: auto;
    bottom: 100%;
    left: auto;
    right: 21px;
    transform: none;
    border-color: transparent transparent
      ${({ theme }) => theme.palette.byElement.background.white} transparent;
  }
`;
