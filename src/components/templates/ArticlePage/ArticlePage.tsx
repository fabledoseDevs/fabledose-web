'use client';

import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR as PARAGRAPH_FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';

import {
  ArticlePageBody,
  ArticlePageContent,
  ArticlePageHeadlineWrapper,
  ArticleSection,
  ArticleSections,
  BulletList,
  ParagraphsHolder,
} from './ArticlePage.styled';
import type { ArticlePage as ArticlePageType } from './ArticlePage.types';

const toParagraphArray = (paragraphs?: string | string[]): string[] => {
  if (!paragraphs) {
    return [];
  }

  return Array.isArray(paragraphs) ? paragraphs : [paragraphs];
};

export const ArticlePage: ArticlePageType = ({ article }) => (
  <ArticlePageBody>
    <ArticlePageContent>
      <ArticlePageHeadlineWrapper>
        <Headline
          weight={HEADLINE_TYPE.BIG}
          color={HEADLINE_FOREGROUND_COLOR.WHITE}
        >
          {article.title}
        </Headline>
      </ArticlePageHeadlineWrapper>

      <ArticleSections>
        {article.sections.map((section, sectionIndex) => (
          <ArticleSection key={`${article.url}-section-${sectionIndex}`}>
            {section.title ? (
              <Headline
                weight={HEADLINE_TYPE.SMALL}
                color={HEADLINE_FOREGROUND_COLOR.WHITE}
              >
                {section.title}
              </Headline>
            ) : null}

            <ParagraphsHolder>
              {toParagraphArray(section.paragraphs).map(
                (paragraph, paragraphIndex) => (
                  <Paragraph
                    key={`${article.url}-section-${sectionIndex}-paragraph-${paragraphIndex}`}
                    color={PARAGRAPH_FOREGROUND_COLOR.ECRU}
                    alignment={TEXT_ALIGNMENT.LEFT}
                  >
                    {paragraph}
                  </Paragraph>
                ),
              )}
            </ParagraphsHolder>

            {section.list?.length ? (
              <BulletList>
                {section.list.map((item, itemIndex) => (
                  <li
                    key={`${article.url}-section-${sectionIndex}-list-${itemIndex}`}
                  >
                    <Paragraph
                      color={PARAGRAPH_FOREGROUND_COLOR.ECRU}
                      alignment={TEXT_ALIGNMENT.LEFT}
                    >
                      {item}
                    </Paragraph>
                  </li>
                ))}
              </BulletList>
            ) : null}
          </ArticleSection>
        ))}
      </ArticleSections>
    </ArticlePageContent>
  </ArticlePageBody>
);
