'use client';

import SlideshowButtons, {
  SLIDESHOW_BUTTON_VARIANT,
} from '@/atoms/SlideshowButtons';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';
import SettingsRadio from '@/molecules/SettingsRadio';
import SettingsRangeField from '@/molecules/SettingsRangeField';
import SettingsSwitch from '@/molecules/SettingsSwitch';
import SingleSlide from '@/molecules/SingleSlide';

import { useSlideshow } from './Slideshow.hook';
import {
  BottomCenterControls,
  EmblaContainer,
  EmblaSlide,
  EmblaViewport,
  SlideshowBody,
  SlideshowSettingsModalBody,
  SlideStub,
  TopLeftControls,
} from './Slideshow.styled';
import type { Slideshow as SlideshowType } from './Slideshow.types';

export const Slideshow: SlideshowType = ({
  fable,
  settings,
  quality,
  onGoBack,
}) => {
  const { settingsPage } = useDictionary();
  const {
    slideshowRef,
    viewportRef,
    controlsVisible,
    canScrollPrev,
    canScrollNext,
    isFullscreen,
    slides,
    textBackground,
    backgroundIntensity,
    fontSize,
    fontFamily,
    animationQualityValue,
    useAnimatedBackground,
    isSettingsModalOpen,
    handleRevealControls,
    handleScrollPrev,
    handleScrollNext,
    handleToggleFullscreen,
    handleOpenSettingsModal,
    handleCloseSettingsModal,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleTextBackgroundChange,
    handleBackgroundIntensityChange,
    handleIllustrationAnimationChange,
    handleAnimationQualityChange,
  } = useSlideshow({
    fable,
    settings,
    quality,
  });

  return (
    <SlideshowBody
      ref={slideshowRef}
      onMouseMove={handleRevealControls}
      onTouchStart={handleRevealControls}
    >
      <EmblaViewport ref={viewportRef}>
        <EmblaContainer>
          {slides.map(slide => (
            <EmblaSlide key={slide.id}>
              {slide.shouldRenderSlide ? (
                <SingleSlide
                  paragraphs={slide.paragraphs}
                  textPosition={slide.textPosition}
                  mediaUrl={slide.mediaUrl}
                  staticImageUrl={slide.staticImageUrl}
                  textBackground={textBackground}
                  backgroundIntensity={backgroundIntensity}
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  useAnimatedBackground={useAnimatedBackground}
                  isActive={slide.isActive}
                />
              ) : (
                <SlideStub />
              )}
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </EmblaViewport>

      <TopLeftControls>
        <SlideshowButtons
          variant={SLIDESHOW_BUTTON_VARIANT.GO_BACK}
          onClick={onGoBack}
          isVisible={controlsVisible}
        />
        <SlideshowButtons
          variant={SLIDESHOW_BUTTON_VARIANT.FULLSCREEN}
          onClick={() => {
            void handleToggleFullscreen();
          }}
          isVisible={controlsVisible}
          isFullscreen={isFullscreen}
        />
        <SlideshowButtons
          variant={SLIDESHOW_BUTTON_VARIANT.OPTIONS}
          onClick={handleOpenSettingsModal}
          isVisible={controlsVisible}
        />
      </TopLeftControls>

      <BottomCenterControls>
        <SlideshowButtons
          variant={SLIDESHOW_BUTTON_VARIANT.PREVIOUS_SLIDE}
          onClick={handleScrollPrev}
          disabled={!canScrollPrev}
          isVisible={controlsVisible}
        />
        <SlideshowButtons
          variant={SLIDESHOW_BUTTON_VARIANT.NEXT_SLIDE}
          onClick={handleScrollNext}
          disabled={!canScrollNext}
          isVisible={controlsVisible}
        />
      </BottomCenterControls>

      <ModalWindow
        isOpen={isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
        closeOnOverlayClick
      >
        <SlideshowSettingsModalBody>
          <SettingsRangeField
            label={settingsPage.display_n_audio.fontSize.label}
            min={12}
            max={24}
            unit="px"
            value={fontSize}
            onChange={handleFontSizeChange}
            info={{
              title: settingsPage.display_n_audio.fontSize.infoTitle,
              description:
                settingsPage.display_n_audio.fontSize.infoDescription,
            }}
          />
          <SettingsRadio
            label={settingsPage.display_n_audio.fontFamily.label}
            options={[
              { label: 'Sans', value: 'sans' },
              { label: 'Serif', value: 'serif' },
              { label: 'Dyslexia', value: 'dyslexia' },
            ]}
            value={fontFamily}
            onChange={handleFontFamilyChange}
            info={{
              title: settingsPage.display_n_audio.fontFamily.infoTitle,
              description:
                settingsPage.display_n_audio.fontFamily.infoDescription,
            }}
          />
          <SettingsRadio
            label={settingsPage.display_n_audio.textBackground.label}
            options={[
              {
                label: settingsPage.display_n_audio.textBackground.options.none,
                value: 'none',
              },
              {
                label:
                  settingsPage.display_n_audio.textBackground.options.light,
                value: 'light',
              },
              {
                label: settingsPage.display_n_audio.textBackground.options.dark,
                value: 'dark',
              },
            ]}
            value={textBackground}
            onChange={handleTextBackgroundChange}
            info={{
              title: settingsPage.display_n_audio.textBackground.infoTitle,
              description:
                settingsPage.display_n_audio.textBackground.infoDescription,
            }}
          />
          <SettingsRangeField
            label={settingsPage.display_n_audio.backgroundIntensity.label}
            min={0}
            max={100}
            unit="%"
            value={backgroundIntensity}
            onChange={handleBackgroundIntensityChange}
            info={{
              title: settingsPage.display_n_audio.backgroundIntensity.infoTitle,
              description:
                settingsPage.display_n_audio.backgroundIntensity
                  .infoDescription,
            }}
          />
          <SettingsSwitch
            label={settingsPage.display_n_audio.illustrationAnimation.label}
            value={useAnimatedBackground}
            onChange={handleIllustrationAnimationChange}
            info={{
              title:
                settingsPage.display_n_audio.illustrationAnimation.infoTitle,
              description:
                settingsPage.display_n_audio.illustrationAnimation
                  .infoDescription,
            }}
          />
          <SettingsRadio
            label={settingsPage.display_n_audio.animationQuality.label}
            options={[
              { label: 'AUTO', value: 'auto' },
              { label: 'SD', value: 'sd' },
              { label: 'HD', value: 'hd' },
            ]}
            value={animationQualityValue}
            onChange={handleAnimationQualityChange}
            info={{
              title: settingsPage.display_n_audio.animationQuality.infoTitle,
              description:
                settingsPage.display_n_audio.animationQuality.infoDescription,
            }}
          />
        </SlideshowSettingsModalBody>
      </ModalWindow>
    </SlideshowBody>
  );
};
