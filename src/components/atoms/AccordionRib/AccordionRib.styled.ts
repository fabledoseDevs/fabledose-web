import styled from '@emotion/styled';

export const AccordionRibBody = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid
    ${({ theme }) => theme.palette.byElement.background.purple};
`;

export const StaticBar = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  user-select: none;
`;

export const MainText = styled.p`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const ExpandButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.byElement.text.purple};
  }
`;

export const ExpandableContent = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: height 0.5s ease-in-out;
  padding: ${({ isOpen }) => (isOpen ? '16px 0' : '0')};
`;
