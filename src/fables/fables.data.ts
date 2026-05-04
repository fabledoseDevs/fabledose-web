import 'server-only';

import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';

import { TAG_NAME } from '@/components/atoms/TagIcon/TagIcon.types';

import type {
  FableContentPointers,
  FableCovers,
  FableCredits,
  FableData,
  FableDatabaseIndex,
  FableFullDescription,
  FableIndexItem,
  FableLocale,
  FableMeta,
  FableResolvedSlide,
  FableStoryContent,
  FableStorySlide,
  FableTextSlide,
} from './fables.types';

const FABLE_DB_DIR = path.join(process.cwd(), 'public', 'fable-database');
const FABLE_INDEX_PATH = path.join(FABLE_DB_DIR, 'index.json');
const SUPPORTED_LOCALES: FableLocale[] = ['pl', 'en'];
const TAG_VALUES = new Set(Object.values(TAG_NAME));
const DEFAULT_LAYOUT = 'default';

const isString = (value: unknown): value is string => typeof value === 'string';

const isNonEmptyString = (value: unknown): value is string =>
  isString(value) && value.trim().length > 0;

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

const joinUrlPath = (...parts: string[]): string =>
  parts.filter(Boolean).join('/').replace(/\/+/g, '/').replace(/^\/+/, '');

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
  const story = isNonEmptyString(candidate.story)
    ? candidate.story.trim()
    : undefined;
  const text = normalizeLocalizedStrings(candidate.text);
  const audio = normalizeLocalizedStrings(candidate.audio);

  if (!Object.keys(text).length) {
    return null;
  }

  return {
    ...(story ? { story } : {}),
    text,
    ...(Object.keys(audio).length ? { audio } : {}),
  };
};

const normalizeCovers = (value: unknown): FableCovers => {
  if (!value || typeof value !== 'object') {
    return {};
  }

  const candidate = value as Record<string, unknown>;

  return {
    ...(isNonEmptyString(candidate.tileCover)
      ? { tileCover: candidate.tileCover.trim() }
      : {}),
    ...(isNonEmptyString(candidate.mainCover)
      ? { mainCover: candidate.mainCover.trim() }
      : {}),
    ...(isNonEmptyString(candidate.fullCover)
      ? { fullCover: candidate.fullCover.trim() }
      : {}),
    ...(isNonEmptyString(candidate.audioCover)
      ? { audioCover: candidate.audioCover.trim() }
      : {}),
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
  const covers = normalizeCovers(candidate.covers);

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
    covers,
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

interface ResolvedPointer {
  locale: FableLocale;
  relativePath: string;
  path: string;
}

const resolveLocalePointer = (
  pointers: Partial<Record<FableLocale, string>>,
  locale: FableLocale,
): ResolvedPointer | null => {
  const primary = pointers[locale];
  if (primary) {
    return { locale, relativePath: primary, path: resolvePointerPath(primary) };
  }

  const fallbackLocale = SUPPORTED_LOCALES.find(
    candidate => pointers[candidate],
  );
  if (!fallbackLocale) {
    return null;
  }

  const relativePath = pointers[fallbackLocale] as string;

  return {
    locale: fallbackLocale,
    relativePath,
    path: resolvePointerPath(relativePath),
  };
};

const resolveStoryPointer = (
  pointers: FableContentPointers,
  locale: FableLocale,
): { relativePath: string; path: string } | null => {
  if (isNonEmptyString(pointers.story)) {
    return {
      relativePath: pointers.story,
      path: resolvePointerPath(pointers.story),
    };
  }

  const resolvedTextPointer = resolveLocalePointer(pointers.text, locale);
  if (!resolvedTextPointer) {
    return null;
  }

  const derivedRelativePath = resolvedTextPointer.relativePath.replace(
    /\/txt\/[^/]+\.json$/,
    '/story.json',
  );

  return {
    relativePath: derivedRelativePath,
    path: resolvePointerPath(derivedRelativePath),
  };
};

const normalizeTextSlide = (value: unknown): FableTextSlide | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const paragraphs = Array.isArray(candidate.paragraphs)
    ? candidate.paragraphs
        .map(item => (isString(item) ? item : null))
        .filter((item): item is string => item !== null)
    : [];

  return { paragraphs };
};

const normalizeStorySlide = (value: unknown): FableStorySlide | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const scene = isNonEmptyString(candidate.scene)
    ? candidate.scene.trim()
    : undefined;
  const layout = isNonEmptyString(candidate.layout)
    ? candidate.layout.trim()
    : undefined;
  const audioFile = isNonEmptyString(candidate.audioFile)
    ? candidate.audioFile.trim()
    : undefined;

  return {
    ...(scene ? { scene } : {}),
    ...(layout ? { layout } : {}),
    ...(audioFile ? { audioFile } : {}),
  };
};

const normalizeTextContent = (value: unknown): FableTextSlide[] => {
  if (!value || typeof value !== 'object') {
    return [];
  }

  const candidate = value as Record<string, unknown>;
  const textValue =
    candidate.text && typeof candidate.text === 'object'
      ? (candidate.text as Record<string, unknown>)
      : {};
  const slidesInput = Array.isArray(textValue.slides) ? textValue.slides : [];

  return slidesInput
    .map(normalizeTextSlide)
    .filter((slide): slide is FableTextSlide => slide !== null);
};

const normalizeStoryContent = (value: unknown): FableStoryContent => {
  if (!value || typeof value !== 'object') {
    return { slides: [] };
  }

  const candidate = value as Record<string, unknown>;
  const storyValue =
    candidate.story && typeof candidate.story === 'object'
      ? (candidate.story as Record<string, unknown>)
      : candidate;
  const slidesInput = Array.isArray(storyValue.slides) ? storyValue.slides : [];
  const slides = slidesInput
    .map(normalizeStorySlide)
    .filter((slide): slide is FableStorySlide => slide !== null);

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

const getDefaultScene = (slideIndex: number): string => {
  if (slideIndex === 0) {
    return 'cover';
  }

  return `img_${Math.min(slideIndex, 10)}`;
};

const getTaleBasePath = (
  item: FableIndexItem,
  pointerHints: { story?: string; text?: string },
): string => {
  const fromStory = pointerHints.story?.replace(/\/story\.json$/, '');
  if (fromStory) {
    return fromStory;
  }

  const fromText = pointerHints.text?.replace(/\/txt\/[^/]+\.json$/, '');
  if (fromText) {
    return fromText;
  }

  const preferredSlug = item.meta.slug.en || item.meta.slug.pl || item.meta.id;
  return joinUrlPath('tales', preferredSlug);
};

const resolveBackgroundImage = (
  taleBasePath: string,
  scene: string,
): Record<string, string> => {
  const resolveSceneFile = (resolution: '1920x1080' | '1280x720'): string => {
    const exactName = `${scene}_${resolution}.webm`;
    const exactPath = resolvePointerPath(
      joinUrlPath(taleBasePath, 'img', exactName),
    );
    if (existsSync(exactPath)) {
      return exactName;
    }

    const suffixedName = `${scene}_${resolution}_1.webm`;
    const suffixedPath = resolvePointerPath(
      joinUrlPath(taleBasePath, 'img', suffixedName),
    );
    if (existsSync(suffixedPath)) {
      return suffixedName;
    }

    return exactName;
  };

  return {
    desktop: joinUrlPath(taleBasePath, 'img', resolveSceneFile('1920x1080')),
    mobile: joinUrlPath(taleBasePath, 'img', resolveSceneFile('1280x720')),
  };
};

const resolveCovers = (
  covers: FableCovers,
  taleBasePath: string,
): FableCovers => ({
  tileCover:
    covers.tileCover || joinUrlPath(taleBasePath, 'img', 'tileCover.jpg'),
  mainCover:
    covers.mainCover ||
    joinUrlPath(taleBasePath, 'img', 'cover_1920x1080.webm'),
  fullCover:
    covers.fullCover || joinUrlPath(taleBasePath, 'img', 'fullCover.jpg'),
  audioCover:
    covers.audioCover || joinUrlPath(taleBasePath, 'img', 'audioCover.jpg'),
});

const mergeSlides = (
  taleBasePath: string,
  storySlides: FableStorySlide[],
  textSlides: FableTextSlide[],
): FableResolvedSlide[] => {
  const totalSlides = Math.max(storySlides.length, textSlides.length);
  const slides: FableResolvedSlide[] = [];

  for (let index = 0; index < totalSlides; index += 1) {
    const storySlide = storySlides[index] || {};
    const textSlide = textSlides[index] || { paragraphs: [] };
    const scene = storySlide.scene || getDefaultScene(index);

    slides.push({
      paragraphs: textSlide.paragraphs,
      backgroundImage: resolveBackgroundImage(taleBasePath, scene),
      layout: storySlide.layout || DEFAULT_LAYOUT,
      ...(storySlide.audioFile ? { audioFile: storySlide.audioFile } : {}),
    });
  }

  return slides;
};

export const getFablesIndex = async (): Promise<FableMeta[]> => {
  const index = await readFableIndex();
  return index.tales.map(item => {
    const textHint =
      item.meta.contentPointers.text.en || item.meta.contentPointers.text.pl;
    const taleBasePath = getTaleBasePath(item, {
      story: item.meta.contentPointers.story,
      text: textHint,
    });

    return {
      ...item.meta,
      covers: resolveCovers(item.meta.covers, taleBasePath),
    };
  });
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

  const storyPointer = resolveStoryPointer(
    item.meta.contentPointers,
    textPointer.locale,
  );
  const rawText = await readJsonFile(textPointer.path);
  const rawStory = storyPointer ? await readJsonFile(storyPointer.path) : null;
  const textSlides = normalizeTextContent(rawText);
  const storyContent = normalizeStoryContent(rawStory);
  const taleBasePath = getTaleBasePath(item, {
    story: storyPointer?.relativePath,
    text: textPointer.relativePath,
  });
  const slides = mergeSlides(taleBasePath, storyContent.slides, textSlides);
  const audioPointers = item.meta.contentPointers.audio || {};
  const selectedAudio = getPreferredAudioFile(
    audioPointers,
    textPointer.locale,
  );

  return {
    meta: {
      ...item.meta,
      covers: resolveCovers(item.meta.covers, taleBasePath),
    },
    content: {
      locale: textPointer.locale,
      text: {
        slides,
      },
      audio: {
        files: audioPointers,
        ...(selectedAudio ? { selected: selectedAudio } : {}),
      },
    },
  };
};
