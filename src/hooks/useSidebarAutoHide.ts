'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseSidebarAutoHideResult {
  isHidden: boolean;
}

const AUTO_HIDE_DELAY = 2000;
const MOUSE_EDGE_THRESHOLD = 30;

export const useSidebarAutoHide = (enabled: boolean = false): UseSidebarAutoHideResult => {
  const [isHidden, setIsHidden] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMovementRef = useRef<number>(Date.now());

  const startAutoHideTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsHidden(true);
    }, AUTO_HIDE_DELAY);
  }, []);

  const resetAutoHideTimer = useCallback(() => {
    setIsHidden(false);
    startAutoHideTimer();
  }, [startAutoHideTimer]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();

      if (isHidden && e.clientX < MOUSE_EDGE_THRESHOLD) {
        resetAutoHideTimer();
      } else if (!isHidden && now - lastMovementRef.current > 500) {
        lastMovementRef.current = now;
        resetAutoHideTimer();
      }
    },
    [isHidden, resetAutoHideTimer],
  );

  useEffect(() => {
    if (!enabled) {
      setIsHidden(false);
      return;
    }

    startAutoHideTimer();
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [enabled, startAutoHideTimer, onMouseMove]);

  return { isHidden };
};