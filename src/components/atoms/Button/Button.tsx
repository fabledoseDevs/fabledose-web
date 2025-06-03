import { ButtonBody, ButtonWrapper, LinkButtonBody } from './Button.styled';
import type {
  ActionSelector as ActionSelectorType,
  Button as ButtonType,
} from './Button.types';
import { ACTION_TYPE } from './Button.types';

const actionTypeSelector: ActionSelectorType = ({
  actionType,
  text,
  payload,
  isDisabled,
}) => {
  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          href={payload ? (payload as string) : '#'}
          aria-label={text}
        >
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
        >
          {text}
        </ButtonBody>
      );
    case ACTION_TYPE.FUNCTION_TRIGGER:
      return (
        <ButtonBody
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
  payload,
  isDisabled = false,
}) => (
  <ButtonWrapper>
    {actionTypeSelector({
      actionType,
      text,
      payload,
      isDisabled,
    })}
  </ButtonWrapper>
);
