import Image from 'next/image';
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
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';
import { Gradient } from '@/organisms/Jumbotron/Jumbotron.styled';

import {
  Form,
  FormCard,
  Label,
  LabelText,
  LoginFormBody,
  NewAccount,
  ResetPassword,
} from './LoginForm.styled';
import type { LoginForm as LoginFormType } from './LoginForm.types';

export const LoginForm: LoginFormType = () => (
  <LoginFormBody>
    <Image
      src="/jumbo-static.jpg"
      alt="Jumbotron background"
      fill
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      priority
    />
    <Gradient />

    <FormCard>
      <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.PURPLE}>
        Zaloguj się
      </Headline>
      <Form>
        <Button
          actionType={ACTION_TYPE.FUNCTION_TRIGGER}
          variant={BUTTON_VARIANT.WHITE}
          text={'Zaloguj się przez Google'}
          width={{
            widthType: WIDTH_TYPE.PERCENT,
            widthValue: 100,
          }}
          iconUrl={'/icons/google.png'}
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
        />
        <Separator color={SEPARATOR_COLOR.GRAY} label={'lub'} />
        <Label>
          <LabelText>Adres email:</LabelText>
          <InputField type={INPUT_TYPE.TEXT} placeholder={'twoj@adres.email'} />
        </Label>
        <Label>
          <LabelText>Hasło:</LabelText>
          <InputField type={INPUT_TYPE.PASSWORD} />
        </Label>
        <ResetPassword>
          <Link href={'/'}>Nie pamiętam hasła</Link>
        </ResetPassword>
        <Button
          actionType={ACTION_TYPE.SUBMIT}
          variant={BUTTON_VARIANT.RED}
          width={{
            widthType: WIDTH_TYPE.PERCENT,
            widthValue: 100,
          }}
          text={'Zaloguj'}
        />
      </Form>
      <NewAccount>
        Nie masz konta? <Link href={'/register'}>Zarejestru się</Link>.
      </NewAccount>
    </FormCard>
  </LoginFormBody>
);
