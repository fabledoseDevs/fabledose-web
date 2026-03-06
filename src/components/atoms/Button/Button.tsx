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
import { WIDTH_TYPE } from './Button.types';
import { ACTION_TYPE } from './Button.types';

const actionTypeSelector: ActionSelectorType = ({
  actionType,
  variant,
  text,
  payload,
  isDisabled,
  width = { widthType: WIDTH_TYPE.AUTO },
  iconUrl,
  iconSizeOverride,
}) => {
  const renderContent = () => (
    <ButtonContent>
      {iconUrl && (
        <ButtonIcon src={iconUrl} alt="" $iconSizeOverride={iconSizeOverride} />
      )}
      {text}
    </ButtonContent>
  );

  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          variant={variant}
          width={width}
          href={payload ? (payload as string) : '#'}
          aria-label={text}
        >
          {renderContent()}
        </LinkButtonBody>
      );
    case ACTION_TYPE.SUBMIT:
      return (
        <ButtonBody
          variant={variant}
          width={width}
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
          variant={variant}
          width={width}
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
  width,
  iconUrl,
  iconSizeOverride,
}) => (
  <ButtonWrapper width={width}>
    {actionTypeSelector({
      actionType,
      variant,
      text,
      payload,
      isDisabled,
      width,
      iconUrl,
      iconSizeOverride,
    })}
  </ButtonWrapper>
);
