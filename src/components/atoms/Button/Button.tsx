import { ButtonBody, ButtonWrapper, LinkButtonBody } from './Button.styled';
import type {
  ActionSelector as ActionSelectorType,
  Button as ButtonType,
} from './Button.types';
import { ACTION_TYPE } from './Button.types';

const actionTypeSelector: ActionSelectorType = ({
  actionType,
  variant,
  text,
  payload,
  isDisabled,
  fixedWidth,
}) => {
  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          styleVariant={variant}
          width={fixedWidth ? `${fixedWidth}px` : 'auto'}
          href={payload ? (payload as string) : '#'}
          aria-label={text}
        >
          {text}
        </LinkButtonBody>
      );
    case ACTION_TYPE.SUBMIT:
      return (
        <ButtonBody
          styleVariant={variant}
          width={fixedWidth ? `${fixedWidth}px` : 'auto'}
          type="submit"
          aria-label={text}
          disabled={isDisabled}
          form={payload as string}
        >
          {text}
        </ButtonBody>
      );
    case ACTION_TYPE.FUNCTION_TRIGGER:
      return (
        <ButtonBody
          styleVariant={variant}
          width={fixedWidth ? `${fixedWidth}px` : 'auto'}
          onClick={payload as () => void}
          aria-label={text}
          disabled={isDisabled}
        >
          {text}
        </ButtonBody>
      );
    default:
      return <></>;
  }
};

export const Button: ButtonType = ({
  text,
  actionType,
  variant,
  payload,
  isDisabled = false,
  fixedWidth,
}) => (
  <ButtonWrapper>
    {actionTypeSelector({
      actionType,
      variant,
      text,
      payload,
      isDisabled,
      fixedWidth,
    })}
  </ButtonWrapper>
);
