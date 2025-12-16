'use client';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  FLEX_DIRECTION,
} from '@/atoms/Container/Container.types';
import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR as PARAGRAPH_FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import { useDictionary } from '@/lang/DictionaryProvider';

import { useLogoutPage } from './LogoutPage.hook';
import { UserDesktopBody } from './LogoutPage.styled';
import type { LogoutPage as LogoutPageType } from './LogoutPage.types';

export const LogoutPage: LogoutPageType = () => {
  const { handleCancel, handleLogout, isLoggedOut } = useLogoutPage();
  const { common, logoutPage } = useDictionary();

  return (
    <UserDesktopBody>
      <Container
        containerType={CONTAINER_ELEMENT.SECTION}
        backgroundColor={BACKGROUND_COLOR.PURPLE}
        alignItems={FLEX_ALIGNMENT.CENTER}
        justifyContent={FLEX_ALIGNMENT.CENTER}
        gap
      >
        {isLoggedOut ? (
          <Paragraph
            color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
            alignment={TEXT_ALIGNMENT.CENTER}
          >
            {logoutPage.onSuccess}
          </Paragraph>
        ) : (
          <>
            <Headline
              weight={HEADLINE_TYPE.SMALL}
              color={FOREGROUND_COLOR.WHITE}
            >
              {logoutPage.headline}
            </Headline>
            <Container
              containerType={CONTAINER_ELEMENT.DIV}
              backgroundColor={BACKGROUND_COLOR.PURPLE}
              flexDirection={FLEX_DIRECTION.ROW}
              alignItems={FLEX_ALIGNMENT.CENTER}
              justifyContent={FLEX_ALIGNMENT.CENTER}
              gap
            >
              <Button
                actionType={ACTION_TYPE.FUNCTION_TRIGGER}
                variant={BUTTON_VARIANT.RED}
                text={common.logout}
                width={{
                  widthType: WIDTH_TYPE.PX,
                  widthValue: 200,
                }}
                payload={handleLogout}
              />
              <Button
                actionType={ACTION_TYPE.FUNCTION_TRIGGER}
                variant={BUTTON_VARIANT.WHITE}
                text={common.cancel}
                width={{
                  widthType: WIDTH_TYPE.PX,
                  widthValue: 200,
                }}
                payload={handleCancel}
              />
            </Container>
          </>
        )}
      </Container>
    </UserDesktopBody>
  );
};
