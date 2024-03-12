/***
LootSwap - PUBLIC PROFILE SCREEN
***/

import React, {FC, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {
  Container,
  SubContainer,
  ProfileContainerView,
  ProfileUploadView,
  Image,
  UserNameText,
  FullWidthDivider,
  BottomView,
  MemberTimeText,
  RatingsContainer,
  RatingText,
  ActivityContainer,
  ActivityItem,
  ActivityCount,
  ActivityName,
  FullHeightDivider,
  EmptyRowView,
  TitleText,
  EmptyScrollView,
  ItemsListView,
  ItemContainer,
} from './publicProfileStyles';
import {PROFILE_PLACEHOLDER_ICON} from 'localsvgimages';
import {scale} from 'react-native-size-matters';
import StarRatings from '../../components/starRatings';
import {LSTradeButton} from '../../components/commonComponents/LSTradeButton';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getPublicProfileFilters} from '../../utility/utility';

export const PublicProfileScreen: FC<{}> = ({route}) => {
  const {
    requestedUserDetails,
    requestedUserDetails: {ratings},
  } = route?.params;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [selectedFilterId, setSelectedFilter] = useState(1);

  const [showAll, setShowAll] = useState(true);
  const [filterItem, setFilterItem] = useState('trade-sell');

  const onFilterPress = (id: number) => {
    setSelectedFilter(id);
    switch (id) {
      case 1:
        setShowAll(true);
        break;
      case 2:
        setShowAll(false);
        setFilterItem('trade-sell');
        break;
      case 3:
        setShowAll(false);
        setFilterItem('sell-only');
        break;
      case 4:
        setShowAll(false);
        setFilterItem('trade-only');
        break;
    }
  };
  const goToRatingsScreen = () => {
    navigation?.navigate('ProfileReviewsScreen', {
      requestedUserDetails: requestedUserDetails,
    });
  };
  const renderProfileView = () => {
    return (
      <ProfileContainerView>
        <ProfileUploadView disabled={true}>
          <SvgXml
            xml={PROFILE_PLACEHOLDER_ICON}
            height={scale(100)}
            width={scale(100)}
          />
          <Image source={{uri: requestedUserDetails?.profile_picture}} />
        </ProfileUploadView>
      </ProfileContainerView>
    );
  };
  const renderRatingsView = () => (
    <RatingsContainer onPress={() => goToRatingsScreen()}>
      {requestedUserDetails?.ratings.length > 0 ? (
        <>
          <StarRatings
            rating={Math.floor(
              ratings.reduce((total, next) => (total += next.rating), 0) /
                ratings.length,
            )}
            starColor={'#FF5726'}
          />
          <RatingText>
            {(
              ratings.reduce((total, next) => (total += next.rating), 0) /
              ratings.length
            ).toFixed(2)}
          </RatingText>
        </>
      ) : (
        <ActivityName>No Ratings</ActivityName>
      )}
    </RatingsContainer>
  );
  const renderActivityView = () => (
    <ActivityContainer>
      <ActivityItem>
        <ActivityCount>{requestedUserDetails?.trades.length}</ActivityCount>
        <ActivityName>Trades</ActivityName>
      </ActivityItem>
      <EmptyRowView>
        <FullHeightDivider />
        <ActivityItem>
          <ActivityCount>
            {requestedUserDetails?.paypalOrders?.length}
          </ActivityCount>
          <ActivityName>Transactions</ActivityName>
        </ActivityItem>
        <FullHeightDivider />
      </EmptyRowView>
      <ActivityItem>
        <ActivityCount>
          {requestedUserDetails?.my_items.filter(item => item.isVisible).length}
        </ActivityCount>
        <ActivityName>Items</ActivityName>
      </ActivityItem>
    </ActivityContainer>
  );
  const renderTopUserDetailsView = () => {
    return (
      <>
        {renderProfileView()}
        <UserNameText>{requestedUserDetails?.name}</UserNameText>
        <MemberTimeText>
          Member since {new Date(requestedUserDetails.createdAt).getFullYear()}
        </MemberTimeText>
        {renderRatingsView()}
        {renderActivityView()}
      </>
    );
  };
  const renderTradeItem = (item: any) => (
    <ItemContainer
      onPress={() =>
        navigation?.push('ProductDetailsScreen', {
          productData: {...item, objectID: item._id},
        })
      }>
      <TradeCheckoutItemCell itemData={item} />
    </ItemContainer>
  );
  const renderItemsView = () => {
    return (
      <>
        <TitleText>Items Available</TitleText>
        <EmptyScrollView>
          {getPublicProfileFilters().map(data => {
            return (
              <LSTradeButton
                label={data?.label}
                isSelected={data?.id === selectedFilterId}
                onButtonPress={() => onFilterPress(data?.id)}
              />
            );
          })}
        </EmptyScrollView>
        <ItemsListView
          data={requestedUserDetails?.my_items.filter(
            item =>
              (showAll || item.type === filterItem) &&
              item.isVirtuallyVerified == true,
          )}
          renderItem={({item}) => renderTradeItem(item)}
        />
      </>
    );
  };
  return (
    <Container>
      <InStackHeader right={false} title={''} />
      <SubContainer>
        {renderTopUserDetailsView()}
        <FullWidthDivider />
        {renderItemsView()}
        <BottomView />
      </SubContainer>
    </Container>
  );
};

export default PublicProfileScreen;
