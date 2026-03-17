import Link from 'next/link';

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
import Paragraph from '@/atoms/Paragraph';
import { TEXT_ALIGNMENT } from '@/atoms/Paragraph/Paragraph.types';
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';
import { useDictionary } from '@/lang/DictionaryProvider';

import useRegisterForm from './RegisterForm.hook';
import {
  Form,
  FormCard,
  Label,
  LabelText,
  NewAccount,
  RedText,
  RegisterFormBody,
} from './RegisterForm.styled';
import type { RegisterForm as RegisterFormType } from './RegisterForm.types';

export const RegisterForm: RegisterFormType = ({ onSuccess }) => {
  const { registerPage } = useDictionary();
  const {
    email,
    password,
    confirmPassword,
    loading,
    error,
    passwordError,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleGoogleSignIn,
    handleSubmit,
  } = useRegisterForm({ onSuccess });
  const { form } = registerPage;

  return (
    <RegisterFormBody>
      <FormCard>
        <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
          {form.headline}
        </Headline>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          {form.stepLabel} <RedText>{form.stepHighlight}</RedText>
        </Paragraph>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          {form.description}
        </Paragraph>
        <Form onSubmit={handleSubmit}>
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={form.googleButton}
            width={{
              widthType: WIDTH_TYPE.PERCENT,
              widthValue: 100,
            }}
            iconUrl={'/icons/google.png'}
            isDisabled={loading}
            payload={handleGoogleSignIn}
          />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={form.appleButton}
            width={{
              widthType: WIDTH_TYPE.PERCENT,
              widthValue: 100,
            }}
            iconUrl={'/icons/apple.png'}
            isDisabled
          />
          <Separator color={SEPARATOR_COLOR.GRAY} label={form.separatorLabel} />
          <Label>
            <LabelText>{form.emailLabel}</LabelText>
            <InputField
              type={INPUT_TYPE.EMAIL}
              placeholder={form.emailPlaceholder}
              value={email}
              name="email"
              onChange={e => setEmail(e.target.value)}
              errorMessage={error?.toLowerCase().includes('email') ? error : ''}
            />
          </Label>
          <Label>
            <LabelText>{form.passwordLabel}</LabelText>
            <InputField
              type={INPUT_TYPE.PASSWORD}
              value={password}
              name="password"
              onChange={e => setPassword(e.target.value)}
              errorMessage={passwordError}
            />
          </Label>
          <Label>
            <LabelText>{form.confirmPasswordLabel}</LabelText>
            <InputField
              type={INPUT_TYPE.PASSWORD}
              value={confirmPassword}
              name="confirmPassword"
              onChange={e => setConfirmPassword(e.target.value)}
              errorMessage={passwordError}
            />
          </Label>
          <Button
            actionType={ACTION_TYPE.SUBMIT}
            variant={BUTTON_VARIANT.RED}
            width={{
              widthType: WIDTH_TYPE.PERCENT,
              widthValue: 100,
            }}
            text={loading ? form.submitLoading : form.submit}
            isDisabled={loading}
          />
        </Form>
        {error && !passwordError && (
          <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>{error}</Paragraph>
        )}
        <NewAccount>
          {form.hasAccount} <Link href={'/login'}>{form.loginLink}</Link>.
        </NewAccount>
      </FormCard>
    </RegisterFormBody>
  );
};
