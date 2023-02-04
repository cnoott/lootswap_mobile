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
} from './publicProfileStyles';
import {PROFILE_PLACEHOLDER_ICON} from 'localsvgimages';
import {scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import StarRatings from '../../components/starRatings';
import {LSTradeButton} from '../../components/commonComponents/LSTradeButton';
import TradeCheckoutItemCell from '../offers/offerItems/TradeCheckoutItemCell';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getPublicProfileFilters} from '../../utility/utility';

const dummyItem = [
  {
    brand: 'Puma',
    name: 'Puma XP500 ',
    condition: 'New with box',
    size: 'M',
  },
  {
    brand: 'Puma',
    name: 'Puma XP500 ',
    condition: 'New with box',
    size: 'M',
  },
];

export const PublicProfileScreen: FC<{}> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const [profileUrl, setProfileUrl] = useState('');
  const [selectedFilterId, setSelectedFilter] = useState(1);
  const {userData} = auth;
  const onFilterPress = (id: number) => {
    setSelectedFilter(id);
  };
  const goToRatingsScreen = () => {
    navigation?.navigate('screen');
    setProfileUrl('');
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
          {profileUrl ? (
            <Image source={{uri: userData?.profileUrl}} />
          ) : (
            <Image source={{uri: userData?.profile_picture}} />
          )}
        </ProfileUploadView>
      </ProfileContainerView>
    );
  };
  const renderRatingsView = () => (
    <RatingsContainer onPress={() => goToRatingsScreen()}>
      <StarRatings rating={4.9} starColor={'#FF5726'} />
      <RatingText>4.9</RatingText>
    </RatingsContainer>
  );
  const renderActivityView = () => (
    <ActivityContainer>
      <ActivityItem>
        <ActivityCount>03</ActivityCount>
        <ActivityName>Trades</ActivityName>
      </ActivityItem>
      <EmptyRowView>
        <FullHeightDivider />
        <ActivityItem>
          <ActivityCount>03</ActivityCount>
          <ActivityName>Transactions</ActivityName>
        </ActivityItem>
        <FullHeightDivider />
      </EmptyRowView>
      <ActivityItem>
        <ActivityCount>10</ActivityCount>
        <ActivityName>Items</ActivityName>
      </ActivityItem>
    </ActivityContainer>
  );
  const renderTopUserDetailsView = () => {
    return (
      <>
        {renderProfileView()}
        <UserNameText>{userData?.name}</UserNameText>
        <MemberTimeText>Member since 2022</MemberTimeText>
        {renderRatingsView()}
        {renderActivityView()}
      </>
    );
  };
  const renderItemsView = () => {
    return (
      <>
        <TitleText>{'10'} Items Available </TitleText>
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
          data={dummyItem}
          renderItem={({item}) => <TradeCheckoutItemCell itemData={item} />}
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
