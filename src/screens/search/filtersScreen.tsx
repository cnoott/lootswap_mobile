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
} from './filtersScreenStyles'
import {
  categoryList,
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



export const FiltersScreen: FC<any> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const dispatch = useDispatch();
  const filters: SearchProps = useSelector(state => state.search);

  const renderFilter = ({item}: any, filterType: string) => {
    return (
      <FilterButton
        onPress={() => onSetFilter(dispatch, filterType, item.value)}
        isSelected={filterIsSelected(filters, item.value)}
        key={item.value}
        horizontalPadding={4}>
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

  const renderProductCategory = (data: Array<any>, title: string) => {
    return (
      <EmptyView>
        <ListTitleText>{title}</ListTitleText>
        <HorizontalFlatList
          data={data}
          renderItem={item => renderFilter(item, Filter_Type.Category)}
        />
      </EmptyView>
    );
  };

  return (
    <Container>
      <InStackHeader title={'Filters'} onBackCall={() => navigation.goBack()} />
      <SubContainer>
        {renderProductCategory(categoryList, 'Category')}
        {renderProductType()}
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
