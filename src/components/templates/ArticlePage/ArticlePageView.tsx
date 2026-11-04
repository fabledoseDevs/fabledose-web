'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import FooterSimple from '@/organisms/FooterSimple';

import { ArticlePage } from './ArticlePage';
import { PublicArticleNavigation } from './ArticlePage.styled';
import type { ArticlePageView as ArticlePageViewType } from './ArticlePage.types';

export const ArticlePageView: ArticlePageViewType = ({ article }) => {
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';
  const { helpCenter } = useDictionary();
  return (
    <>
      <PublicArticleNavigation
        aria-label={
          locale === 'pl' ? 'Nawigacja artykułu' : 'Article navigation'
        }
      >
        <Button
          text={locale === 'pl' ? 'Strona główna' : 'Home'}
          actionType={ACTION_TYPE.NAVIGATION}
          variant={BUTTON_VARIANT.WHITE}
          payload={`/${locale}`}
          width={{ widthType: WIDTH_TYPE.AUTO }}
        />
        <Button
          text={helpCenter.title}
          actionType={ACTION_TYPE.NAVIGATION}
          variant={BUTTON_VARIANT.WHITE}
          payload={`/${locale}/help`}
          width={{ widthType: WIDTH_TYPE.AUTO }}
        />
        <Link
          href={`/pl/article/${article.url}`}
          lang="pl"
          hrefLang="pl"
          aria-current={locale === 'pl' ? 'page' : undefined}
        >
          Polski
        </Link>
        <Link
          href={`/en/article/${article.url}`}
          lang="en"
          hrefLang="en"
          aria-current={locale === 'en' ? 'page' : undefined}
        >
          English
        </Link>
      </PublicArticleNavigation>
      <ArticlePage article={article} />
      {article.url === 'contact' && (
        <PublicArticleNavigation
          aria-label={locale === 'pl' ? 'Kontakt e-mail' : 'Email contact'}
        >
          <Button
            text={locale === 'pl' ? 'Napisz do nas' : 'Email us'}
            actionType={ACTION_TYPE.NAVIGATION}
            variant={BUTTON_VARIANT.WHITE}
            payload="mailto:fabledose@gmail.com"
            width={{ widthType: WIDTH_TYPE.AUTO }}
          />
        </PublicArticleNavigation>
      )}
      <FooterSimple />
    </>
  );
};
