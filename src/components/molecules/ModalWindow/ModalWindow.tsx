import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

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
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseIconButton onClick={onClose} aria-label="Close">
          <XMarkIcon />
        </CloseIconButton>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
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
