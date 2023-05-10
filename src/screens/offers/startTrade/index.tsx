import React, {FC, useRef, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {LSStartTradeHeader} from '../../../components/commonComponents/headers/startTradeHeader';
import {
  Container,
  SelectLootText,
  SelectedLootText,
  ButtonContainer,
} from './styles';
import {ProgressBar, SwiperComponent} from '../../loot/styles';
import LSButton from '../../../components/commonComponents/LSButton';
import {Size, Type} from '../../../enums';
import {StartTradeStepOne} from './startTradeStepOne';
import {StartTradeStepTwo} from './startTradeStepTwo';
import {ReviewTrade} from './reviewTrade';
import { current } from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {Alert} from 'custom_top_alert';

export const StartTradeScreen: FC<any> = ({route}) => {
  const {requestedUserDetails} = route?.params;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();
  const swiperRef = useRef<any>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [otherUserItems, setOtherUserItems] = useState(
    requestedUserDetails.my_items
  );
  const [myItems, setMyItems] = useState(userData?.my_items);

  const [header, setHeader] = useState({
    title: `${requestedUserDetails?.name}'s Loot`,
    profilePicture: requestedUserDetails?.profile_picture,
  });

  const renderTopView = () => (
    <>
      <LSStartTradeHeader
        title={header.title}
        profilePicture={header.profilePicture}
        isReview={currIndex === 2}
      />
      <ProgressBar progress={(currIndex + 1) / 3} />
    </>
  );

  const handleNext = () => {
    if (!nextValidation()) {
      return;
    }
    if (currIndex + 1 === 1) {
      setHeader({
        title: 'Your loot',
        profilePicture: userData.profile_picture,
      });
    } else if (currIndex + 1 === 2) {
      setHeader({
        title: 'Review Offer',
        profilePicture: userData.profile_picture,
      });
    }
    swiperRef?.current?.scrollTo(currIndex + 1);

  };

  const handleBack = () => {
    if (currIndex - 1 === 0) {
      setHeader({
        title: `${requestedUserDetails?.name}'s Loot`,
        profilePicture: requestedUserDetails?.profile_picture,
      });
    }
    if (currIndex !== 0) {
      swiperRef?.current?.scrollTo(currIndex - 1);
    }
  };

  const nextValidation = () => {
    const otherUserSelected = otherUserItems.filter(_item => _item?.isSelected);
    const mySelected = myItems.filter(_item => _item?.isSelected);
    if (currIndex === 0 && otherUserSelected.length <= 0) {
      Alert.showError('Please select at least one item');
      return false;
    } else if (currIndex === 1 && mySelected.length <= 0) {
      Alert.showError('Please select at least one item');
      return false;
    }
    return true;
  };

  const renderBottomButtonView = () => {
    return (
      <ButtonContainer>
        {currIndex > 0 && (
          <LSButton
            title={'Back'}
            size={Size.Medium}
            type={Type.Grey}
            radius={20}
            onPress={handleBack}
          />
        )}
        <LSButton
          title={currIndex === 2 ? 'Checkout & Submit' : 'Next'}
          size={currIndex > 0 ? Size.Medium : Size.Large}
          type={Type.Primary}
          radius={20}
          onPress={handleNext}
        />
      </ButtonContainer>
    );
  };

  const renderSteps = () => {
    return [1, 2, 3].map(data => {
      switch (data) {
        case 1:
          return (
            <StartTradeStepOne
              otherUserItems={otherUserItems}
              setOtherUserItems={setOtherUserItems}
            />
          );
        case 2:
          return (
            <StartTradeStepTwo myItems={myItems} setMyItems={setMyItems} />
          );
        case 3:
          return (
            <ReviewTrade
              otherUserItems={otherUserItems}
              myItems={myItems}
              requestedUserDetails={requestedUserDetails}
            />
          );
      }
    });
  };

  return (
    <Container>
      {renderTopView()}
      <SwiperComponent ref={swiperRef} onIndexChanged={setCurrIndex}>
        {renderSteps()}
      </SwiperComponent>

      {renderBottomButtonView()}
    </Container>
  );
};

export default StartTradeScreen;
