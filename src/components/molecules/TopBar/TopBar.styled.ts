import styled from '@emotion/styled';

interface TopBarBodyProps {
  isTransparent: boolean;
}

export const TopBarBody = styled.div<TopBarBodyProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 1rem 2rem;
  background-color: transparent;
  transition: background-color 0.3s ease;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    position: fixed;
    background-color: ${({ theme, isTransparent }) =>
      isTransparent
        ? 'transparent'
        : theme.palette.byElement.background.purple};
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 200px;

  img {
    display: block;
    margin: 0 auto;
    width: 50%;
    height: auto;
  }

  @media ${({ theme }) => theme.media.tablet} {
    width: auto;
    margin-top: unset;

    img {
      width: 150px;
      height: 40px;
      display: inline;
      margin: unset;
    }
  }
`;

export const ActionsContainer = styled.div`
  display: none;

  @media ${({ theme }) => theme.media.tablet} {
    display: flex;
    align-items: center;
    gap: 4rem;
  }
`;
