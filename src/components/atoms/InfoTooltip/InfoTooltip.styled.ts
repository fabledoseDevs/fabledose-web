import styled from '@emotion/styled';

export const InfoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.palette.byElement.text.white};
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  right: 0;
  width: 240px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.byElement.background.white};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  border: 1px solid ${({ theme }) => theme.palette.byColor.white.ecru};
  box-shadow: 0 8px 8px
    ${({ theme }) => theme.palette.byElement.shadows.purple['10']};
  z-index: ${({ theme }) => theme.zIndex.higher};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.4rem;
  line-height: 1.4;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 12px;
    border-width: 6px;
    border-style: solid;
    border-color: ${({ theme }) => theme.palette.byElement.background.white}
      transparent transparent transparent;
  }
`;

export const TooltipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
`;

export const TooltipDesc = styled.div`
  opacity: 0.85;
`;
