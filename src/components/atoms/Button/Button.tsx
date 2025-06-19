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
}) => {
  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          styleVariant={variant}
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
}) => (
  <ButtonWrapper>
    {actionTypeSelector({
      actionType,
      variant,
      text,
      payload,
      isDisabled,
    })}
  </ButtonWrapper>
);
