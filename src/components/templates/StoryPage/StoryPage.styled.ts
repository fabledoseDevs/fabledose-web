import styled from '@emotion/styled';

export const StoryPageBody = styled.main<{ $isIntro?: boolean; $sidebarHidden?: boolean }>`
  width: 100%;
  min-height: 100vh;
  margin-left: ${({ $isIntro }) => ($isIntro ? '20px' : '0')};
  transition: margin-left 0.3s ease-in-out;
  overflow-x: hidden;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: ${({ $sidebarHidden }) => ($sidebarHidden ? '0' : '70px')};
  }
`;

export const StoryPageCenteredContent = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const IntroWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

export const FavoriteButton = styled.button`
  position: fixed;
  top: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;
