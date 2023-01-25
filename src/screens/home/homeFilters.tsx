/***
  LootSwap - Home Filters SCREEN
 ***/

import React, {useState} from 'react';
import {Modal} from 'react-native';
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
  SelectedBrandButton,
  CloseIcon,
  BrandList,
  AnimatedCheckBox,
  PriceRangeContainer,
  PriceSubMinMaxLabel,
  MinPriceContainer,
  HorizontalMarginView,
} from './homeFiltersStyles';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import LSButton from '../../components/commonComponents/LSButton';
import LSInput from '../../components/commonComponents/LSInput';
import LSSearchableDropdown from '../../components/commonComponents/LSSearchableDropdown';
import LSLoader from '../../components/commonComponents/LSLoader';
import {Size, Type} from '../../enums';
import {FILTER_TYPE, PRICE_RANGE_FILTER} from 'custom_types';
import {useClearRefinements} from 'react-instantsearch-hooks';
import {useFilterData} from '../../utility/customHooks/useFilterData';
import {
  configureFilterData,
  capitalizeFirstLetter,
} from '../../utility/utility';
import {DOLLOR_TEXT} from 'localsvgimages';
import {Alert} from 'custom_top_alert';

export const HomeFiltersScreen = props => {
  const {isModalOpen, onToggleModal} = props;
  const {filterData, hasData} = useFilterData(props);
  const appliedFilters = configureFilterData([...filterData]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState<PRICE_RANGE_FILTER>(null);
  const [alteredFilterData, setAlteredFilterData] = useState<any>(null);
  // const [filterConfigured, setFilterConfigured] = useState(false);
  const {canRefine: canClear, refine: clearFilterData} = useClearRefinements();

  const onApplyFilterPress = () => {
    if (alteredFilterData) {
      const _filter = alteredFilterData
        ? [...alteredFilterData]
        : [...appliedFilters];
      _filter.map(data => {
        // For Price range => If index of price range changes then here also needs to change
        if (data?.id === 6 && priceRange) {
          data.refineFunction([priceRange?.min, priceRange?.max]);
        } else {
          data?.data?.map(innerData => {
            if (innerData?.isRefined) {
              data.refineFunction(innerData?.value); // Will run for all selected filters
            }
          });
        }
      });
      onToggleModal();
      setAlteredFilterData(null);
    } else {
      Alert.showError('Please apply filter');
    }
  };

  const onResetFilterPress = () => {
    if (canClear) {
      clearFilterData();
      setTimeout(() => {
        onToggleModal();
      }, 200);
    }
  };

  const onPriceChange = (
    val: Number,
    isMin: boolean = true,
    oldRange: PRICE_RANGE_FILTER,
  ) => {
    const prevRange = priceRange ? priceRange : oldRange;
    const newRange = isMin
      ? {...prevRange, min: val}
      : {...prevRange, max: val};
    setPriceRange(newRange);
    const _filter = alteredFilterData
      ? [...alteredFilterData]
      : [...appliedFilters];
    setAlteredFilterData(_filter);
  };

  const onFilterPress = filter => {
    const _filter = alteredFilterData
      ? [...alteredFilterData]
      : [...appliedFilters];
    const newData = _filter.map(data => {
      if (data?.id === filter?.parentId) {
        // data.refineFunction(filter.value);
        const _new = data?.data?.map(innerData => {
          if (innerData?.value === filter?.value) {
            innerData.isRefined = !innerData?.isRefined;
          }
          return innerData;
        });
        return {...data, data: _new};
      }
      return data;
    });
    setAlteredFilterData(newData);
  };

  const removeSelectedBrand = (brand: any) => {
    const selectedBrandsList = [...selectedBrands];
    selectedBrandsList.splice(
      selectedBrandsList.findIndex(el => el?.id === brand?.id),
      1,
    );
    setSelectedBrands(selectedBrandsList);
    onFilterPress(brand);
  };

  const updateSelectedItems = (_selectedBrands: any) => {
    setSelectedBrands(_selectedBrands);
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
      <SelectedBrandButton
        onPress={() => removeSelectedBrand(item)}
        key={index}>
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
        <LSSearchableDropdown
          placeHolder="Search brand"
          itemsList={filter?.data}
          updateSelectedItems={updateSelectedItems}
          onItemPress={onFilterPress}
        />
        {selectedBrands?.length > 0 && <BottomMarginView />}
        <BrandList
          data={selectedBrands}
          renderItem={renderSelectedBrandButton}
        />
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
              onChangeText={(newPrice: string) =>
                onPriceChange(newPrice, true, filter?.range)
              }
              value={
                priceRange
                  ? priceRange?.min?.toString()
                  : filter?.range?.min?.toString()
              }
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
              onChangeText={(newPrice: string) =>
                onPriceChange(newPrice, false, filter?.range)
              }
              value={
                priceRange
                  ? priceRange?.max?.toString()
                  : filter?.range?.max?.toString()
              }
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
    if (filter?.data?.length === 0) {
      return null;
    }
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
        <ListTitleText isFirst={index === 0}>
          {filter?.FilterTitle}
        </ListTitleText>
        <FlatList
          data={filter?.data}
          renderItem={({item}) => renderFilter(item, filter?.id)}
        />
      </EmptyView>
    );
  };
  const filterDataList = alteredFilterData ? alteredFilterData : appliedFilters;
  return (
    <Modal transparent={true} animationType="none" visible={isModalOpen}>
      <Container>
        <InStackHeader title="Filters" onBackCall={() => onToggleModal()} />
        {filterDataList?.length > 0 && hasData && (
          <SubContainer>
            {filterDataList.map((filter: FILTER_TYPE, index: number) => {
              return renderFilterItem(filter, index);
            })}
            <BottomMarginView />
            <Divider />
            <ButtonsContainer>
              <LSButton
                title={'RESET'}
                size={Size.Medium}
                type={Type.Grey}
                onPress={onResetFilterPress}
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
        {!hasData && <LSLoader isVisible={true} />}
      </Container>
    </Modal>
  );
};

export default HomeFiltersScreen;
