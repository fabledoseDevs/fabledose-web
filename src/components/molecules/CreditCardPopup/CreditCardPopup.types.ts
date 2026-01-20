import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for CreditCardPopup component.
 */

/**
 * Interface for CreditCardPopup component props.
 *
 * @property isOpen - Boolean flag indicating if the popup is open.
 * @property onClose - Function to close the popup.
 * @property onSave - Function to save the card data.
 */
export interface CreditCardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardNumber: string) => void;
}

/**
 * Interface for the values returned by the useCreditCardPopup hook.
 *
 * @property cardNumber - The current card number value.
 * @property handleCardNumberChange - Event handler for card number change.
 * @property handleSave - Function to handle the save action.
 */
export interface UseCreditCardPopupReturnValues {
  cardNumber: string;
  handleCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

/**
 * Hook to manage the state and logic for the CreditCardPopup component.
 *
 * @param props - The component properties.
 * @returns An object containing the state and handlers for the popup.
 */
export type UseCreditCardPopup = (
  props: Pick<CreditCardPopupProps, 'onSave' | 'onClose'>,
) => UseCreditCardPopupReturnValues;

/**
 * Component renders a popup for entering credit card information.
 *
 * @param props - The component properties.
 * @group Component
 */
export type CreditCardPopup = (
  props: CreditCardPopupProps,
) => ReactElement | null;
