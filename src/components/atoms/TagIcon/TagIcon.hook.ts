import { useCallback, useMemo, useState } from 'react';

import type {
  UseTagIcon as UseTagIconType,
  UseTagIconArgs,
} from './TagIcon.types';
import { type TagMeta, TAG_NAME } from './TagIcon.types';

export const getTagMeta = (tag: TAG_NAME): TagMeta => {
  switch (tag) {
    case TAG_NAME.AGE_3:
      return {
        title: 'Age 3',
        description: 'This fairy tale is suitable for kids age 3 and above.',
        iconUrl: '/icons/tags/age3.svg',
      };
    case TAG_NAME.AGE_5:
      return {
        title: 'Age 5',
        description: 'This fairy tale is suitable for kids age 5 and above.',
        iconUrl: '',
      };
    case TAG_NAME.CLASSIC_FABLE:
      return {
        title: 'Classic Fable',
        description: 'A timeless, traditional fable with enduring lessons.',
        iconUrl: '',
      };
    case TAG_NAME.CONTEMPORARY_FABLE:
      return {
        title: 'Contemporary Fable',
        description: 'A modern fable reflecting today’s themes and settings.',
        iconUrl: '',
      };
    case TAG_NAME.RESPONSIBILITY:
      return {
        title: 'Responsibility',
        description: 'Highlights taking ownership for actions and duties.',
        iconUrl: '',
      };
    case TAG_NAME.CAREFULNESS:
      return {
        title: 'Carefulness',
        description: 'Encourages being cautious, attentive, and considerate.',
        iconUrl: '',
      };
    case TAG_NAME.HELPFULNESS:
      return {
        title: 'Helpfulness',
        description: 'Promotes kindness and lending a hand to others in need.',
        iconUrl: '/icons/tags/helpfulness.svg',
      };
    case TAG_NAME.DILIGENCE:
      return {
        title: 'Diligence',
        description: 'Celebrates persistence, hard work, and dedication.',
        iconUrl: '',
      };
    case TAG_NAME.PRIVACY:
      return {
        title: 'Privacy',
        description: 'Teaches respect for personal spaces and secrets.',
        iconUrl: '',
      };
    case TAG_NAME.FAMILY:
      return {
        title: 'Family',
        description: 'Focuses on bonds, love, and support within a family.',
        iconUrl: '',
      };
    case TAG_NAME.DEATH:
      return {
        title: 'Death',
        description: 'Introduces the concept of life cycles and loss.',
        iconUrl: '',
      };
    case TAG_NAME.TOXIC_RELATIONS:
      return {
        title: 'Toxic Relations',
        description:
          'Warns against harmful relationships and setting boundaries.',
        iconUrl: '',
      };
    case TAG_NAME.MODERATION:
      return {
        title: 'Moderation',
        description: 'Encourages balance and avoiding excess in all things.',
        iconUrl: '/icons/tags/moderation.svg',
      };
    case TAG_NAME.COOPERATION:
      return {
        title: 'Cooperation',
        description: 'Shows the power of teamwork and working together.',
        iconUrl: '/icons/tags/cooperation.svg',
      };
    case TAG_NAME.REPARATION:
      return {
        title: 'Reparation',
        description: 'Focuses on making amends and restoring what was harmed.',
        iconUrl: '/icons/tags/reparation.svg',
      };
    default:
      return {
        title: 'Tag',
        description: 'A helpful categorization for the fairy tale.',
        iconUrl: '',
      };
  }
};

const useTagIcon: UseTagIconType = ({ icon, isWarning }: UseTagIconArgs) => {
  const meta = useMemo(() => getTagMeta(icon), [icon]);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const showTooltip = useCallback(() => setIsTooltipVisible(true), []);
  const hideTooltip = useCallback(() => setIsTooltipVisible(false), []);
  const toggleTooltip = useCallback(() => setIsTooltipVisible(v => !v), []);

  return {
    meta,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
    isWarning: Boolean(isWarning),
  };
};

export default useTagIcon;
