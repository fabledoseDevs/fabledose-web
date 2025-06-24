import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

import useInputText from './InputField.hook';
import {
  ErrorMessage,
  IconWrapper,
  InputBody,
  InputContainer,
} from './InputField.styled';
import type {
  InputField as InputFieldType,
  RenderIconFunction,
} from './InputField.types';
import { INPUT_ICON } from './InputField.types';

export const InputField: InputFieldType = ({
  type,
  placeholder,
  fixedWidth,
  errorMessage,
}) => {
  const { getInputType, getIcon } = useInputText();
  const inputType = getInputType(type);
  const { icon, onClick } = getIcon(type);

  const renderIcon: RenderIconFunction = () => {
    if (!icon) return null;

    let IconComponent;
    switch (icon) {
      case INPUT_ICON.EYE:
        IconComponent = EyeIcon;
        break;
      case INPUT_ICON.EYE_SLASH:
        IconComponent = EyeSlashIcon;
        break;
      case INPUT_ICON.MAGNIFYING_GLASS:
        IconComponent = MagnifyingGlassIcon;
        break;
      default:
        return null;
    }

    return (
      <IconWrapper onClick={onClick}>
        <IconComponent width={20} height={20} />
      </IconWrapper>
    );
  };

  return (
    <>
      <InputContainer width={fixedWidth}>
        <InputBody
          type={inputType}
          placeholder={placeholder}
          width={fixedWidth}
          hasError={!!errorMessage}
        />
        {renderIcon()}
        {errorMessage && (
          <ErrorMessage>
            <ExclamationTriangleIcon />
            {errorMessage}
          </ErrorMessage>
        )}
      </InputContainer>
    </>
  );
};
