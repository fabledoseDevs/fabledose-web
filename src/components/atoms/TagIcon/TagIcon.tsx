import useTagIcon from './TagIcon.hook';
import {
  FallbackGlyph,
  IconCircle,
  IconMask,
  TagIconBody,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
} from './TagIcon.styled';
import type { TagIcon as TagIconType } from './TagIcon.types';

export const TagIcon: TagIconType = ({ icon, isWarning }) => {
  const {
    meta,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    isWarning: warning,
  } = useTagIcon({ icon, isWarning });

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
        {meta.iconUrl ? (
          <IconMask src={meta.iconUrl} isWarning={warning} />
        ) : (
          <FallbackGlyph isWarning={warning}>
            {meta.title.slice(0, 2)}
          </FallbackGlyph>
        )}
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
