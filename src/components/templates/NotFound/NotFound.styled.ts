import styled from '@emotion/styled';

export const NotFoundBody = styled.main`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
`;

export const BackgroundLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
`;

export const OverlayLayer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const Content = styled.section`
  width: min(100%, 760px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 96px 16px 24px;
  text-align: center;
  position: relative;
  z-index: 2;
`;
