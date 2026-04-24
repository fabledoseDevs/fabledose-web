import type { UseSingleSlide as UseSingleSlideType } from './SingleSlide.types';

const toParagraphEntries = (
  paragraphs: string[],
): { id: string; text: string }[] =>
  paragraphs.map((paragraph, index) => ({
    id: `slide-paragraph-${index}`,
    text: paragraph,
  }));

export const useSingleSlide: UseSingleSlideType = ({
  paragraphs,
  mediaUrl,
  staticImageUrl,
  textBackground,
}) => ({
  paragraphEntries: toParagraphEntries(paragraphs),
  resolvedStaticImageUrl: staticImageUrl || mediaUrl,
  resolvedTextTone: textBackground === 'light' ? 'dark' : 'light',
});
