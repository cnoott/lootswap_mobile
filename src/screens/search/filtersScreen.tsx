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
import {selectCategoryFilter, filterProductsRequest} from '../../redux/modules';
import {
  onSetFilter,
  filterIsSelected,
  handleSubmitFilters,
} from '../../utility/filtersUtility';
import {SearchProps} from '../../redux/modules/search/reducer';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';



export const FiltersScreen: FC<any> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const dispatch = useDispatch();
  const filters: SearchProps = useSelector(state => state.search);

  const renderFilter = ({item}: any) => {
    return (
      <FilterButton
        onPress={() => onSetFilter(dispatch, item.value)}
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
        <AnimatedCheckBox isChecked={true} selected={true} text="Tradeable"/>
        <AnimatedCheckBox isChecked={false} selected={false} text="For Purchase Only"/>
      </EmptyView>
    );
  };

  const renderProductCategory = (data: Array<any>, title: string) => {
    return (
      <EmptyView>
        <ListTitleText>{title}</ListTitleText>
        <HorizontalFlatList
          data={data}
          renderItem={renderFilter}
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
