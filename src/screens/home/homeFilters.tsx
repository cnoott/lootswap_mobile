/***
  LootSwap - Home Filters SCREEN
 ***/

import React from 'react';
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
  PressableStyle,
} from './homeFiltersStyles';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {FILTER_TYPE} from 'custom_types';
import {Pressable, Modal} from 'react-native';
// import {ResetHomeFilter, UpdateHomeFilter} from '../../redux/modules';
// import {useClearRefinements} from 'react-instantsearch-hooks';
import {useFilterData} from '../../utility/customHooks/useFilterData';
import {configureFilterData} from '../../utility/utility';

export const HomeFiltersScreen = props => {
  const {isModalOpen, onToggleModal} = props;
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

  const onApplyFilterPress = () => {
    onToggleModal();
  };

  const onFilterPress = filter => {
    const _filter = [...appliedFilters];
    _filter.map(data => {
      if (data?.id === filter?.parentId) {
        data.refineFunction(filter.value);
      }
    });
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
    <Modal transparent={true} animationType="slide" visible={isModalOpen}>
      <Container>
        <Pressable style={PressableStyle()} onPress={onToggleModal} />
        {appliedFilters?.length > 0 && (
          <SubContainer>
            <HorizontalBar />
            <HeadingText>Filter</HeadingText>
            <Divider />
            {appliedFilters.map(filter => {
              return renderFilterItem(filter);
            })}
            <ButtonsContainer>
              <LSButton
                title={'Done'}
                size={Size.Large}
                type={Type.Primary}
                onPress={onApplyFilterPress}
              />
            </ButtonsContainer>
          </SubContainer>
        )}
      </Container>
    </Modal>
  );
};

export default HomeFiltersScreen;
