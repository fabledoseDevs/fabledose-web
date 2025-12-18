import styled from '@emotion/styled';

export const UserDesktopBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0;
  margin-top: 24px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: 86px;
  }
`;

export const EmblaViewport = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

export const EmblaContainer = styled.div`
  display: flex;
`;

export const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

export const Pagination = styled.div`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 24px;
  pointer-events: auto;
`;

export const Dot = styled.button<{ active?: boolean }>`
  width: 32px;
  height: 8px;
  border-radius: 6px;
  border: none;
  background: ${({ theme }) => theme.palette.byElement.text.white};
  opacity: ${({ active }) => (active ? 1 : 0.35)};
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
`;
