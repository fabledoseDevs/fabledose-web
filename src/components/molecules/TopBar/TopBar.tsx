import Image from 'next/image';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';

import { useTopBarScroll } from './TopBar.hook';
import { ActionsContainer, LogoContainer, TopBarBody } from './TopBar.styled';
import type { TopBar as TopBarType } from './TopBar.types';

export const TopBar: TopBarType = () => {
  const { isTransparent } = useTopBarScroll();

  return (
    <TopBarBody isTransparent={isTransparent}>
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
          width={{
            widthType: WIDTH_TYPE.AUTO,
          }}
          payload="/login"
        />
      </ActionsContainer>
    </TopBarBody>
  );
};
