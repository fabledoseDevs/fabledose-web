'use client';

import { useParams } from 'next/navigation';

import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import InputField from '@/atoms/InputField';
import { INPUT_TYPE } from '@/atoms/InputField/InputField.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR as PARAGRAPH_FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import AlphabeticalList from '@/organisms/AlphabeticalList';
import SearchResults from '@/organisms/SearchResults';

import { useCataloguePage } from './CataloguePage.hook';
import {
  CataloguePageBody,
  Column,
  DesktopOnlyColumn,
  MainContent,
  MobileQuickResultButton,
  MobileQuickResults,
  MobileQuickResultsSection,
  MobileQuickResultsTitle,
  SearchFieldHolder,
  TopSection,
} from './CataloguePage.styled';
import type { CataloguePage as CataloguePageType } from './CataloguePage.types';

export const CataloguePage: CataloguePageType = () => {
  const { cataloguePage } = useDictionary();
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';
  const {
    query,
    handleQueryChange,
    filteredAuthorItems,
    filteredTitleItems,
    selectedItem,
    selectedBooks,
    selectItem,
  } = useCataloguePage(currentLang);

  const showMobileQuickResults = query.trim().length > 0;

  return (
    <CataloguePageBody>
      <TopSection>
        <Headline
          weight={HEADLINE_TYPE.BIG}
          color={HEADLINE_FOREGROUND_COLOR.WHITE}
        >
          {cataloguePage.headline}
        </Headline>
        <Paragraph
          color={PARAGRAPH_FOREGROUND_COLOR.WHITE}
          alignment={TEXT_ALIGNMENT.CENTER}
        >
          {cataloguePage.paragraph}
        </Paragraph>
        <SearchFieldHolder>
          <InputField
            type={INPUT_TYPE.SEARCH}
            placeholder={cataloguePage.searchPlaceholder}
            value={query}
            onChange={handleQueryChange}
            name="catalogue-search"
          />

          {showMobileQuickResults && (
            <MobileQuickResults>
              <MobileQuickResultsSection>
                <MobileQuickResultsTitle>
                  {cataloguePage.titlesColumn}
                </MobileQuickResultsTitle>
                {filteredTitleItems.slice(0, 6).map(item => (
                  <MobileQuickResultButton
                    key={item.id}
                    isSelected={selectedItem?.id === item.id}
                    onClick={() => selectItem(item)}
                  >
                    {item.label}
                  </MobileQuickResultButton>
                ))}
              </MobileQuickResultsSection>

              <MobileQuickResultsSection>
                <MobileQuickResultsTitle>
                  {cataloguePage.authorsColumn}
                </MobileQuickResultsTitle>
                {filteredAuthorItems.slice(0, 6).map(item => (
                  <MobileQuickResultButton
                    key={item.id}
                    isSelected={selectedItem?.id === item.id}
                    onClick={() => selectItem(item)}
                  >
                    {item.label}
                  </MobileQuickResultButton>
                ))}
              </MobileQuickResultsSection>
            </MobileQuickResults>
          )}
        </SearchFieldHolder>
      </TopSection>

      <MainContent>
        <Column>
          <SearchResults
            selectedItem={selectedItem}
            selectedBooks={selectedBooks}
            title={cataloguePage.resultsTitle}
            noSelectedItemLabel={cataloguePage.noSelectedItem}
            emptyStateLabel={cataloguePage.emptyResults}
          />
        </Column>

        <DesktopOnlyColumn>
          <AlphabeticalList
            title={cataloguePage.titlesColumn}
            items={filteredTitleItems}
            selectedItemId={selectedItem?.id}
            emptyStateLabel={cataloguePage.emptyResults}
            onSelectItem={selectItem}
          />
        </DesktopOnlyColumn>

        <DesktopOnlyColumn>
          <AlphabeticalList
            title={cataloguePage.authorsColumn}
            items={filteredAuthorItems}
            selectedItemId={selectedItem?.id}
            emptyStateLabel={cataloguePage.emptyResults}
            onSelectItem={selectItem}
          />
        </DesktopOnlyColumn>
      </MainContent>
    </CataloguePageBody>
  );
};
