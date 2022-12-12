/***
  LootSwap - Home Filters SCREEN
 ***/

import React, {FC, useEffect, useState} from 'react';
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
  AnimationStyle,
  PressableStyle,
} from './homeFiltersStyles';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {FILTER_TYPE} from 'custom_types';
import {Pressable, Animated} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ResetHomeFilter, UpdateHomeFilter} from '../../redux/modules';
import {FilterProps} from '../../redux/modules/home/reducer';
import {useCardAnimation} from '@react-navigation/stack';
import {useClearRefinements} from 'react-instantsearch-hooks';
import {useFilterData} from '../../utility/customHooks/useFilterData';
import {configureFilterData} from '../../utility/utility';

export const HomeFiltersScreen: FC<{}> = props => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const home: FilterProps = useSelector(state => state.home);
  const {current} = useCardAnimation();
  const dispatch = useDispatch();
  const {filterData, hasData} = useFilterData(props);
  const [appliedFilters, setAppliedFilters] = useState(
    configureFilterData([...filterData]),
  );
  const [filterConfigured, setFilterConfigured] = useState(false);
  useEffect(() => {
    if (hasData && !filterConfigured) {
      setFilterConfigured(true);
      setAppliedFilters(configureFilterData([...filterData]));
    }
  }, [hasData, filterData, filterConfigured]);

  const {canRefine: canClear, refine: clearFilterData} = useClearRefinements();

  const onResetFilterPress = () => {
    dispatch(ResetHomeFilter());
    if (canClear) {
      clearFilterData();
    }
    navigation.goBack();
  };
  const onApplyFilterPress = () => {
    const _filtersData = [...appliedFilters];
    _filtersData.map(category => {
      let isAnySelected = false;
      category?.data?.map(filter => {
        if (filter?.isRefined) {
          category.refineFunction(filter?.label);
        }
      });
      if (isAnySelected) {
        category?.refineFunction();
      }
    });
    navigation.goBack();
  };

  const onFilterPress = filter => {
    const _filter = [...appliedFilters];
    const newFilter = _filter.map(data => {
      let category = data;
      if (data?.id === filter?.parentId) {
        const _subcategory = data?.data?.map(subData => {
          if (subData?.label === filter?.label) {
            subData.isRefined = !subData.isRefined;
          }
          return subData;
        });
        category.data = _subcategory;
      }
      return category;
    });
    setAppliedFilters(newFilter);
  };
  const renderFilter = ({item}) => {
    return (
      <FilterButton
        onPress={() => onFilterPress(item)}
        isSelected={item?.isRefined}>
        <FilterButtonText isSelected={item?.isRefined}>
          {item?.label}
        </FilterButtonText>
      </FilterButton>
    );
  };
  const renderFilterItem = (filter: FILTER_TYPE) => {
    return (
      <EmptyView>
        <ListTitleText>{filter?.FilterTitle}</ListTitleText>
        <FlatList data={filter?.data} renderItem={renderFilter} />
      </EmptyView>
    );
  };
  return (
    <Container>
      <Pressable style={PressableStyle()} onPress={navigation.goBack} />
      {appliedFilters?.length > 0 && (
        <SubContainer>
          <Animated.View style={AnimationStyle(current)}>
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
          </Animated.View>
        </SubContainer>
      )}
    </Container>
  );
};

export default HomeFiltersScreen;
