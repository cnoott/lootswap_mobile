/***
  LootSwap - Home Filters SCREEN
 ***/

import React from 'react';
import {
  Container,
  SubContainer,
  Divider,
  ListTitleText,
  FlatList,
  FilterButton,
  FilterButtonText,
  EmptyView,
  ButtonsContainer,
  BottomMarginView,
  EmptyContainer,
  SelectedBrandButton,
  CloseIcon,
  BrandList,
  AnimatedCheckBox,
  PriceRangeContainer,
  PriceSubMinMaxLabel,
  MinPriceContainer,
  HorizontalMarginView,
} from './homeFiltersStyles';
import algoliasearch from 'algoliasearch/lite';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import LSInput from '../../components/commonComponents/LSInput';
import LSFilterScreenSearch from '../../components/filterSearch/filterScreenSearch';
import {Size, Type} from '../../enums';
import {FILTER_TYPE} from 'custom_types';
import {AlgoliaAppId, AlgoliaApiKey, ALGOLIA_INDEX_NAME} from '@env';
// import {ResetHomeFilter, UpdateHomeFilter} from '../../redux/modules';
// import {useClearRefinements} from 'react-instantsearch-hooks';
import {InstantSearch} from 'react-instantsearch-hooks';
import {useFilterData} from '../../utility/customHooks/useFilterData';
import {
  configureFilterData,
  capitalizeFirstLetter,
} from '../../utility/utility';
import {DOLLOR_TEXT} from 'localsvgimages';

const searchClient = algoliasearch(AlgoliaAppId, AlgoliaApiKey);

const FilterComponent = ({...props}) => {
  const {filterData} = useFilterData(props);
  const appliedFilters = configureFilterData([...filterData]);
  // const [filterConfigured, setFilterConfigured] = useState(false);
  // const {canRefine: canClear, refine: clearFilterData} = useClearRefinements();

  // const onResetFilterPress = () => {
  //   dispatch(ResetHomeFilter());
  //   if (canClear) {
  //     clearFilterData();
  //   }
  //   navigation.goBack();
  // };

  const onApplyFilterPress = () => {};

  const onFilterPress = filter => {
    const _filter = [...appliedFilters];
    _filter.map(data => {
      if (data?.id === filter?.parentId) {
        data.refineFunction(filter.value);
      }
    });
  };

  const renderFilter = (item, filterId) => {
    return (
      <FilterButton
        onPress={() => onFilterPress(item)}
        isSelected={item?.isRefined}
        horizontalPadding={filterId === 4 || filterId === 5 ? 15 : 20}>
        <FilterButtonText isSelected={item?.isRefined}>
          {capitalizeFirstLetter(item?.label)}
        </FilterButtonText>
      </FilterButton>
    );
  };
  const renderSelectedBrandButton = ({item, index}: any) => {
    return (
      <SelectedBrandButton onPress={() => {}} key={index}>
        <FilterButtonText isSelected={true}>
          {capitalizeFirstLetter(item?.label)}
        </FilterButtonText>
        <CloseIcon />
      </SelectedBrandButton>
    );
  };
  const renderBrandFilter = (filter: FILTER_TYPE, index: number) => {
    return (
      <EmptyView key={index}>
        <ListTitleText>{filter?.FilterTitle}</ListTitleText>
        <LSFilterScreenSearch />
        <BottomMarginView />
        <BrandList data={filter?.data} renderItem={renderSelectedBrandButton} />
      </EmptyView>
    );
  };
  const renderProductTypeFilter = (filter: FILTER_TYPE, index: number) => {
    return (
      <EmptyView key={index}>
        <ListTitleText>{filter?.FilterTitle}</ListTitleText>
        <AnimatedCheckBox isChecked={true} selected={true} text="Tradeable" />
        <AnimatedCheckBox isChecked={false} text="For Purcahse Only" />
      </EmptyView>
    );
  };
  const renderPriceRangeFilter = (filter: FILTER_TYPE, index: number) => {
    return (
      <EmptyView key={index}>
        <ListTitleText>{filter?.FilterTitle}</ListTitleText>
        <PriceRangeContainer>
          <MinPriceContainer>
            <PriceSubMinMaxLabel>Min Price</PriceSubMinMaxLabel>
            <LSInput
              onChangeText={() => {}}
              value={''}
              placeholder={'0.00'}
              horizontalSpace={0.1}
              topSpace={1}
              rightIcon={DOLLOR_TEXT}
              keyboardType={'numeric'}
              homeSearch={true}
            />
          </MinPriceContainer>
          <HorizontalMarginView />
          <MinPriceContainer>
            <PriceSubMinMaxLabel>Max Price</PriceSubMinMaxLabel>
            <LSInput
              onChangeText={() => {}}
              value={''}
              placeholder={'0.00'}
              horizontalSpace={0.1}
              topSpace={1}
              rightIcon={DOLLOR_TEXT}
              keyboardType={'numeric'}
              homeSearch={true}
            />
          </MinPriceContainer>
        </PriceRangeContainer>
      </EmptyView>
    );
  };
  const renderFilterItem = (filter: FILTER_TYPE, index: number) => {
    if (filter?.id === 2) {
      return renderBrandFilter(filter, index);
    }
    if (filter?.id === 3) {
      return renderProductTypeFilter(filter, index);
    }
    if (filter?.id === 6) {
      return renderPriceRangeFilter(filter, index);
    }
    return (
      <EmptyView key={index}>
        <ListTitleText>{filter?.FilterTitle}</ListTitleText>
        <FlatList
          data={filter?.data}
          renderItem={({item}) => renderFilter(item, filter?.id)}
        />
      </EmptyView>
    );
  };
  return (
    <EmptyContainer>
      {appliedFilters?.length > 0 && (
        <SubContainer>
          {appliedFilters.map((filter: FILTER_TYPE, index: number) => {
            return renderFilterItem(filter, index);
          })}
          <BottomMarginView />
          <Divider />
          <ButtonsContainer>
            <LSButton
              title={'RESET'}
              size={Size.Medium}
              type={Type.Grey}
              onPress={onApplyFilterPress}
            />
            <LSButton
              title={'APPLY'}
              size={Size.Medium}
              type={Type.Primary}
              onPress={onApplyFilterPress}
            />
          </ButtonsContainer>
          <BottomMarginView />
        </SubContainer>
      )}
    </EmptyContainer>
  );
};

export const HomeFiltersScreen = () => {
  return (
    <Container>
      <InStackHeader title="Filters" />
      <InstantSearch indexName={ALGOLIA_INDEX_NAME} searchClient={searchClient}>
        <FilterComponent />
      </InstantSearch>
    </Container>
  );
};

export default HomeFiltersScreen;
