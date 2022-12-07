/***
  LootSwap - Home Filters SCREEN
 ***/

import React, {FC, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Container,
  SubContainer,
  HorizontalBar,
  HeadingText,
  Divider,
  ListTitleText,
  FlatList,
  FilterButton,
  FilterButtonText,
  EmptyView,
  ButtonsContainer,
} from './homeFiltersStyles';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {FILTER_TYPE} from 'custom_types';
import {useSelector, useDispatch} from 'react-redux';
import {ResetHomeFilter, UpdateHomeFilter} from '../../redux/modules';
import {FilterProps} from '../../redux/modules/home/reducer';

export const HomeFilterScreen: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const home: FilterProps = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [appliedFilters, setAppliedFilters] = useState([
    ...home?.homeFilterData,
  ]);
  const onResetFilterPress = () => {
    dispatch(ResetHomeFilter());
    navigation.goBack();
  };
  const onApplyFilterPress = () => {
    dispatch(UpdateHomeFilter(appliedFilters));
    navigation.goBack();
  };
  const onFilterPress = filter => {
    const _filter = [...appliedFilters];
    const newFilter = _filter.map(data => {
      let category = data;
      if (data?.id === filter?.parentId) {
        const _subcategory = data?.list?.map(subData => {
          if (subData?.label === filter?.label) {
            subData.selected = !subData.selected;
          }
          return subData;
        });
        category.list = _subcategory;
      }
      return category;
    });
    setAppliedFilters(newFilter);
  };
  const renderFilter = ({item}) => {
    return (
      <FilterButton
        onPress={() => onFilterPress(item)}
        isSelected={item?.selected}>
        <FilterButtonText isSelected={item?.selected}>
          {item?.label}
        </FilterButtonText>
      </FilterButton>
    );
  };
  const renderFilterItem = (filter: FILTER_TYPE) => {
    return (
      <EmptyView>
        <ListTitleText>{filter?.filterLabel}</ListTitleText>
        <FlatList data={filter?.list} renderItem={renderFilter} />
      </EmptyView>
    );
  };
  return (
    <Container>
      <SubContainer>
        <HorizontalBar />
        <HeadingText>Filter</HeadingText>
        <Divider />
        {appliedFilters.map(filter => {
          return renderFilterItem(filter);
        })}
        <ButtonsContainer>
          <LSButton
            title={'Reset'}
            size={Size.Medium}
            type={Type.Secondary}
            onPress={onResetFilterPress}
          />
          <LSButton
            title={'Apply'}
            size={Size.Medium}
            type={Type.Primary}
            onPress={onApplyFilterPress}
          />
        </ButtonsContainer>
      </SubContainer>
    </Container>
  );
};

export default HomeFilterScreen;
