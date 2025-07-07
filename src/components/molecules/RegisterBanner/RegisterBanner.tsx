import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
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
        text={'Zarejestruj się'}
      />
    </CtaContainer>
    <Slider>
      <WhiteBackground />
      <TilesGroup>
        {covers.map(cover => (
          <FableTile key={cover.fableId} {...cover} />
        ))}
      </TilesGroup>
      <TilesGroup>
        {covers.map(cover => (
          <FableTile key={`${cover.fableId}-bis`} {...cover} />
        ))}
      </TilesGroup>
    </Slider>
  </RegisterBannerBody>
);
