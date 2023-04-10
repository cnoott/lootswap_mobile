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



export const ProfileReviewsScreen: FC<{}> = ({route}) => {
  const {requestedUserDetails: {ratings}} = route?.params;
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
      <LSStackHeaderWithSearch
        title={`${(ratings.reduce((total, next) => total += next.rating, 0) / ratings.length).toFixed(2)} Rating Average`}
      />
      <SubContainer>
        <ItemsListView
          data={ratings}
          renderItem={({item}) => <RatingComponent ratingData={item} />}
        />
        <BottomView />
      </SubContainer>
    </Container>
  );
};

export default ProfileReviewsScreen;
