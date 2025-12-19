import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { FableTile } from '@/molecules/FableTile/FableTile';

import { useDesktopTilesSlider } from './DesktopTilesSlider.hook';
import {
  ArrowButton,
  Arrows,
  DesktopTilesSliderBody,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  Header,
  Title,
} from './DesktopTilesSlider.styled';
import type { DesktopTilesSlider as DesktopTilesSliderType } from './DesktopTilesSlider.types';

export const DesktopTilesSlider: DesktopTilesSliderType = ({
  title,
  tiles,
}) => {
  const { viewportRef, scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useDesktopTilesSlider();

  return (
    <DesktopTilesSliderBody>
      <Header>
        <Title>{title}</Title>
        <Arrows>
          <ArrowButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Prev"
          >
            <ArrowLeftIcon width={40} height={40} />
          </ArrowButton>
          <ArrowButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next"
          >
            <ArrowRightIcon width={40} height={40} />
          </ArrowButton>
        </Arrows>
      </Header>

      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
          {tiles.map((tile, idx) => (
            <EmblaSlide
              key={`fable-slide-${tile.fableUrl}-${idx}`}
              id={`fable-slide-${tile.fableUrl}-${idx}`}
            >
              <FableTile {...tile} />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>
    </DesktopTilesSliderBody>
  );
};
