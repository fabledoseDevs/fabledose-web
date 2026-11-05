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
        />
      </Container>
    </MaintenanceBody>
  );
};
