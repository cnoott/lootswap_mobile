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
import {useFilterData} from '../../utility/customHooks/useFilterData';
import {
  configureFilterData,
  capitalizeFirstLetter,
} from '../../utility/utility';
import {DOLLOR_TEXT} from 'localsvgimages';

export const HomeFiltersScreen = props => {
  const {isModalOpen, onToggleModal} = props;
  const {filterData, hasData} = useFilterData(props);
  const appliedFilters = configureFilterData([...filterData]);
  const [priceRange, setPriceRange] = useState<PRICE_RANGE_FILTER>(null);

  const onDoneButtonPress = () => {
    onToggleModal();
  };

  const priceChangeDone = () => {
    const _filter = [...appliedFilters];
    const priceData = _filter?.filter(_fil => _fil?.id === 6);
    if (priceData && priceData?.length > 0) {
      priceData[0]?.refineFunction([priceRange?.min, priceRange?.max]);
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
  };

  const onFilterPress = filter => {
    const _filter = [...appliedFilters];
    _filter.map(data => {
      if (data?.id === filter?.parentId) {
        data.refineFunction(filter.value);
      }
    });
  };

  const removeSelectedBrand = (brand: any) => {
    const _filter = [...appliedFilters];
    _filter.map(data => {
      if (data?.id === brand?.id) {
        data.refineFunction(brand.value);
      }
    });
  };

  const updateSelectedItems = (_selectedBrands: any) => {};

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
        {filter?.selectedBrandData?.length > 0 && <BottomMarginView />}
        <BrandList
          data={filter?.selectedBrandData}
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
              onBlurCall={() => priceChangeDone()}
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
              onBlurCall={() => priceChangeDone()}
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
  const filterDataList = appliedFilters;
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
                title={'Done'}
                size={Size.Fit_To_Width}
                type={Type.Primary}
                onPress={onDoneButtonPress}
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
