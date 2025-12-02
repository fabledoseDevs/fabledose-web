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

  return (
    <RegisterFormBody>
      <FormCard>
        <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
          Załóż konto
        </Headline>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          Krok <RedText>1 z 2</RedText>
        </Paragraph>
        <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>
          Użyj adresu email lub skorzystaj z istniejącego konta Google, Facebook
          lub Apple.
        </Paragraph>
        <Form onSubmit={handleSubmit}>
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={'Zaloguj się przez Google'}
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
            text={'Zaloguj się przez Apple'}
            width={{
              widthType: WIDTH_TYPE.PERCENT,
              widthValue: 100,
            }}
            iconUrl={'/icons/apple.png'}
            isDisabled
          />
          <Separator color={SEPARATOR_COLOR.GRAY} label={'lub'} />
          <Label>
            <LabelText>Adres email:</LabelText>
            <InputField
              type={INPUT_TYPE.EMAIL}
              placeholder={'twoj@adres.email'}
              value={email}
              name="email"
              onChange={e => setEmail(e.target.value)}
              errorMessage={error?.toLowerCase().includes('email') ? error : ''}
            />
          </Label>
          <Label>
            <LabelText>Utwórz hasło:</LabelText>
            <InputField
              type={INPUT_TYPE.PASSWORD}
              value={password}
              name="password"
              onChange={e => setPassword(e.target.value)}
              errorMessage={passwordError}
            />
          </Label>
          <Label>
            <LabelText>Powtórz hasło:</LabelText>
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
            text={loading ? 'Przetwarzanie…' : 'Dalej'}
            isDisabled={loading}
          />
        </Form>
        {error && !passwordError && (
          <Paragraph alignment={TEXT_ALIGNMENT.CENTER}>{error}</Paragraph>
        )}
        <NewAccount>
          Masz konto? <Link href={'/login'}>Zaloguj się</Link>.
        </NewAccount>
      </FormCard>
    </RegisterFormBody>
  );
};
