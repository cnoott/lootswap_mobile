/***
LootSwap - PROFILE REVIEWS SCREEN
***/

import React, {FC, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
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
import {EmptyListContainer, NoOffersMessage} from '../offers/styles';

export const ProfileReviewsScreen: FC<{}> = ({route}) => {
  const {
    requestedUserDetails: {ratings},
  } = route?.params;
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
      {ratings.length === 0 ? (
        <InStackHeader title={'Ratings'} />
      ) : (
        <InStackHeader
          title={`${(
            ratings.reduce((total, next) => (total += next.rating), 0) /
            ratings.length
          ).toFixed(2)} Rating Average`}
        />
      )}
      <SubContainer>
        {ratings.length === 0 ? (
          <EmptyListContainer>
            <NoOffersMessage>No Ratings</NoOffersMessage>
          </EmptyListContainer>
        ) : (
          <ItemsListView
            data={ratings}
            renderItem={({item}) => <RatingComponent ratingData={item} />}
          />
        )}

        <BottomView />
      </SubContainer>
    </Container>
  );
};

export default ProfileReviewsScreen;
