import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

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
import { ResetButton } from '@/atoms/ResetButton';
import { TagIcon } from '@/atoms/TagIcon/TagIcon';
import { Toast } from '@/atoms/Toast';
import { downloadEbook } from '@/config/ebookDownload';
import { canAccessStory, getPlanEntitlements } from '@/config/plans';
import { usePlanAccess } from '@/contexts/PlanAccessContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import { StoryDetailsModal } from '@/molecules/StoryDetailsModal/StoryDetailsModal';

import useStoryCard from './StoryCard.hook';
import {
  BackgroundVideo,
  BottomSection,
  ButtonsBlock,
  ButtonsRow,
  ContentLayer,
  EbookUpgradeNotice,
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
  data,
  onResetProgress,
}) => {
  const { isVideoReady, handleVideoCanPlay } = useStoryCard();
  const { lang } = useParams<{ lang: string }>();
  const { settings } = useSettings();
  const { requestUpgrade, showEbookUnavailable } = usePlanAccess();
  const entitlements = getPlanEntitlements(settings?.plan);
  const storyAllowed = canAccessStory(settings?.plan, data.availability);
  const storyAction = (url?: string) =>
    storyAllowed
      ? { actionType: ACTION_TYPE.NAVIGATION, payload: url || '#' }
      : {
          actionType: ACTION_TYPE.FUNCTION_TRIGGER,
          payload: () => requestUpgrade('story'),
        };
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState(false);
  const handleDownload = async (url: string) => {
    if (downloading) return;
    setDownloading(url);
    setDownloadError(false);
    try {
      await downloadEbook(url);
    } catch (error) {
      if (error instanceof Error && error.message === 'ebook/forbidden')
        requestUpgrade('ebooks');
      else setDownloadError(true);
    } finally {
      setDownloading(null);
    }
  };
  const ebookAction = (url?: string) =>
    !entitlements.ebooks
      ? {
          actionType: ACTION_TYPE.FUNCTION_TRIGGER,
          payload: () => requestUpgrade('ebooks'),
        }
      : !url
      ? {
          actionType: ACTION_TYPE.FUNCTION_TRIGGER,
          payload: showEbookUnavailable,
        }
      : {
          actionType: ACTION_TYPE.FUNCTION_TRIGGER,
          payload: () => void handleDownload(url),
        };
  const { storyCard, librarySync } = useDictionary();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const closeDetails = useCallback(() => setDetailsOpen(false), []);

  return (
    <>
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
              <Paragraph
                color={PAR_COLOR.WHITE}
                alignment={TEXT_ALIGNMENT.LEFT}
              >
                {data.description}
              </Paragraph>

              <ButtonsBlock>
                <ButtonsRow>
                  {onResetProgress && storyAllowed && (
                    <ResetButton
                      onClick={onResetProgress}
                      title={librarySync.resetProgress}
                      label={librarySync.resetProgress}
                    />
                  )}
                  <Button
                    {...storyAction(data.readUrl)}
                    variant={BUTTON_VARIANT.RED}
                    text={data.readButtonText || storyCard.readButton}
                    width={{ widthType: WIDTH_TYPE.PX, widthValue: 200 }}
                  />
                  {data.audiobookUrl && (
                    <Button
                      {...storyAction(data.audiobookUrl)}
                      variant={BUTTON_VARIANT.TRANSPARENT}
                      text={storyCard.audiobookButton}
                      width={{ widthType: WIDTH_TYPE.PX, widthValue: 200 }}
                    />
                  )}
                </ButtonsRow>
                {!entitlements.ebooks ? (
                  <EbookUpgradeNotice>
                    <Paragraph color={PAR_COLOR.PURPLE}>
                      {storyCard.freeEbooksNotice.intro}
                    </Paragraph>
                    <Paragraph color={PAR_COLOR.PURPLE}>
                      {storyCard.freeEbooksNotice.beforeFamily}
                      <strong>Family</strong>
                      {storyCard.freeEbooksNotice.betweenPlans}
                      <strong>Ultimate</strong>
                      {storyCard.freeEbooksNotice.afterUltimate}
                    </Paragraph>
                    <Button
                      actionType={ACTION_TYPE.NAVIGATION}
                      payload={`/${lang === 'pl' ? 'pl' : 'en'}/plan`}
                      variant={BUTTON_VARIANT.RED}
                      text={storyCard.freeEbooksNotice.allPlans}
                      width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
                    />
                  </EbookUpgradeNotice>
                ) : data.audiobookUrl || data.pdfUrl || data.epubUrl ? (
                  <>
                    <Paragraph
                      color={PAR_COLOR.WHITE}
                      alignment={TEXT_ALIGNMENT.LEFT}
                    >
                      {storyCard.downloadCta}
                    </Paragraph>
                    <SingleButtonRow>
                      <Button
                        {...ebookAction(data.pdfUrl)}
                        variant={BUTTON_VARIANT.TRANSPARENT}
                        text={
                          downloading === data.pdfUrl
                            ? storyCard.downloading
                            : storyCard.pdfButton
                        }
                        isDisabled={Boolean(downloading)}
                        width={{ widthType: WIDTH_TYPE.PX, widthValue: 200 }}
                      />
                      <Button
                        {...ebookAction(data.epubUrl)}
                        variant={BUTTON_VARIANT.TRANSPARENT}
                        text={
                          downloading === data.epubUrl
                            ? storyCard.downloading
                            : storyCard.epubButton
                        }
                        isDisabled={Boolean(downloading)}
                        width={{ widthType: WIDTH_TYPE.PX, widthValue: 200 }}
                      />
                    </SingleButtonRow>
                  </>
                ) : null}
              </ButtonsBlock>
            </TopSection>

            <BottomSection>
              <Paragraph
                color={PAR_COLOR.WHITE}
                alignment={TEXT_ALIGNMENT.LEFT}
              >
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
                  actionType={ACTION_TYPE.FUNCTION_TRIGGER}
                  variant={BUTTON_VARIANT.TRANSPARENT}
                  text={storyCard.moreInfoButton}
                  payload={() => setDetailsOpen(true)}
                  isDisabled={!data.fullDescription}
                  width={{ widthType: WIDTH_TYPE.PX, widthValue: 200 }}
                />
              </TagsRow>
            </BottomSection>
          </LeftColumn>
        </ContentLayer>
      </StoryCardBody>
      {downloadError && (
        <Toast
          message={storyCard.downloadFailed}
          onClose={() => setDownloadError(false)}
        />
      )}
      {data.fullDescription && (
        <StoryDetailsModal
          isOpen={detailsOpen}
          onClose={closeDetails}
          title={data.headline}
          tags={data.tags}
          description={data.fullDescription}
        />
      )}
    </>
  );
};
