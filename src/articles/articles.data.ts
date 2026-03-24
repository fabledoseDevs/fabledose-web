import 'server-only';

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import type { ArticleData, ArticleSection } from './articles.types';

const ARTICLES_DIR = path.join(process.cwd(), 'public', 'articles');
const SUPPORTED_EXTENSIONS = new Set(['.json', '.js', '.mjs', '.cjs']);

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

const normalizeArticle = (value: unknown): ArticleData | null => {
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
      .map(normalizeArticle)
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

export const getAllArticles = async (): Promise<ArticleData[]> => {
  try {
    const entries = await fs.readdir(ARTICLES_DIR, { withFileTypes: true });
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => path.join(ARTICLES_DIR, entry.name));

    const articleGroups = await Promise.all(files.map(readArticlesFromFile));

    return articleGroups.flat();
  } catch {
    return [];
  }
};

export const getArticleBySlug = async (
  slug: string,
): Promise<ArticleData | null> => {
  const normalizedSlug = toSlug(decodeURIComponent(slug));
  const articles = await getAllArticles();

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
