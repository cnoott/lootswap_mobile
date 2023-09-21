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
} from './filtersScreenStyles'
import {
  categoryList,
} from '../../utility/utility';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategoryFilter, filterProductsRequest} from '../../redux/modules';
import {SearchProps} from '../../redux/modules/search/reducer';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';



export const FiltersScreen: FC<any> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const dispatch = useDispatch();
  const filters: SearchProps = useSelector(state => state.search);

  const onSetFilter = (filter: string) => { //MAKE GENERAL WITH SWITCH STATEMENT
    dispatch(selectCategoryFilter(filter));
  };

  const filterIsSelected = (value: string) => {
    let foundValue = false;
    for (let key in filters) {
      if (Array.isArray(filters[key]) && filters[key].includes(value)) {
        foundValue = true;
      }
    }
    return foundValue;
  };

  const handleSubmitFilters = () => {
    //Check if filters are empty
    dispatch(filterProductsRequest(filters));
    navigation?.goBack();
  };

  const renderFilter = ({item}: any) => {
    return (
      <FilterButton
        onPress={() => onSetFilter(item.value)}
        isSelected={filterIsSelected(item.value)}
        key={item.value}
        horizontalPadding={4}>
        <FilterButtonText isSelected={filterIsSelected(item.value)}>
          {item.label}
        </FilterButtonText>
      </FilterButton>
    );
  };

  const renderProductType = (data: Array<any>, title: string) => {
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

  const renderProductTypes = (type: string) => {
    return renderProductTypes(categoryList, 'Category');
    switch (type) {
      case 'category':
        return renderProductType(categoryList, 'Category');
    }
  };

  return (
    <Container>
      <InStackHeader title={'Filters'} onBackCall={() => navigation.goBack()} />
      <SubContainer>
        {renderProductType(categoryList, 'Category')}
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
          onPress={() => handleSubmitFilters()}
        />
      </ButtonsContainer>

    </Container>
  );
};

export default FiltersScreen;
