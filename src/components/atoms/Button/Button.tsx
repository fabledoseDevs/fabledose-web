import {
  ButtonBody,
  ButtonContent,
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
  actionType,
  variant,
  text,
  payload,
  isDisabled,
  fixedWidth,
  iconUrl,
}) => {
  const renderContent = () => (
    <ButtonContent>
      {iconUrl && <ButtonIcon src={iconUrl} alt="" />}
      {text}
    </ButtonContent>
  );

  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          styleVariant={variant}
          width={fixedWidth ? `${fixedWidth}px` : 'auto'}
          href={payload ? (payload as string) : '#'}
          aria-label={text}
        >
          {renderContent()}
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
          {renderContent()}
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
          {renderContent()}
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
  iconUrl,
}) => (
  <ButtonWrapper>
    {actionTypeSelector({
      actionType,
      variant,
      text,
      payload,
      isDisabled,
      fixedWidth,
      iconUrl,
    })}
  </ButtonWrapper>
);
