import styled from '@emotion/styled';

export const JumbotronBody = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: ${({ theme }) =>
    theme.palette.byElement.background.gradientPurpleFade};
`;

export const JumbotronContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  gap: 24px;
`;
