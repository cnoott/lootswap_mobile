/***
LootSwap - CREATE PUBLIC OFFER
***/

import React, {FC, useState, useRef} from 'react';
import {ProgressBar, SwiperComponent} from '../loot/styles';
import {LSStartTradeHeader} from '../../components/commonComponents/headers/startTradeHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {
  Container,
  ButtonContainer,
} from './styles';

const NUMBER_OF_STEPS = 4;

export const CreatePublicOfferScreen: FC<any> = () => {
  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(0);
  const handleBack = () => {};
  const handleNext = () => {};

  const renderTopView = () => (
    <>
      <LSStartTradeHeader
        title={'Public Offers'}
        subText={'Select up to 3 items you want to trade for'}
        profilePicture={''}
        showPfp={false}
        onBackPress={handleBack}
      />
      <ProgressBar progress={(currPage + 1) / NUMBER_OF_STEPS} />
    </>
  );

  const renderBottomButtonView = () =>
    currPage !== 3 && (
      <ButtonContainer>
        <LSButton
          title={'Next'}
          size={Size.Large}
          type={Type.Primary}
          radius={20}
          onPress={handleNext}
        />
      </ButtonContainer>
    );

  const renderSteps = () => {
    return [1].map(data => {
      switch (data) {
        case 1:
          return <></>;
      }
    });
  };


  return (
    <Container>
      {renderTopView()}
    </Container>
  );
};

export default CreatePublicOfferScreen;
