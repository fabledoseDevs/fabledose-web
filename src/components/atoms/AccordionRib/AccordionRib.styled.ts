import styled from '@emotion/styled';

export const AccordionRibBody = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid
    ${({ theme }) => theme.palette.byElement.background.purple};
  will-change: height;
`;

export const StaticBar = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0 12px 12px;
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
  height: 0;
  padding: ${({ isOpen }) => (isOpen ? '16px 24px 24px' : '0 24px 0')};
  will-change: height, padding;
`;
