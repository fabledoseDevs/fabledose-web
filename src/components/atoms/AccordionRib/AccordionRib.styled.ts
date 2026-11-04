import styled from '@emotion/styled';

export const AccordionRibBody = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid
    ${({ theme }) => theme.palette.byElement.background.purple};
  transition: all 0.3s ease-in-out;
  will-change: height;
`;

export const StaticBar = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  padding: 12px 0 12px 12px;
  border: none;
  background: none;
  cursor: pointer;
  user-select: none;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.byElement.text.purple};
    outline-offset: 2px;
  }
`;

export const MainText = styled.p`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const ExpandButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
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
  display: grid;
  grid-template-rows: ${({ isOpen }) => (isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 0.3s ease-in-out;
  > div {
    min-height: 0;
    overflow: hidden;
  }
  > div > div {
    padding: 0 24px 24px;
  }
`;
