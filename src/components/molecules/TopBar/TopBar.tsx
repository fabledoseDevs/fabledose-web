import Image from 'next/image';

import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';

import { ActionsContainer, LogoContainer, TopBarBody } from './TopBar.styled';
import type { TopBar as TopBarType } from './TopBar.types';

export const TopBar: TopBarType = () => (
  <TopBarBody>
    <LogoContainer>
      <Image src="/logo-white.svg" alt="Logo" width={150} height={40} />
    </LogoContainer>
    <ActionsContainer>
      <Dropdown
        options={['Polski', 'English']}
        title="Language"
        defaultValue="Polski"
        colorScheme={COLOR_SCHEME.PURPLE}
      />
      <Button
        text="Zaloguj się"
        actionType={ACTION_TYPE.NAVIGATION}
        variant={BUTTON_VARIANT.RED}
        payload="/login"
      />
    </ActionsContainer>
  </TopBarBody>
);
