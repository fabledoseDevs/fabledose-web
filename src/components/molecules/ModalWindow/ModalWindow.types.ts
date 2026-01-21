import type { ReactElement, ReactNode } from 'react';

/**
 * @module
 * Types and interfaces for the ModalWindow component.
 */

/**
 * Interface for ModalWindow component props.
 *
 * @property isOpen - Indicates whether the modal is currently open.
 * @property onClose - Function called when the modal should be closed.
 * @property children - The content to be displayed inside the modal window.
 * @property showCloseButton - If true, an additional close button is displayed at the bottom of the modal.
 * @property closeOnOverlayClick - If true, clicking on the darkened/blurred background will trigger onClose.
 * @property title - Optional title displayed at the top of the modal.
 */
export interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  title?: string;
}

/**
 * Component renders a modal window with a darkened and blurred background.
 * It locks the body scroll when open and provides several ways to close it.
 *
 * @param props - The component properties.
 *
 * @returns A ReactElement containing the modal UI.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <ModalWindow
 *   isOpen={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   title="Terms and Conditions"
 *   showCloseButton
 *   closeOnOverlayClick
 * >
 *   <p>Here are the terms...</p>
 * </ModalWindow>
 * ```
 */
export type ModalWindow = (props: ModalWindowProps) => ReactElement | null;
