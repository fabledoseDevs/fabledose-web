import { useEffect, useState } from 'react';
import { ToastContainer } from './Toast.styled';
import type { ToastProps } from './Toast.types';

const TOAST_EXIT_ANIMATION_DURATION = 300;

export const Toast = ({ message, duration = 3000, onClose }: ToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  useEffect(() => {
    if (isExiting) {
      const exitTimer = setTimeout(() => {
        onClose?.();
      }, TOAST_EXIT_ANIMATION_DURATION);
      return () => clearTimeout(exitTimer);
    }
  }, [isExiting, onClose]);

  return <ToastContainer $isExiting={isExiting}>{message}</ToastContainer>;
};
