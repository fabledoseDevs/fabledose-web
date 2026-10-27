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
 * @property width - Optional preferred dialog width in pixels, constrained to the viewport.
 * @property title - Optional title displayed at the top of the modal.
 */
export interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  title?: string;
  width?: number;
  /** Localized label shared by the existing close icon and optional footer button; defaults preserve legacy labels. */
  closeLabel?: string;
}

/**
 * Component renders a modal window with a darkened and blurred background.
 * It locks body scroll and renders through a portal so cards cannot clip the overlay.
 * The portal targets the active fullscreen element when present, otherwise the document body.
 * Keyboard focus stays in the dialog and returns to the opener on close.
 * Escape, the close icon and the optional footer button all use onClose.
 *
 * @remarks
 * Header and footer remain outside the single scrollable content region. Use closeLabel
 * for localized dialogs and a stable onClose handler when possible.
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
