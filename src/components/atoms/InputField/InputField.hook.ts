import { useEffect, useState } from 'react';

import type {
  GetIconFunction,
  GetInputTypeFunction,
  UseInputText as UseInputTextType,
} from './InputField.types';
import { INPUT_ICON, INPUT_TYPE } from './InputField.types';

const useInputText: UseInputTextType = () => {
  const [defaultState, setDefaultState] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    setDefaultState(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const getInputType: GetInputTypeFunction = type => {
    if (type === INPUT_TYPE.PASSWORD && showPassword) {
      return INPUT_TYPE.TEXT;
    }
    return type;
  };

  const getIcon: GetIconFunction = type => {
    if (type === INPUT_TYPE.PASSWORD) {
      return {
        icon: showPassword ? INPUT_ICON.EYE_SLASH : INPUT_ICON.EYE,
        onClick: togglePasswordVisibility,
      };
    }

    if (type === INPUT_TYPE.SEARCH) {
      return {
        icon: INPUT_ICON.MAGNIFYING_GLASS,
        onClick: undefined,
      };
    }

    return {
      icon: null,
      onClick: undefined,
    };
  };

  return {
    defaultState,
    showPassword,
    togglePasswordVisibility,
    getInputType,
    getIcon,
  };
};

export default useInputText;
