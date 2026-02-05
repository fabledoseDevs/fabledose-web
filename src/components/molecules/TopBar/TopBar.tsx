import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import { handleLanguageChange } from '@/lang/lang.helpers';

import { useTopBarScroll } from './TopBar.hook';
import { ActionsContainer, LogoContainer, TopBarBody } from './TopBar.styled';
import type { TopBar as TopBarType } from './TopBar.types';

export const TopBar: TopBarType = () => {
  const { isTransparent } = useTopBarScroll();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { common } = useDictionary();
  const currentLang = (params?.lang as string) || 'en';

  const getDisplayLanguage = (lang: string) => {
    switch (lang) {
      case 'pl':
        return 'Polski';
      case 'en':
        return 'English';
      default:
        return 'Language';
    }
  };

  const onLanguageChange = (selectedOption: string) => {
    handleLanguageChange(selectedOption, currentLang, pathname, router);
  };

  return (
    <TopBarBody isTransparent={isTransparent}>
      <LogoContainer>
        <Image src="/logo-white.svg" alt="Logo" width={150} height={40} />
      </LogoContainer>
      <ActionsContainer>
        <Dropdown
          options={['Polski', 'English']}
          title="Language"
          defaultValue={getDisplayLanguage(currentLang)}
          colorScheme={COLOR_SCHEME.WHITE}
          onChange={onLanguageChange}
        />
        <Button
          text={common.login}
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
