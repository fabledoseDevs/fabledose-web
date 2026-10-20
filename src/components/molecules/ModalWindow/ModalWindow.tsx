import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useId } from 'react';

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
}) => {
  const titleId = useId();
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer
        $width={width}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={e => e.stopPropagation()}
      >
        <CloseIconButton onClick={onClose} aria-label="Close">
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
              text="Zamknij"
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.RED}
              payload={onClose}
              width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
            />
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};
