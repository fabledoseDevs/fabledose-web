import {
  ButtonBody,
  ButtonIcon,
  ButtonWrapper,
  LinkButtonBody,
} from './Button.styled';
import type {
  ActionSelector as ActionSelectorType,
  Button as ButtonType,
} from './Button.types';
import { ACTION_TYPE } from './Button.types';

const actionTypeSelector: ActionSelectorType = ({
  variant,
  color,
  actionType,
  text,
  payload,
  isDisabled,
  icon,
}) => {
  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          colorVariant={color}
          sizeVariant={variant}
          href={payload ? (payload as string) : '#'}
          aria-label={text}
          iconIsPresent={!!icon}
        >
          {icon && <ButtonIcon src={icon} alt={text} sizeVariant={variant} />}
          {text}
        </LinkButtonBody>
      );
    case ACTION_TYPE.SUBMIT:
      return (
        <ButtonBody
          type="submit"
          aria-label={text}
          disabled={isDisabled}
          form={payload as string}
          colorVariant={color}
          sizeVariant={variant}
          iconIsPresent={!!icon}
        >
          {icon && <ButtonIcon src={icon} alt={text} sizeVariant={variant} />}
          {text}
        </ButtonBody>
      );
    case ACTION_TYPE.FUNCTION_TRIGGER:
      return (
        <ButtonBody
          onClick={payload as () => void}
          aria-label={text}
          disabled={isDisabled}
          colorVariant={color}
          sizeVariant={variant}
          iconIsPresent={!!icon}
        >
          {icon && <ButtonIcon src={icon} alt={text} sizeVariant={variant} />}
          {text}
        </ButtonBody>
      );
    default:
      return <></>;
  }
};

export const Button: ButtonType = ({
  variant,
  color,
  text,
  actionType,
  icon,
  payload,
  isDisabled = false,
}) => (
  <ButtonWrapper>
    {actionTypeSelector({
      variant,
      color,
      actionType,
      text,
      payload,
      isDisabled,
      icon,
    })}
  </ButtonWrapper>
);
