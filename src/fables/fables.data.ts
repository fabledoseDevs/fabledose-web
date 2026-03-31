import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';

import { TAG_NAME } from '@/components/atoms/TagIcon/TagIcon.types';

import type {
  FableContentPointers,
  FableCredits,
  FableData,
  FableDatabaseIndex,
  FableFullDescription,
  FableIndexItem,
  FableLocale,
  FableMeta,
  FableTextContent,
  FableTextSlide,
} from './fables.types';

const FABLE_DB_DIR = path.join(process.cwd(), 'public', 'fable-database');
const FABLE_INDEX_PATH = path.join(FABLE_DB_DIR, 'index.json');
const SUPPORTED_LOCALES: FableLocale[] = ['pl', 'en'];
const TAG_VALUES = new Set(Object.values(TAG_NAME));

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isString = (value: unknown): value is string => typeof value === 'string';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmptyString);

const toSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .pop() || '';

const normalizeLocale = (value: string): FableLocale =>
  SUPPORTED_LOCALES.includes(value as FableLocale)
    ? (value as FableLocale)
    : 'en';

const readJsonFile = async (filePath: string): Promise<unknown> => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
};

const normalizeLocalizedStrings = (
  value: unknown,
  { slugify = false }: { slugify?: boolean } = {},
): Partial<Record<FableLocale, string>> => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  const candidate = value as Record<string, unknown>;
  const localized: Partial<Record<FableLocale, string>> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const localeValue = candidate[locale];
    if (!isNonEmptyString(localeValue)) {
      continue;
    }

    localized[locale] = slugify ? toSlug(localeValue) : localeValue.trim();
  }

  return localized;
};

const normalizeLocalizedDescriptions = (
  value: unknown,
): Partial<Record<FableLocale, FableFullDescription>> => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  const candidate = value as Record<string, unknown>;
  const localized: Partial<Record<FableLocale, FableFullDescription>> = {};

  for (const locale of SUPPORTED_LOCALES) {
    const localeValue = candidate[locale];
    if (!localeValue || typeof localeValue !== 'object') {
      continue;
    }

    const description = localeValue as Record<string, unknown>;
    const synopsis = isNonEmptyString(description.synopsis)
      ? description.synopsis.trim()
      : null;
    const comment = isNonEmptyString(description.comment)
      ? description.comment.trim()
      : null;

    if (!synopsis || !comment) {
      continue;
    }

    localized[locale] = { synopsis, comment };
  }

  return localized;
};

const normalizeCreditsRole = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .map(item => (isNonEmptyString(item) ? item.trim() : null))
        .filter((item): item is string => item !== null)
    : [];

const normalizeCredits = (value: unknown): FableCredits => {
  if (!value || typeof value !== 'object') {
    return {
      authors: [],
      illustrators: [],
      animators: [],
      lectors: [],
      translators: [],
    };
  }

  const candidate = value as Record<string, unknown>;

  return {
    authors: normalizeCreditsRole(candidate.authors),
    illustrators: normalizeCreditsRole(candidate.illustrators),
    animators: normalizeCreditsRole(candidate.animators),
    lectors: normalizeCreditsRole(candidate.lectors),
    translators: normalizeCreditsRole(candidate.translators),
  };
};

const normalizeTags = (value: unknown): TAG_NAME[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((tag): tag is TAG_NAME =>
    TAG_VALUES.has(tag as TAG_NAME),
  );
};

const normalizePointers = (value: unknown): FableContentPointers | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const text = normalizeLocalizedStrings(candidate.text);
  const audio = normalizeLocalizedStrings(candidate.audio);

  if (!Object.keys(text).length) {
    return null;
  }

  return {
    text,
    ...(Object.keys(audio).length ? { audio } : {}),
  };
};

const normalizeMeta = (value: unknown): FableMeta | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const id = isNonEmptyString(candidate.id) ? candidate.id.trim() : null;
  const slug = normalizeLocalizedStrings(candidate.slug, { slugify: true });
  const title = normalizeLocalizedStrings(candidate.title);
  const shortDescription = normalizeLocalizedStrings(
    candidate.shortDescription,
  );
  const fullDescription = normalizeLocalizedDescriptions(
    candidate.fullDescription,
  );
  const credits = normalizeCredits(candidate.credits);
  const tags = normalizeTags(candidate.tags);
  const contentPointers = normalizePointers(candidate.contentPointers);
  const coversValue =
    candidate.covers && typeof candidate.covers === 'object'
      ? (candidate.covers as Record<string, unknown>)
      : {};

  if (
    !id ||
    !Object.keys(slug).length ||
    !Object.keys(title).length ||
    !contentPointers
  ) {
    return null;
  }

  return {
    id,
    slug,
    title,
    shortDescription,
    fullDescription,
    credits,
    tags,
    covers: {
      tileCover: isString(coversValue.tileCover) ? coversValue.tileCover : '',
      mainCover: isString(coversValue.mainCover) ? coversValue.mainCover : '',
      fullCover: isString(coversValue.fullCover) ? coversValue.fullCover : '',
      audioCover: isString(coversValue.audioCover)
        ? coversValue.audioCover
        : '',
    },
    contentPointers,
  };
};

const normalizeIndexItem = (value: unknown): FableIndexItem | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const meta = normalizeMeta(candidate.meta);

  if (!meta) {
    return null;
  }

  return { meta };
};

const readFableIndex = async (): Promise<FableDatabaseIndex> => {
  const rawIndex = await readJsonFile(FABLE_INDEX_PATH);

  if (!rawIndex || typeof rawIndex !== 'object') {
    return { tales: [] };
  }

  const candidate = rawIndex as Record<string, unknown>;
  const talesInput = Array.isArray(candidate.tales) ? candidate.tales : [];
  const tales = talesInput
    .map(normalizeIndexItem)
    .filter((item): item is FableIndexItem => item !== null);

  return { tales };
};

const resolvePointerPath = (relativePath: string): string =>
  path.join(FABLE_DB_DIR, relativePath);

const resolveLocalePointer = (
  pointers: Partial<Record<FableLocale, string>>,
  locale: FableLocale,
): { locale: FableLocale; path: string } | null => {
  const primary = pointers[locale];
  if (primary) {
    return { locale, path: resolvePointerPath(primary) };
  }

  const fallbackLocale = SUPPORTED_LOCALES.find(
    candidate => pointers[candidate],
  );
  if (!fallbackLocale) {
    return null;
  }

  return {
    locale: fallbackLocale,
    path: resolvePointerPath(pointers[fallbackLocale] as string),
  };
};

const normalizeBackgroundImage = (value: unknown): Record<string, string> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const candidate = value as Record<string, unknown>;
  const normalized: Record<string, string> = {};

  for (const [key, itemValue] of Object.entries(candidate)) {
    if (isNonEmptyString(itemValue)) {
      normalized[key] = itemValue.trim();
    }
  }

  return normalized;
};

const normalizeSlide = (value: unknown): FableTextSlide | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const paragraphs = isStringArray(candidate.paragraphs)
    ? candidate.paragraphs
    : [];
  const backgroundImage = normalizeBackgroundImage(candidate.backgroundImage);
  const audioFile = isNonEmptyString(candidate.audioFile)
    ? candidate.audioFile.trim()
    : undefined;
  const layout = isNonEmptyString(candidate.layout)
    ? candidate.layout.trim()
    : undefined;

  return {
    paragraphs,
    backgroundImage,
    ...(audioFile ? { audioFile } : {}),
    ...(layout ? { layout } : {}),
  };
};

const normalizeTextContent = (value: unknown): FableTextContent => {
  if (!value || typeof value !== 'object') {
    return { slides: [] };
  }

  const candidate = value as Record<string, unknown>;
  const textValue =
    candidate.text && typeof candidate.text === 'object'
      ? (candidate.text as Record<string, unknown>)
      : {};
  const slidesInput = Array.isArray(textValue.slides) ? textValue.slides : [];
  const slides = slidesInput
    .map(normalizeSlide)
    .filter((slide): slide is FableTextSlide => slide !== null);

  return { slides };
};

const findFableByLocalizedSlug = (
  tales: FableIndexItem[],
  slug: string,
  locale: FableLocale,
): FableIndexItem | null => {
  const localizedMatch =
    tales.find(item => toSlug(item.meta.slug[locale] || '') === slug) || null;

  if (localizedMatch) {
    return localizedMatch;
  }

  return (
    tales.find(item =>
      SUPPORTED_LOCALES.some(
        candidate => toSlug(item.meta.slug[candidate] || '') === slug,
      ),
    ) || null
  );
};

const getPreferredAudioFile = (
  audioPointers: Partial<Record<FableLocale, string>>,
  locale: FableLocale,
): string | undefined =>
  audioPointers[locale] ||
  SUPPORTED_LOCALES.map(candidate => audioPointers[candidate]).find(
    isNonEmptyString,
  );

export const getFablesIndex = async (): Promise<FableMeta[]> => {
  const index = await readFableIndex();
  return index.tales.map(item => item.meta);
};

export const getFableBySlug = async (
  slug: string,
  lang: string,
): Promise<FableData | null> => {
  const normalizedSlug = toSlug(decodeURIComponent(slug));
  if (!normalizedSlug) {
    return null;
  }

  const locale = normalizeLocale(lang);
  const index = await readFableIndex();
  const item = findFableByLocalizedSlug(index.tales, normalizedSlug, locale);

  if (!item) {
    return null;
  }

  const textPointer = resolveLocalePointer(
    item.meta.contentPointers.text,
    locale,
  );
  if (!textPointer) {
    return null;
  }

  const rawText = await readJsonFile(textPointer.path);
  const text = normalizeTextContent(rawText);
  const audioPointers = item.meta.contentPointers.audio || {};
  const selectedAudio = getPreferredAudioFile(
    audioPointers,
    textPointer.locale,
  );

  return {
    meta: item.meta,
    content: {
      locale: textPointer.locale,
      text,
      audio: {
        files: audioPointers,
        ...(selectedAudio ? { selected: selectedAudio } : {}),
      },
    },
  };
};
