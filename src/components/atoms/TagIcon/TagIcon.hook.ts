import { useCallback, useMemo, useState } from 'react';

import { useDictionary } from '@/lang/DictionaryProvider';

import type {
  GetTagMeta,
  IconUrlsMap,
  TagIconDictionary,
  UseTagIcon as UseTagIconType,
  UseTagIconArgs,
} from './TagIcon.types';
import { type TagMeta, TAG_NAME } from './TagIcon.types';

const ICON_URLS: IconUrlsMap = {
  [TAG_NAME.AGE_3]: '/icons/tags/age3.svg',
  [TAG_NAME.AGE_5]: '/icons/tags/age5.svg',
  [TAG_NAME.CLASSIC_FABLE]: '/icons/tags/classic.svg',
  [TAG_NAME.CONTEMPORARY_FABLE]: '/icons/tags/contemporary.svg',
  [TAG_NAME.RESPONSIBILITY]: '/icons/tags/responsibility.svg',
  [TAG_NAME.CAREFULNESS]: '/icons/tags/carefulness.svg',
  [TAG_NAME.SUBSIDIARITY]: '/icons/tags/subsidiarity.svg',
  [TAG_NAME.DILIGENCE]: '/icons/tags/diligence.svg',
  [TAG_NAME.PRIVACY]: '/icons/tags/privacy.svg',
  [TAG_NAME.FAMILY]: '/icons/tags/family.svg',
  [TAG_NAME.DEATH]: '/icons/tags/warning.svg',
  [TAG_NAME.TOXIC_RELATIONS]: '/icons/tags/toxic_relations.svg',
  [TAG_NAME.MODERATION]: '/icons/tags/moderation.svg',
  [TAG_NAME.COOPERATION]: '/icons/tags/cooperation.svg',
  [TAG_NAME.REPARATION]: '/icons/tags/reparation.svg',
};

export const getTagMeta: GetTagMeta = (
  tag: TAG_NAME,
  t: TagIconDictionary,
): TagMeta => {
  const keyMap: Record<TAG_NAME, keyof typeof t> = {
    [TAG_NAME.AGE_3]: 'age-3',
    [TAG_NAME.AGE_5]: 'age-5',
    [TAG_NAME.CLASSIC_FABLE]: 'classic-fable',
    [TAG_NAME.CONTEMPORARY_FABLE]: 'contemporary-fable',
    [TAG_NAME.RESPONSIBILITY]: 'responsibility',
    [TAG_NAME.CAREFULNESS]: 'carefulness',
    [TAG_NAME.SUBSIDIARITY]: 'subsidiarity',
    [TAG_NAME.DILIGENCE]: 'diligence',
    [TAG_NAME.PRIVACY]: 'privacy',
    [TAG_NAME.FAMILY]: 'family',
    [TAG_NAME.DEATH]: 'death',
    [TAG_NAME.TOXIC_RELATIONS]: 'toxic-relations',
    [TAG_NAME.MODERATION]: 'moderation',
    [TAG_NAME.COOPERATION]: 'cooperation',
    [TAG_NAME.REPARATION]: 'reparation',
  } as const;

  const dictKey = keyMap[tag];
  const fromDict = t[dictKey];

  if (fromDict) {
    return {
      title: fromDict.title,
      description: fromDict.description,
      iconUrl: ICON_URLS[tag] ?? '',
    };
  }

  return {
    title: 'Missing Tag?',
    description:
      'This tag is missing from the dictionary. Please contact us about this.',
    iconUrl: ICON_URLS[tag] ?? '',
  };
};

const useTagIcon: UseTagIconType = ({ icon, isWarning }: UseTagIconArgs) => {
  const { tagIcon } = useDictionary();
  const meta = useMemo(() => getTagMeta(icon, tagIcon), [icon, tagIcon]);
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
