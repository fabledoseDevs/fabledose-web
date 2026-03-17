import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import PriceTag from '@/atoms/PriceTag';
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';

import {
  InfoCardSimpleBody,
  InfoContainer,
  List,
  PriceContainer,
} from './InfoCardExtended.styled';
import type { InfoCardExtended as InfoCardExtendedType } from './InfoCardExtended.types';

export const InfoCardExtended: InfoCardExtendedType = ({
  title,
  sectionContent,
  sectionQuality,
  sectionChildrenAccounts,
  sectionLicensing,
  price,
  monthlyCostLabel = 'Miesięczny koszt',
}) => (
  <InfoCardSimpleBody>
    <InfoContainer>
      <Headline weight={HEADLINE_TYPE.BIG} color={HEADLINE_COLOR.PURPLE}>
        {title}
      </Headline>
    </InfoContainer>
    <InfoContainer height={210}>
      <Separator color={SEPARATOR_COLOR.GRAY} />
      <Paragraph boldText={true}>{sectionContent.title}</Paragraph>
      {sectionContent.paragraph && (
        <Paragraph>{sectionContent.paragraph}</Paragraph>
      )}
      {sectionContent.list && (
        <List>
          {sectionContent.list.map(li => (
            <li key={li}>{li}</li>
          ))}
        </List>
      )}
    </InfoContainer>
    <InfoContainer height={170}>
      <Separator color={SEPARATOR_COLOR.GRAY} />
      <Paragraph boldText={true}>{sectionQuality.title}</Paragraph>
      {sectionQuality.list && (
        <List>
          {sectionQuality.list.map(li => (
            <li key={li}>{li}</li>
          ))}
        </List>
      )}
    </InfoContainer>
    <InfoContainer height={110}>
      <Separator color={SEPARATOR_COLOR.GRAY} />
      <Paragraph boldText={true}>{sectionChildrenAccounts.title}</Paragraph>
      {sectionChildrenAccounts.paragraph && (
        <Paragraph>{sectionChildrenAccounts.paragraph}</Paragraph>
      )}
    </InfoContainer>
    <InfoContainer height={170}>
      <Separator color={SEPARATOR_COLOR.GRAY} />
      <Paragraph boldText={true}>{sectionLicensing.title}</Paragraph>
      {sectionLicensing.paragraph && (
        <Paragraph>{sectionLicensing.paragraph}</Paragraph>
      )}
    </InfoContainer>
    <PriceContainer>
      <Separator color={SEPARATOR_COLOR.GRAY} />
      <Paragraph boldText={true}>{monthlyCostLabel}</Paragraph>
      <PriceTag {...price} />
    </PriceContainer>
  </InfoCardSimpleBody>
);
