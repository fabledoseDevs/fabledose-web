import { TagIcon } from '@/atoms/TagIcon/TagIcon';
import { useDictionary } from '@/lang/DictionaryProvider';
import { ModalWindow } from '@/molecules/ModalWindow/ModalWindow';

import {
  DetailsBody,
  DetailsSection,
  SynopsisHint,
  SynopsisText,
  TagsList,
} from './StoryDetailsModal.styled';
import type { StoryDetailsModal as StoryDetailsModalType } from './StoryDetailsModal.types';

export const StoryDetailsModal: StoryDetailsModalType = ({
  isOpen,
  onClose,
  title,
  tags,
  description,
}) => {
  const { storyDetails: text } = useDictionary();
  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      width={760}
      closeLabel={text.close}
      showCloseButton
      closeOnOverlayClick
    >
      <DetailsBody>
        <DetailsSection aria-label={text.tags}>
          <h3>{text.tags}</h3>
          <TagsList>
            {tags.map(tag => (
              <TagIcon
                key={tag.name}
                icon={tag.name}
                isWarning={tag.warning}
                showDescription
              />
            ))}
          </TagsList>
        </DetailsSection>
        <DetailsSection>
          <h3>{text.comment}</h3>
          {description.comment
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
        </DetailsSection>
        <DetailsSection>
          <h3>{text.synopsis}</h3>
          <SynopsisHint>
            {text.guidance} {text.spoilers}
          </SynopsisHint>
          <SynopsisText>
            {description.synopsis
              .split(/\n\s*\n/)
              .filter(Boolean)
              .map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </SynopsisText>
        </DetailsSection>
      </DetailsBody>
    </ModalWindow>
  );
};
