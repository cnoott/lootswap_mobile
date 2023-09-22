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
} from './filtersScreenStyles'
import {
  categoryList,
  brandsList,
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
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type, Filter_Type} from '../../enums';
import LSSearchableDropdown from '../../components/commonComponents/LSSearchableDropdown';


export const FiltersScreen: FC<any> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const dispatch = useDispatch();
  const filters: SearchProps = useSelector(state => state.search);
  const {avaliableSizes} = filters;

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

  const renderListFilter = (
    data: Array<any>,
    title: string,
    filterType: Filter_Type,
  ) => {
    if (!data?.length) {
      return <></>
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
        <FilterButtonText isSelected={true}>
          {item}
        </FilterButtonText>
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
          itemsList={
            brandsList.map(
              brand => ({id: brand.value, name: brand.label})
            )
          }
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



  return (
    <Container>
      <InStackHeader title={'Filters'} onBackCall={() => navigation.goBack()} />
      <SubContainer>
        {renderListFilter(categoryList, 'Category', Filter_Type.Category)}
        {renderBrandFilter()}
        {renderProductType()}
        {renderListFilter(
          avaliableSizes?.shoeSizes,
          'Avaliable Shoe Sizes',
          Filter_Type.Category,
        )}
        {renderListFilter(
          avaliableSizes?.shirtSizes,
          'Avaliable Clothing Sizes',
          Filter_Type.Category,
        )}
        {renderListFilter(
          avaliableSizes?.pantSizes,
          'Avaliable Pant Sizes',
          Filter_Type.Category,
        )}
        {renderListFilter(
          avaliableSizes?.hatSizes,
          'Avaliable Hat Sizes',
          Filter_Type.Category,
        )}
      </SubContainer>

      <BottomMarginView />
      <Divider />
      <ButtonsContainer>
        <LSButton
          title={'Clear Filters'}
          size={Size.Medium}
          type={Type.Grey}
          onPress={() => console.log('DONE')}
        />
        <LSButton
          title={'Done'}
          size={Size.Medium}
          type={Type.Primary}
          onPress={() => handleSubmitFilters(dispatch, navigation, filters)}
        />
      </ButtonsContainer>

    </Container>
  );
};

export default FiltersScreen;
