import { ACTION_TYPE, actionSelector as actionSelectorType, Button as ButtonType } from './Button.types';
import { ButtonBody, ButtonIcon, ButtonWrapper, LinkButtonBody } from './Button.styled';

const actionTypeSelector: actionSelectorType = (
  variant,
  color,
  actionType,
  text,
  payload,
  isDisabled,
  icon,
) => {
  switch (actionType) {
    case ACTION_TYPE.NAVIGATION:
      return (
        <LinkButtonBody
          href={payload ? payload as string : '#'}
          aria-label={text}
        >
          {icon ? <ButtonIcon src={icon} alt={text} /> : null}
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
          colorvariant={color}
          sizevariant={variant}
        >
          {icon ? <ButtonIcon src={icon} alt={text} /> : null}
          {text}
        </ButtonBody>
      );
    case ACTION_TYPE.FUNCTION_TRIGGER:
      return (
        <ButtonBody
          onClick={payload as () => void}
          aria-label={text}
          disabled={isDisabled}
          colorvariant={color}
          sizevariant={variant}
        >
          {icon ? <ButtonIcon src={icon} alt={text} /> : null}
          {text}
        </ButtonBody>
      );
    default:
      return null;
  }
};

export const Button: ButtonType = (
  {
    variant,
    color,
    text,
    actionType,
    icon,
    payload,
    isDisabled = false,
  }) => {

  return (
    <ButtonWrapper>
      {actionTypeSelector(variant, color, actionType, text, payload, isDisabled, icon)}
    </ButtonWrapper>
  );
}