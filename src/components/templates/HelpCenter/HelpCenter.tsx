'use client';
import { useParams } from 'next/navigation';

import ArticleLink from '@/atoms/ArticleLink';
import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  PADDING,
} from '@/atoms/Container/Container.types';
import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import { FOREGROUND_COLOR as TEXT_COLOR } from '@/atoms/Paragraph/Paragraph.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import Accordion from '@/molecules/Accordion';
import FooterSimple from '@/organisms/FooterSimple';

import {
  ArticlePageBody,
  ArticlePageContent,
  PublicArticleNavigation,
} from '../ArticlePage/ArticlePage.styled';
import type { HelpCenter as HelpCenterType } from './HelpCenter.types';

export const HelpCenter: HelpCenterType = ({ articles }) => {
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';
  const text = useDictionary().helpCenter;
  const groups = [
    {
      title: text.guides,
      slugs: [
        'account-and-plans',
        'reading-and-listening',
        'display-and-audio',
        'parental-controls',
        'payments',
      ],
    },
    { title: text.project, slugs: ['about', 'collaboration', 'contact'] },
    { title: text.legal, slugs: ['privacy-policy', 'terms-of-use', 'cookies'] },
  ];
  const known = new Set(groups.flatMap(group => group.slugs));
  const visibleArticles = articles.filter(
    article => article.url !== 'example-article',
  );
  const other = visibleArticles.filter(article => !known.has(article.url));
  return (
    <>
      <PublicArticleNavigation aria-label={text.title}>
        <Button
          text={text.home}
          actionType={ACTION_TYPE.NAVIGATION}
          variant={BUTTON_VARIANT.WHITE}
          payload={`/${locale}`}
          width={{ widthType: WIDTH_TYPE.AUTO }}
        />
        <ArticleLink
          href="/pl/help"
          lang="pl"
          hrefLang="pl"
          aria-current={locale === 'pl' ? 'page' : undefined}
        >
          Polski
        </ArticleLink>
        <ArticleLink
          href="/en/help"
          lang="en"
          hrefLang="en"
          aria-current={locale === 'en' ? 'page' : undefined}
        >
          English
        </ArticleLink>
      </PublicArticleNavigation>
      <ArticlePageBody>
        <ArticlePageContent>
          <Container
            containerType={CONTAINER_ELEMENT.HEADER}
            gap
            verticalPadding={PADDING.STANDARD}
          >
            <Headline
              weight={HEADLINE_TYPE.JUMBO}
              color={FOREGROUND_COLOR.WHITE}
            >
              {text.title}
            </Headline>
            <Paragraph color={TEXT_COLOR.ECRU}>{text.intro}</Paragraph>
          </Container>
          <Container containerType={CONTAINER_ELEMENT.SECTION} gap>
            <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.WHITE}>
              {text.faqTitle}
            </Headline>
            <Container
              containerType={CONTAINER_ELEMENT.DIV}
              backgroundColor={BACKGROUND_COLOR.WHITE}
              verticalPadding={PADDING.STANDARD}
              rounded
            >
              <Container
                containerType={CONTAINER_ELEMENT.DIV}
                maxWidth={680}
                mobilePadding
              >
                <Accordion
                  ribsList={text.faq.map(item => ({
                    mainText: item.question,
                    isOpen: false,
                    children: (
                      <Paragraph color={TEXT_COLOR.PURPLE}>
                        {item.answer}
                      </Paragraph>
                    ),
                  }))}
                />
              </Container>
            </Container>
          </Container>
          <Container
            containerType={CONTAINER_ELEMENT.SECTION}
            verticalPadding={PADDING.DOUBLE}
            gap
          >
            <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.WHITE}>
              {text.articlesTitle}
            </Headline>
            {[
              ...groups,
              ...(other.length
                ? [
                    {
                      title: text.other,
                      slugs: other.map(article => article.url),
                    },
                  ]
                : []),
            ].map(group => (
              <Container
                key={group.title}
                containerType={CONTAINER_ELEMENT.SECTION}
                verticalPadding={PADDING.STANDARD}
                gap
              >
                <Headline
                  weight={HEADLINE_TYPE.SMALL}
                  color={FOREGROUND_COLOR.WHITE}
                >
                  {group.title}
                </Headline>
                <Container containerType={CONTAINER_ELEMENT.DIV} gap>
                  {group.slugs
                    .map(slug =>
                      visibleArticles.find(article => article.url === slug),
                    )
                    .filter(article => article !== undefined)
                    .map(article => (
                      <ArticleLink
                        key={article.url}
                        href={`/${locale}/article/${article.url}`}
                      >
                        {article.title}
                      </ArticleLink>
                    ))}
                </Container>
              </Container>
            ))}
          </Container>
          <Container
            containerType={CONTAINER_ELEMENT.SECTION}
            verticalPadding={PADDING.STANDARD}
            alignItems={FLEX_ALIGNMENT.START}
            gap
          >
            <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.WHITE}>
              {text.contactTitle}
            </Headline>
            <Paragraph color={TEXT_COLOR.ECRU}>
              {text.contactDescription}
            </Paragraph>
            <Button
              text={text.contactButton}
              actionType={ACTION_TYPE.NAVIGATION}
              variant={BUTTON_VARIANT.RED}
              payload={`/${locale}/article/contact`}
              width={{ widthType: WIDTH_TYPE.AUTO }}
            />
          </Container>
        </ArticlePageContent>
      </ArticlePageBody>
      <FooterSimple />
    </>
  );
};
