import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import FableTile from '@/molecules/FableTile';

import {
  CtaContainer,
  RegisterBannerBody,
  Slider,
  TilesGroup,
  Title,
  WhiteBackground,
} from './RegisterBanner.styled';
import type { RegisterBanner as RegisterBannerType } from './RegisterBanner.types';

export const RegisterBanner: RegisterBannerType = ({ title, covers }) => (
  <RegisterBannerBody>
    <CtaContainer>
      <Title dangerouslySetInnerHTML={{ __html: title as string }} />
      <Button
        actionType={ACTION_TYPE.NAVIGATION}
        variant={BUTTON_VARIANT.RED}
        width={{
          widthType: WIDTH_TYPE.AUTO,
        }}
        text={'Zarejestruj się'}
        payload={'/register'}
      />
    </CtaContainer>
    <Slider>
      <WhiteBackground />
      <TilesGroup>
        {covers.map(cover => (
          <FableTile key={cover.fableUrl} {...cover} />
        ))}
      </TilesGroup>
      <TilesGroup>
        {covers.map(cover => (
          <FableTile key={`${cover.fableUrl}-bis`} {...cover} />
        ))}
      </TilesGroup>
    </Slider>
  </RegisterBannerBody>
);
