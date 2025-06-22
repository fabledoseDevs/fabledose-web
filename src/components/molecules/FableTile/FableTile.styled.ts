import styled from '@emotion/styled';

export const FableTileBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 276px;
  border: 8px solid transparent;
  border-radius: 24px;
  transition: all 0.4s ease;
  overflow: clip;
  margin-top: 0;
  margin-bottom: 0;

  &:hover {
    box-shadow: 0px 24px 64px 0px
      ${({ theme }) => theme.palette.byElement.background.darkPurple};
    border: 8px solid ${({ theme }) => theme.palette.byElement.background.white};
    margin-top: -24px;
    margin-bottom: 24px;

    div {
      transform: translateY(0);
    }
  }
`;

export const ButtonsDrawer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding-bottom: 12px;
  transform: translateY(125px);
  transition: all 0.4s ease;
`;
