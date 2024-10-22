import React, {FC} from 'react';
import {
  Container,
  SubContainer,
  EmptyView,
  ListTitleText,
  HorizontalFlatList,
  FilterButton,
  FilterButtonText,
  ButtonsContainer,
  BottomMarginView,
  Divider,
  AnimatedCheckBox,
  BrandList,
  SelectedBrandButton,
  CloseIcon,
  PriceRangeContainer,
  PriceSubMinMaxLabel,
  MinPriceContainer,
  HorizontalMarginView,
} from './filtersScreenStyles';
import {
  categoryList,
  brandsList,
  shoesSizeList,
  upperClothingSize,
  lowerClothingSize,
} from '../../utility/utility';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  onSetFilter,
  filterIsSelected,
  handleSubmitFilters,
} from '../../utility/filtersUtility';
import {SearchProps} from '../../redux/modules/search/reducer';
import {clearFiltersRequest} from '../../redux/modules';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type, Filter_Type} from '../../enums';
import LSSearchableDropdown from '../../components/commonComponents/LSSearchableDropdown';
import LSInput from '../../components/commonComponents/LSInput';
import {DOLLOR_TEXT} from 'localsvgimages';

const shoesSizeStrings = shoesSizeList.map(size => size.value);
const upperClothingStrings = upperClothingSize.map(size => size.value);
const lowerClothingStrings = lowerClothingSize.map(size => size.value);

export const FiltersScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const dispatch = useDispatch();
  const {query} = route.params;
  const filters: SearchProps = useSelector(state => state.search);
  const {avaliableSizes, filtersSet} = filters;

  const renderFilter = ({item}: any, filterType: string) => {
    return (
      <FilterButton
        onPress={() => onSetFilter(dispatch, filterType, item.value)}
        isSelected={filterIsSelected(filters, item.value)}
        key={item.value}
        horizontalPadding={9}>
        <FilterButtonText isSelected={filterIsSelected(filters, item.value)}>
          {item.label}
        </FilterButtonText>
      </FilterButton>
    );
  };

  const renderSortBy = () => {
    return (
      <EmptyView>
        <ListTitleText>Sort By</ListTitleText>
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'Relevance')}
          disableBuiltInState={true}
          selected={filterIsSelected(filters, 'Relevance')}
          text="Relevance"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Sort_By, 'Relevance')
          }
        />
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'Newly listed')}
          selected={filterIsSelected(filters, 'Newly listed')}
          disableBuiltInState={true}
          text="Newly listed"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Sort_By, 'Newly listed')
          }
        />
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'Low price')}
          selected={filterIsSelected(filters, 'Low price')}
          disableBuiltInState={true}
          text="Low price"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Sort_By, 'Low price')
          }
        />
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'High price')}
          selected={filterIsSelected(filters, 'High price')}
          disableBuiltInState={true}
          text="High price"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Sort_By, 'High price')
          }
        />
      </EmptyView>
    );
  };

  const renderProductType = () => {
    return (
      <EmptyView>
        <ListTitleText>Product Type </ListTitleText>
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'tradeable')}
          disableBuiltInState={true}
          selected={filterIsSelected(filters, 'tradeable')}
          text="Tradeable"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Product_Type, 'tradeable')
          }
        />
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'purchase-only')}
          selected={filterIsSelected(filters, 'purchase-only')}
          disableBuiltInState={true}
          text="For Purchase Only"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Product_Type, 'purchase-only')
          }
        />
      </EmptyView>
    );
  };

  const renderProductCondition = () => {
    return (
      <EmptyView>
        <ListTitleText>Condition</ListTitleText>
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'New')}
          disableBuiltInState={true}
          selected={filterIsSelected(filters, 'New')}
          text="New"
          onPress={() => onSetFilter(dispatch, Filter_Type.Condition, 'New')}
        />
        <AnimatedCheckBox
          isChecked={filterIsSelected(filters, 'Pre-owned')}
          selected={filterIsSelected(filters, 'Pre-owned')}
          disableBuiltInState={true}
          text="Pre-owned"
          onPress={() =>
            onSetFilter(dispatch, Filter_Type.Condition, 'Pre-owned')
          }
        />
      </EmptyView>
    );
  };

  const renderListFilter = (
    data: Array<any>,
    title: string,
    filterType: Filter_Type,
  ) => {
    if (!data?.length) {
      return <></>;
    }
    return (
      <EmptyView>
        <ListTitleText>{title}</ListTitleText>
        <HorizontalFlatList
          data={data}
          renderItem={item => renderFilter(item, filterType)}
        />
      </EmptyView>
    );
  };

  const renderSelectedBrandButton = ({item, index}: any) => {
    return (
      <SelectedBrandButton
        onPress={() => onSetFilter(dispatch, Filter_Type.Remove_Brand, item)}
        key={index}>
        <FilterButtonText isSelected={true}>{item}</FilterButtonText>
        <CloseIcon />
      </SelectedBrandButton>
    );
  };

  const renderBrandFilter = () => {
    return (
      <EmptyView>
        <ListTitleText>Brands</ListTitleText>
        <LSSearchableDropdown
          placeHolder="Search brand"
          itemsList={brandsList.map(brand => ({
            id: brand.value,
            name: brand.label,
          }))}
          onItemPress={(value: any) =>
            onSetFilter(dispatch, Filter_Type.Add_Brand, value.id)
          }
        />
        {filters.brands.length > 0 && <BottomMarginView />}
        <BrandList
          data={filters.brands}
          renderItem={renderSelectedBrandButton}
        />
      </EmptyView>
    );
  };

  const renderSelectedSizeButton = ({item, index}: any) => {
    return (
      <SelectedBrandButton
        onPress={() => onSetFilter(dispatch, Filter_Type.Sizes, item)}
        key={index}>
        <FilterButtonText isSelected={true}>{item}</FilterButtonText>
        <CloseIcon />
      </SelectedBrandButton>
    );
  };

  const renderSizeFilter = (sizes, title, filterType, selectedSizes) => {
    return (
      <EmptyView>
        <ListTitleText>{title}</ListTitleText>
        <LSSearchableDropdown
          placeHolder="Search Size"
          itemsList={sizes.map(size => ({
            id: size.value,
            name: size.label,
          }))}
          onItemPress={(value: any) =>
            onSetFilter(dispatch, Filter_Type.Sizes, value.id)
          }
        />
        {filters.brands.length > 0 && <BottomMarginView />}
        <BrandList data={selectedSizes} renderItem={renderSelectedSizeButton} />
      </EmptyView>
    );
  };

  const renderPriceFilter = () => {
    return (
      <EmptyView>
        <ListTitleText>{'Price Range'}</ListTitleText>
        <PriceRangeContainer>
          <MinPriceContainer>
            <PriceSubMinMaxLabel>Min Price</PriceSubMinMaxLabel>
            <LSInput
              onChangeText={val =>
                onSetFilter(dispatch, Filter_Type.Min_Price, val)
              }
              onBlurCall={() => {}}
              value={filters.minPrice}
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
              onChangeText={val =>
                onSetFilter(dispatch, Filter_Type.Max_Price, val)
              }
              onBlurCall={() => {}}
              value={filters.maxPrice}
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

  return (
    <Container>
      <InStackHeader title={'Filters'} onBackCall={() => navigation.goBack()} />
      <SubContainer>
        {renderSortBy()}
        {renderListFilter(categoryList, 'Category', Filter_Type.Category)}
        {renderBrandFilter()}
        {renderProductType()}
        {renderSizeFilter(
          shoesSizeList,
          'Shoe Sizes',
          Filter_Type.Sizes,
          filters.sizes.filter(size => shoesSizeStrings.includes(size)),
        )}
        {renderSizeFilter(
          upperClothingSize,
          'Clothing Tops Size',
          Filter_Type.Sizes,
          filters.sizes.filter(size => upperClothingStrings.includes(size)),
        )}
        {renderSizeFilter(
          lowerClothingSize,
          'Pants Sizes',
          Filter_Type.Sizes,
          filters.sizes.filter(size => lowerClothingStrings.includes(size)),
        )}
        {renderListFilter(
          avaliableSizes?.hatSizes,
          'Available Hat Sizes',
          Filter_Type.Sizes,
        )}
        {renderPriceFilter()}
        {renderProductCondition()}
      </SubContainer>

      <BottomMarginView />
      <Divider />
      <ButtonsContainer>
        {filtersSet && (
          <LSButton
            title={'Clear Filters'}
            size={Size.Medium}
            type={Type.Grey}
            onPress={() => dispatch(clearFiltersRequest())}
          />
        )}
        <LSButton
          title={'Done'}
          size={filtersSet ? Size.Medium : Size.Large}
          type={Type.Primary}
          onPress={() =>
            handleSubmitFilters(dispatch, navigation, filters, query)
          }
        />
      </ButtonsContainer>
    </Container>
  );
};

export default FiltersScreen;
