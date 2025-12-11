import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
} from '@/atoms/Container/Container.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import Jumbotron from '@/organisms/Jumbotron';

import { MaintenanceBody } from './Maintenance.styled';
import type { Maintenance as MaintenanceType } from './Maintenance.types';

export const Maintenance: MaintenanceType = () => {
  const { maintenance } = useDictionary();

  return (
    <MaintenanceBody>
      <Container
        containerType={CONTAINER_ELEMENT.SECTION}
        backgroundColor={BACKGROUND_COLOR.PURPLE}
      >
        <Jumbotron
          logo={true}
          headline={maintenance.headline}
          paragraph={
            <span dangerouslySetInnerHTML={{ __html: maintenance.paragraph }} />
          }
          button={{
            actionType: ACTION_TYPE.NAVIGATION,
            variant: BUTTON_VARIANT.RED,
            width: {
              widthType: WIDTH_TYPE.AUTO,
            },
            text: maintenance.button,
            payload: 'https://demo.fabledose.com',
          }}
        />
      </Container>
    </MaintenanceBody>
  );
};
