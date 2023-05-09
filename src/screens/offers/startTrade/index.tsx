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
import { current } from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {AuthProps} from '../../redux/modules/auth/reducer';


export const StartTradeScreen: FC<any> = ({route}) => {
  const {requestedUserDetails} = route?.params;
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const navigation: NavigationProp<any, any> = useNavigation();
  const swiperRef = useRef<any>(null);
  const [currIndex, setCurrIndex] = useState(0);

  const [header, setHeader] = useState({
    title: `${requestedUserDetails?.name}'s Loot`,
    profilePicture: requestedUserDetails?.profile_picture,
  });

  const renderTopView = () => (
    <>
      <LSStartTradeHeader
        title={header.title}
        profilePicture={header.profilePicture}
      />
      <ProgressBar progress={(currIndex + 1) / 3} />
    </>
  );

  const handleNext = () => {
    //TODO: handle overview screen
    if (currIndex +1 === 1) {
      setHeader({
        title: 'Your loot',
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

  const renderBottomButtonView = () => (
    <ButtonContainer>
      <LSButton
        title={'Back'}
        size={Size.Medium}
        type={Type.Grey}
        radius={20}
        onPress={handleBack}
      />
      <LSButton
        title={'Next'}
        size={Size.Medium}
        type={Type.Primary}
        radius={20}
        onPress={handleNext}
      />
    </ButtonContainer>
  );

  const renderSteps = () => {
    return [1, 2, 3].map(data => {
      switch (data) {
        case 1:
          return <StartTradeStepOne />
        case 2:
          return <StartTradeStepTwo />;
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
