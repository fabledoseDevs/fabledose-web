import styled from '@emotion/styled';

export const SidebarBody = styled.aside`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 50px;
  padding: 0;
  background-color: ${({ theme }) =>
    theme.palette.byElement.background.extraDarkPurple};
  z-index: ${({ theme }) => theme.zIndex.top};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.media.tablet} {
    top: 0;
    bottom: auto;
    width: 70px;
    height: 100vh;
    padding: 7px;

    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

export const LogoWrapper = styled.div`
  display: none;
  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MiddleMenuHolder = styled.div`
  display: none;
  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BottomMenuHolder = styled.div`
  display: none;
  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileMenuHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;
