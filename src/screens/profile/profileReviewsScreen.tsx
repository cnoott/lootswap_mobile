/***
LootSwap - PROFILE REVIEWS SCREEN
***/

import React, {FC, useState} from 'react';
import {LSStackHeaderWithSearch} from '../../components/commonComponents/headers/stackHeaderWithSearch';
import {
  Container,
  SubContainer,
  BottomView,
  EmptyScrollView,
  ItemsListView,
} from './publicProfileStyles';
import {LSTradeButton} from '../../components/commonComponents/LSTradeButton';
import RatingComponent from '../../components/profile/ratingComponent';
import {getProfileReviewsFilters} from '../../utility/utility';

export const ProfileReviewsScreen: FC<{}> = () => {
  const [selectedFilterId, setSelectedFilter] = useState(1);
  const onFilterPress = (filterId: any) => {
    setSelectedFilter(filterId);
  };
  const renderFilterButtons = () => (
    <>
      <EmptyScrollView>
        {getProfileReviewsFilters().map(data => {
          return (
            <LSTradeButton
              label={data?.label}
              isSelected={data?.id === selectedFilterId}
              onButtonPress={() => onFilterPress(data?.id)}
            />
          );
        })}
      </EmptyScrollView>
    </>
  );
  return (
    <Container>
      <LSStackHeaderWithSearch title={'4.8 (5,775 reviews)'} />
      <SubContainer>
        {renderFilterButtons()}
        <ItemsListView
          data={[1, 2, 3, 4]}
          renderItem={({item}) => <RatingComponent ratingData={item} />}
        />
        <BottomView />
      </SubContainer>
    </Container>
  );
};

export default ProfileReviewsScreen;
