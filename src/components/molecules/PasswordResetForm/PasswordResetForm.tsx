'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import InputField from '@/atoms/InputField';
import { INPUT_TYPE } from '@/atoms/InputField/InputField.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import {
  Form,
  FormCard,
  Label,
  LabelText,
  NewAccount,
} from '@/molecules/LoginForm/LoginForm.styled';
import { Gradient } from '@/organisms/Jumbotron/Jumbotron.styled';

import { usePasswordResetForm } from './PasswordResetForm.hook';
import { Fields, Message, ResetBody } from './PasswordResetForm.styled';
import type { PasswordResetForm as PasswordResetFormType } from './PasswordResetForm.types';

export const PasswordResetForm: PasswordResetFormType = () => {
  const { passwordResetPage: text } = useDictionary();
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';
  const { email, setEmail, loading, error, sent, handleSubmit } =
    usePasswordResetForm();

  return (
    <ResetBody>
      <Image
        src="/jumbo-static.jpg"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <Gradient />
      <FormCard>
        <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
          {text.headline}
        </Headline>
        <Message>{text.description}</Message>
        <Form onSubmit={handleSubmit} aria-busy={loading}>
          <Fields disabled={loading}>
            <Label>
              <LabelText>{text.emailLabel}</LabelText>
              <InputField
                type={INPUT_TYPE.EMAIL}
                name="email"
                placeholder={text.placeholder}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Label>
            <Button
              actionType={ACTION_TYPE.SUBMIT}
              variant={BUTTON_VARIANT.RED}
              width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
              text={loading ? text.sending : text.submit}
              isDisabled={loading}
            />
          </Fields>
        </Form>
        <div aria-live="polite" aria-atomic="true">
          {sent && <Message role="status">{text.success}</Message>}
          {error && <Message role="alert">{error}</Message>}
        </div>
        <NewAccount>
          <Link href={`/${locale}/login`}>{text.backToLogin}</Link>
        </NewAccount>
      </FormCard>
    </ResetBody>
  );
};
