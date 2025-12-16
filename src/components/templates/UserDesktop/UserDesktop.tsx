'use client';

import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  FLEX_DIRECTION,
} from '@/atoms/Container/Container.types';
import StoryCard from '@/organisms/StoryCard';
import StoryMock from '@/organisms/StoryCard/StoryCard.mock';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';

import { UserDesktopBody } from './UserDesktop.styled';
import type { UserDesktop as UserDesktopType } from './UserDesktop.types';

export const UserDesktop: UserDesktopType = () => (
  <UserDesktopBody>
    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
      alignItems={FLEX_ALIGNMENT.CENTER}
      justifyContent={FLEX_ALIGNMENT.CENTER}
      flexDirection={FLEX_DIRECTION.ROW}
      gap
    >
      <StoryCard
        variant={STORY_CARD_VARIANT.COMPACT}
        unlockedAccount={false}
        data={StoryMock}
      />
    </Container>
  </UserDesktopBody>
);
