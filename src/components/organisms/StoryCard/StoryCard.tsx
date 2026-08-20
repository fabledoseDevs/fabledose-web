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
import { ResetButton } from '@/atoms/ResetButton';
import { useDictionary } from '@/lang/DictionaryProvider';

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
  onResetProgress,
}) => {
  const { isVideoReady, isUnlockedAccount, handleVideoCanPlay } = useStoryCard({
    unlockedAccount,
  });
  const { storyCard } = useDictionary();

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
              {isUnlockedAccount ? (
                <>
                  <ButtonsRow $hasResetButton={!!onResetProgress}>
                    {onResetProgress && (
                      <ResetButton
                        onClick={onResetProgress}
                        title="Reset reading progress"
                      />
                    )}
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.RED}
                      text={data.readButtonText || storyCard.readButton}
                      payload={data.readUrl || '#'}
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text={storyCard.audiobookButton}
                      payload={data.audiobookUrl || '#'}
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </ButtonsRow>
                  <Paragraph
                    color={PAR_COLOR.WHITE}
                    alignment={TEXT_ALIGNMENT.LEFT}
                  >
                    {storyCard.downloadCta}
                  </Paragraph>
                  <SingleButtonRow>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text={storyCard.pdfButton}
                      payload={data.pdfUrl || '#'}
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text={storyCard.epubButton}
                      payload={data.epubUrl || '#'}
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
                      text={data.readButtonText || storyCard.readButton}
                      payload={data.readUrl || '#'}
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </SingleButtonRow>
                  <Paragraph
                    color={PAR_COLOR.WHITE}
                    alignment={TEXT_ALIGNMENT.LEFT}
                  >
                    {storyCard.unlockCta}
                  </Paragraph>
                  <SingleButtonRow>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text={storyCard.unlockButton}
                      payload={'/plan'}
                      width={{ widthType: WIDTH_TYPE.AUTO }}
                    />
                  </SingleButtonRow>
                </>
              )}
            </ButtonsBlock>
          </TopSection>

          <BottomSection>
            <Paragraph color={PAR_COLOR.WHITE} alignment={TEXT_ALIGNMENT.LEFT}>
              {storyCard.infoDisclaimer}
            </Paragraph>
            <TagsRow>
              {data.tags.map(tag => (
                <TagIcon
                  key={tag.name}
                  icon={tag.name}
                  isWarning={tag.warning}
                />
              ))}
              <Button
                actionType={ACTION_TYPE.NAVIGATION}
                variant={BUTTON_VARIANT.TRANSPARENT}
                text={storyCard.moreInfoButton}
                payload={data.moreInfoUrl || '#'}
                width={{ widthType: WIDTH_TYPE.AUTO }}
              />
            </TagsRow>
          </BottomSection>
        </LeftColumn>
      </ContentLayer>
    </StoryCardBody>
  );
};
