/***
  LootSwap - Home Filters SCREEN
 ***/

import React, {FC} from 'react';
import {AlgoliaAppId, AlgoliaApiKey, ALGOLIA_INDEX_NAME} from '@env';
import {InstantSearch} from 'react-instantsearch-hooks';
import algoliasearch from 'algoliasearch/lite';
import HomeFiltersScreen from './homeFilters';
const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

export const HomeFiltersContainerScreen: FC<{}> = () => {
  return (
    <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
      <HomeFiltersScreen />
    </InstantSearch>
  );
};

export default HomeFiltersContainerScreen;
