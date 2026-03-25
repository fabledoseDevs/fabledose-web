import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import type {
  ArticleData,
  ArticleLocale,
  ArticleLocalizedData,
  ArticleSection,
  ArticleTranslation,
} from './articles.types';

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'articles', 'content');
const SUPPORTED_EXTENSIONS = new Set(['.json', '.js', '.mjs', '.cjs']);
const SUPPORTED_LOCALES: ArticleLocale[] = ['pl', 'en'];

const isString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isString);

const normalizeParagraphs = (
  value: unknown,
): ArticleSection['paragraphs'] | undefined => {
  if (isString(value)) {
    return value;
  }

  if (isStringArray(value)) {
    return value;
  }

  return undefined;
};

const normalizeSection = (value: unknown): ArticleSection | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const title = isString(candidate.title) ? candidate.title : undefined;
  const paragraphs = normalizeParagraphs(candidate.paragraphs);
  const list = isStringArray(candidate.list) ? candidate.list : undefined;

  if (!title && !paragraphs && !list) {
    return null;
  }

  return {
    ...(title ? { title } : {}),
    ...(paragraphs ? { paragraphs } : {}),
    ...(list ? { list } : {}),
  };
};

const normalizeLegacyArticle = (value: unknown): ArticleData | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const title = isString(candidate.title) ? candidate.title : null;
  const url = isString(candidate.url) ? candidate.url : null;
  const sectionsValue = Array.isArray(candidate.sections)
    ? candidate.sections
    : null;

  if (!title || !url || !sectionsValue) {
    return null;
  }

  const sections = sectionsValue
    .map(normalizeSection)
    .filter((section): section is ArticleSection => section !== null);

  if (!sections.length) {
    return null;
  }

  return { title, url, sections };
};

const normalizeTranslation = (value: unknown): ArticleTranslation | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const title = isString(candidate.title) ? candidate.title : null;
  const sectionsValue = Array.isArray(candidate.sections)
    ? candidate.sections
    : null;

  if (!title || !sectionsValue) {
    return null;
  }

  const sections = sectionsValue
    .map(normalizeSection)
    .filter((section): section is ArticleSection => section !== null);

  if (!sections.length) {
    return null;
  }

  return { title, sections };
};

const isArticleLocale = (value: string): value is ArticleLocale =>
  SUPPORTED_LOCALES.includes(value as ArticleLocale);

const normalizeLocalizedArticle = (
  value: unknown,
): ArticleLocalizedData | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const url = isString(candidate.url) ? candidate.url : null;
  const translationsValue =
    candidate.translations && typeof candidate.translations === 'object'
      ? (candidate.translations as Record<string, unknown>)
      : null;

  if (!url || !translationsValue) {
    return null;
  }

  const translations: Partial<Record<ArticleLocale, ArticleTranslation>> = {};

  for (const [locale, translationValue] of Object.entries(translationsValue)) {
    if (!isArticleLocale(locale)) {
      continue;
    }

    const normalizedTranslation = normalizeTranslation(translationValue);

    if (normalizedTranslation) {
      translations[locale] = normalizedTranslation;
    }
  }

  if (!Object.keys(translations).length) {
    return null;
  }

  return { url, translations };
};

const normalizeArticleForLanguage = (
  value: unknown,
  lang: string,
): ArticleData | null => {
  const localizedArticle = normalizeLocalizedArticle(value);

  if (localizedArticle) {
    const selectedTranslation =
      localizedArticle.translations[lang as ArticleLocale] ||
      localizedArticle.translations.en ||
      localizedArticle.translations.pl;

    if (!selectedTranslation) {
      return null;
    }

    return {
      url: localizedArticle.url,
      title: selectedTranslation.title,
      sections: selectedTranslation.sections,
    };
  }

  return normalizeLegacyArticle(value);
};

const readFromJsModule = async (filePath: string): Promise<unknown> => {
  const importedModule = await import(pathToFileURL(filePath).href);

  if ('default' in importedModule) {
    return importedModule.default;
  }

  if ('article' in importedModule) {
    return importedModule.article;
  }

  if ('articles' in importedModule) {
    return importedModule.articles;
  }

  if ('data' in importedModule) {
    return importedModule.data;
  }

  return null;
};

const readArticlesFromFile = async (
  filePath: string,
  lang: string,
): Promise<ArticleData[]> => {
  const ext = path.extname(filePath).toLowerCase();

  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    return [];
  }

  try {
    const rawPayload =
      ext === '.json'
        ? JSON.parse(await fs.readFile(filePath, 'utf-8'))
        : await readFromJsModule(filePath);

    const payloadArray = Array.isArray(rawPayload) ? rawPayload : [rawPayload];

    return payloadArray
      .map(item => normalizeArticleForLanguage(item, lang))
      .filter((article): article is ArticleData => article !== null);
  } catch {
    return [];
  }
};

const toSlug = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .pop() || '';

export const getAllArticles = async (lang: string): Promise<ArticleData[]> => {
  try {
    const entries = await fs.readdir(ARTICLES_DIR, { withFileTypes: true });
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => path.join(ARTICLES_DIR, entry.name));

    const articleGroups = await Promise.all(
      files.map(filePath => readArticlesFromFile(filePath, lang)),
    );

    return articleGroups.flat();
  } catch {
    return [];
  }
};

export const getArticleBySlug = async (
  slug: string,
  lang: string,
): Promise<ArticleData | null> => {
  const normalizedSlug = toSlug(decodeURIComponent(slug));
  const articles = await getAllArticles(lang);

  return (
    articles.find(article => {
      const articleSlug = toSlug(article.url);
      const normalizedUrl = article.url
        .trim()
        .toLowerCase()
        .replace(/^\/+|\/+$/g, '');

      return articleSlug === normalizedSlug || normalizedUrl === normalizedSlug;
    }) || null
  );
};
