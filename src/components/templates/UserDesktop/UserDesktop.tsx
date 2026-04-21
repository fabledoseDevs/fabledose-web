'use client';

import { useParams } from 'next/navigation';

import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  FLEX_DIRECTION,
} from '@/atoms/Container/Container.types';
import Audiobook, { audiobookMock } from '@/organisms/Audiobook';
import DesktopTilesSlider from '@/organisms/DesktopTilesSlider';
import desktopTilesSliderMock from '@/organisms/DesktopTilesSlider/DesktopTilesSlider.mock';
import { FooterSimple } from '@/organisms/FooterSimple';
import StoryCard from '@/organisms/StoryCard';
import { STORY_CARD_VARIANT } from '@/organisms/StoryCard/StoryCard.types';

import useUserDesktop from './UserDesktop.hook';
import {
  Dot,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  Pagination,
  UserDesktopBody,
} from './UserDesktop.styled';
import type { UserDesktop as UserDesktopType } from './UserDesktop.types';

export const UserDesktop: UserDesktopType = () => {
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';
  const { viewportRef, selectedIndex, slideCount, scrollTo, storyCards } =
    useUserDesktop(currentLang);

  return (
    <>
      <UserDesktopBody>
        <Container
          containerType={CONTAINER_ELEMENT.SECTION}
          backgroundColor={BACKGROUND_COLOR.PURPLE}
          alignItems={FLEX_ALIGNMENT.CENTER}
          justifyContent={FLEX_ALIGNMENT.CENTER}
          flexDirection={FLEX_DIRECTION.ROW}
          gap
        >
          <EmblaViewport ref={viewportRef}>
            <EmblaContainer>
              {storyCards.map(card => (
                <EmblaSlide key={card.readUrl || card.headline}>
                  <StoryCard
                    variant={STORY_CARD_VARIANT.COMPACT}
                    unlockedAccount={false}
                    data={card}
                  />
                </EmblaSlide>
              ))}
            </EmblaContainer>

            <Pagination aria-label="Slider pagination">
              {Array.from({ length: slideCount }).map((_, idx) => (
                <Dot
                  key={`user-desktop-dot-${idx}`}
                  active={selectedIndex === idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={selectedIndex === idx}
                  onClick={() => scrollTo(idx)}
                />
              ))}
            </Pagination>
          </EmblaViewport>
        </Container>
        <Container
          containerType={CONTAINER_ELEMENT.SECTION}
          backgroundColor={BACKGROUND_COLOR.PURPLE}
          alignItems={FLEX_ALIGNMENT.CENTER}
          justifyContent={FLEX_ALIGNMENT.CENTER}
          flexDirection={FLEX_DIRECTION.COLUMN}
        >
          <DesktopTilesSlider
            title={desktopTilesSliderMock.title}
            tiles={desktopTilesSliderMock.tiles}
          />
          <DesktopTilesSlider
            title={'Edukacyjne'}
            tiles={desktopTilesSliderMock.tiles}
          />
        </Container>

        <Container
          containerType={CONTAINER_ELEMENT.SECTION}
          backgroundColor={BACKGROUND_COLOR.PURPLE}
          alignItems={FLEX_ALIGNMENT.CENTER}
          justifyContent={FLEX_ALIGNMENT.CENTER}
          flexDirection={FLEX_DIRECTION.COLUMN}
        >
          <Audiobook source={audiobookMock} onClose={() => undefined} />
        </Container>
      </UserDesktopBody>
      <FooterSimple />
    </>
  );
};
