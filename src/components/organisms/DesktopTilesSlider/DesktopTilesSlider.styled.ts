import styled from '@emotion/styled';

export const DesktopTilesSliderBody = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 0.8rem;
  position: relative;
  top: 34px;
`;

export const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.headlines.small.fontFamily};
  font-size: ${({ theme }) => theme.typography.headlines.small.fontSize};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

export const Arrows = styled.div`
  display: flex;
`;

export const ArrowButton = styled.button<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  padding: 48px 0 0 0;
`;

export const EmblaContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export const EmblaSlide = styled.div``;
