'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';

import {
  CloseIconButton,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from './ModalWindow.styled';
import type { ModalWindow as ModalWindowType } from './ModalWindow.types';

export const ModalWindow: ModalWindowType = ({
  isOpen,
  onClose,
  children,
  showCloseButton = false,
  closeOnOverlayClick = false,
  title,
  width,
  closeLabel,
}) => {
  const titleId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const focusable = () =>
      [
        ...(containerRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) || []),
      ].filter(element => element.getClientRects().length > 0);
    (focusable()[0] || containerRef.current)?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeRef.current();
      }
      if (event.key === 'Tab') {
        const items = focusable();
        const first = items[0];
        const last = items[items.length - 1];
        if (!first) {
          event.preventDefault();
          containerRef.current?.focus();
        } else if (
          !containerRef.current?.contains(document.activeElement) ||
          (event.shiftKey && document.activeElement === first) ||
          (!event.shiftKey && document.activeElement === last)
        ) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus?.isConnected)
        previousFocus.focus({ preventScroll: true });
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer
        ref={containerRef}
        tabIndex={-1}
        $width={width}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={e => e.stopPropagation()}
      >
        <CloseIconButton
          type="button"
          onClick={onClose}
          aria-label={closeLabel || 'Close'}
        >
          <XMarkIcon />
        </CloseIconButton>
        {title && (
          <ModalHeader>
            <ModalTitle id={titleId}>{title}</ModalTitle>
          </ModalHeader>
        )}
        <ModalContent style={{ paddingTop: title ? 0 : '48px' }}>
          {children}
        </ModalContent>
        {showCloseButton && (
          <ModalFooter>
            <Button
              text={closeLabel || 'Zamknij'}
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.RED}
              payload={onClose}
              width={{ widthType: WIDTH_TYPE.PX, widthValue: 200 }}
            />
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>,
    document.fullscreenElement || document.body,
  );
};
