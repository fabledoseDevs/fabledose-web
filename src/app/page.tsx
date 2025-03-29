'use client';
import Button from "@/atoms/Button";
import {ACTION_TYPE, BUTTON_COLOR, BUTTON_SIZE} from "@/atoms/Button/Button.types";

const Home = () => {
  return (
    <Button
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      variant={BUTTON_SIZE.DEFAULT}
      color={BUTTON_COLOR.BEIGE}
      text="Hello World"
      payload={() => console.log('Hello World')}
    />
  );
}

export default Home;