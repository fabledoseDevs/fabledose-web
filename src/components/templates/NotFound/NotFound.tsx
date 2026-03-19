'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
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
import { useDictionary } from '@/lang/DictionaryProvider';

import {
  BackgroundLayer,
  Content,
  NotFoundBody,
  OverlayLayer,
} from './NotFound.styled';
import type { NotFound as NotFoundType } from './NotFound.types';

export const NotFound: NotFoundType = () => {
  const { notFoundPage } = useDictionary();
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' || lang === 'en' ? lang : 'en';

  return (
    <NotFoundBody>
      <BackgroundLayer>
        <Image
          src="/404.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center center' }}
        />
      </BackgroundLayer>
      <OverlayLayer />
      <Content>
        <Headline
          weight={HEADLINE_TYPE.SMALL}
          color={HEADLINE_FOREGROUND_COLOR.WHITE}
        >
          {notFoundPage.headline}
        </Headline>
        <Paragraph
          color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
          alignment={TEXT_ALIGNMENT.CENTER}
        >
          {notFoundPage.subtitle}
        </Paragraph>
        <Button
          actionType={ACTION_TYPE.NAVIGATION}
          variant={BUTTON_VARIANT.WHITE}
          text={notFoundPage.button}
          width={{ widthType: WIDTH_TYPE.AUTO }}
          payload={`/${locale}`}
        />
      </Content>
    </NotFoundBody>
  );
};
