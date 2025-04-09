import styled from '@emotion/styled';

export const CtaPanelBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.basic.beige};

  svg {
    width: 100%;
    height: auto;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;
  flex-grow: 2;
  padding: 2rem;
`;
