import styled from '@emotion/styled';

export const FableTileBody = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 410px;
  border: 8px solid transparent;
  border-radius: 24px;
  transition: all 0.4s ease;
  overflow: clip;
  transform-origin: center center;
  will-change: transform, box-shadow, border;
  width: 260px;
  max-width: 300px;

  &:hover,
  &.active {
    box-shadow: 0 14px 24px 0
      ${({ theme }) => theme.palette.byElement.shadows.purple[20]};
    border: 8px solid ${({ theme }) => theme.palette.byElement.background.white};
    /* Raise the tile visually and scale from center without changing layout width */
    transform: translateY(-12px) scale(1.08);
    z-index: 2;

    div[data-overlay] {
      transform: translateY(0);
    }
  }
`;

export const ProgressBarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  z-index: 10;
`;

export const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: linear-gradient(90deg, 
    #a370f7 0%,
    #d8a8ff 100%);
  transition: width 0.3s ease;
`;

export const ButtonsDrawer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 8px;
  width: 100%;
  padding: 16px 12px 20px;
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(100%);
  transition: all 0.4s ease;
  box-sizing: border-box;
  min-height: 40%;

  p {
    width: 100%;
    max-width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
    margin: 0;
  }

  > *:last-child {
    align-self: center;
  }
`;
