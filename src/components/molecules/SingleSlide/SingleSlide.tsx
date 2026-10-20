import { useEffect, useRef } from 'react';

import { useSingleSlide } from './SingleSlide.hook';
import {
  BackgroundImage,
  BackgroundLayer,
  BackgroundShade,
  BackgroundVideo,
  SingleSlideBody,
  SlideParagraph,
  TextBlock,
  TextLayer,
} from './SingleSlide.styled';
import type { SingleSlide as SingleSlideType } from './SingleSlide.types';

export const SingleSlide: SingleSlideType = props => {
  const {
    paragraphs,
    textPosition,
    mediaUrl,
    staticImageUrl,
    textBackground,
    backgroundIntensity,
    fontSize,
    fontFamily,
    useAnimatedBackground,
    isActive,
  } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive && useAnimatedBackground)
      void video.play().catch(() => undefined);
    else video.pause();
    return () => video.pause();
  }, [isActive, useAnimatedBackground, mediaUrl]);

  const { paragraphEntries, resolvedStaticImageUrl, resolvedTextTone } =
    useSingleSlide({
      paragraphs,
      mediaUrl,
      staticImageUrl,
      textBackground,
    });

  return (
    <SingleSlideBody isActive={isActive}>
      <BackgroundLayer>
        {useAnimatedBackground ? (
          <BackgroundVideo
            ref={videoRef}
            autoPlay={isActive}
            preload={isActive ? 'auto' : 'none'}
            muted
            loop
            playsInline
            poster={resolvedStaticImageUrl}
          >
            <source src={mediaUrl} type="video/webm" />
          </BackgroundVideo>
        ) : (
          <BackgroundImage src={resolvedStaticImageUrl} alt="" />
        )}
        <BackgroundShade backgroundIntensity={backgroundIntensity} />
      </BackgroundLayer>

      <TextLayer textPosition={textPosition}>
        <TextBlock
          textPosition={textPosition}
          textBackground={textBackground}
          backgroundIntensity={backgroundIntensity}
        >
          {paragraphEntries.map(paragraph => (
            <SlideParagraph
              key={paragraph.id}
              fontSize={fontSize}
              fontFamily={fontFamily}
              textTone={resolvedTextTone}
            >
              {paragraph.text}
            </SlideParagraph>
          ))}
        </TextBlock>
      </TextLayer>
    </SingleSlideBody>
  );
};
