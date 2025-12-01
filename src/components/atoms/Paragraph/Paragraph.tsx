import { ParagraphBody } from './Paragraph.styled';
import type { Paragraph as ParagraphType } from './Paragraph.types';
import { FOREGROUND_COLOR, TEXT_ALIGNMENT } from './Paragraph.types';

export const Paragraph: ParagraphType = ({
  color = FOREGROUND_COLOR.PURPLE,
  alignment = TEXT_ALIGNMENT.LEFT,
  boldText = false,
  children,
}) => (
  <ParagraphBody foreground={color} textAlign={alignment} boldText={boldText}>
    {children}
  </ParagraphBody>
);
