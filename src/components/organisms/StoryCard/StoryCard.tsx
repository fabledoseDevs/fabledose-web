import { Button } from '@/atoms/Button/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { Headline } from '@/atoms/Headline/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import { Paragraph } from '@/atoms/Paragraph/Paragraph';
import {
  FOREGROUND_COLOR as PAR_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import { TagIcon } from '@/atoms/TagIcon/TagIcon';
import useStoryCard from './StoryCard.hook';
import {
  BackgroundVideo,
  BottomSection,
  ButtonsBlock,
  ButtonsRow,
  ContentLayer,
  GradientShade,
  LeftColumn,
  MediaLayer,
  SingleButtonRow,
  StoryCardBody,
  TagsRow,
  TopSection,
} from './StoryCard.styled';
import type { StoryCard as StoryCardType } from './StoryCard.types';

export const StoryCard: StoryCardType = ({
  variant,
  unlockedAccount,
  data,
}) => {
  const { isVideoReady, handleVideoCanPlay } = useStoryCard();

  return (
    <StoryCardBody variant={variant} data-video-ready={isVideoReady}>
      <MediaLayer>
        <BackgroundVideo
          poster={data.backgroundPosterUrl}
          autoPlay
          playsInline
          muted
          loop
          onCanPlay={handleVideoCanPlay}
        >
          <source src={data.backgroundVideoUrl} type="video/webm" />
        </BackgroundVideo>
      </MediaLayer>
      <GradientShade />

      <ContentLayer>
        <LeftColumn>
          <TopSection>
            <Headline
              weight={data.headlineType || HEADLINE_TYPE.JUMBO}
              color={data.headlineColor || HEADLINE_COLOR.WHITE}
            >
              {data.headline}
            </Headline>
            <Paragraph color={PAR_COLOR.WHITE} alignment={TEXT_ALIGNMENT.LEFT}>
              {data.description}
            </Paragraph>

            <ButtonsBlock>
              {unlockedAccount ? (
                <>
                  <ButtonsRow>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.RED}
                      text="Czytaj"
                      payload="#"
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text="Audiobook"
                      payload="#"
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </ButtonsRow>
                  <Paragraph
                    color={PAR_COLOR.WHITE}
                    alignment={TEXT_ALIGNMENT.LEFT}
                  >
                    Pobierz ebook
                  </Paragraph>
                  <SingleButtonRow>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text="Ilustrowany PDF"
                      payload="#"
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text="ePUB"
                      payload="#"
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </SingleButtonRow>
                </>
              ) : (
                <>
                  <SingleButtonRow>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.RED}
                      text="Czytaj"
                      payload="#"
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </SingleButtonRow>
                  <Paragraph
                    color={PAR_COLOR.WHITE}
                    alignment={TEXT_ALIGNMENT.LEFT}
                  >
                    Ulepsz konto i uzyskaj dostęp do bajek w formie audiobooków
                    oraz ebooków.
                  </Paragraph>
                  <SingleButtonRow>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text="Zmień typ konta"
                      payload="#"
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </SingleButtonRow>
                </>
              )}
            </ButtonsBlock>
          </TopSection>

          <BottomSection>
            <Paragraph color={PAR_COLOR.WHITE} alignment={TEXT_ALIGNMENT.LEFT}>
              Lorem ipsum dolor sit amet consectetur. Ac senectus duis et
              gravida vestibulum morbi. Proin ultrices egestas amet non cursus
              consequat.
            </Paragraph>
            <TagsRow>
              {data.tags.map(tag => (
                <TagIcon key={tag} icon={tag} />
              ))}
              <Button
                actionType={ACTION_TYPE.NAVIGATION}
                variant={BUTTON_VARIANT.TRANSPARENT}
                text="Więcej informacji"
                payload="#"
                width={{ widthType: WIDTH_TYPE.AUTO }}
              />
            </TagsRow>
          </BottomSection>
        </LeftColumn>
      </ContentLayer>
    </StoryCardBody>
  );
};
