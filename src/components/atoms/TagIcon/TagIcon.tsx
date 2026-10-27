import useTagIcon from './TagIcon.hook';
import {
  ExpandedTagBody,
  ExpandedTagDescription,
  ExpandedTagText,
  ExpandedTagTitle,
  FallbackGlyph,
  IconCircle,
  IconMask,
  TagIconBody,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
} from './TagIcon.styled';
import type { TagIcon as TagIconType } from './TagIcon.types';

export const TagIcon: TagIconType = ({
  icon,
  isWarning,
  showDescription = false,
}) => {
  const {
    meta,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    isWarning: warning,
  } = useTagIcon({ icon, isWarning });

  const glyph = meta.iconUrl ? (
    <IconMask src={meta.iconUrl} isWarning={warning} />
  ) : (
    <FallbackGlyph isWarning={warning}>{meta.title.slice(0, 2)}</FallbackGlyph>
  );

  if (showDescription)
    return (
      <ExpandedTagBody $isWarning={warning}>
        <IconCircle isWarning={warning} aria-hidden="true">
          {glyph}
        </IconCircle>
        <ExpandedTagText>
          <ExpandedTagTitle>{meta.title}</ExpandedTagTitle>
          <ExpandedTagDescription>{meta.description}</ExpandedTagDescription>
        </ExpandedTagText>
      </ExpandedTagBody>
    );

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTooltip();
    }
  };

  return (
    <TagIconBody>
      <IconCircle
        isWarning={warning}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={toggleTooltip}
        onKeyDown={handleKey}
        role="img"
        aria-label={meta.title}
        tabIndex={0}
      >
        {glyph}
      </IconCircle>
      {isTooltipVisible && (
        <Tooltip role="tooltip">
          <TooltipTitle>{meta.title}</TooltipTitle>
          <TooltipDesc>{meta.description}</TooltipDesc>
        </Tooltip>
      )}
    </TagIconBody>
  );
};
