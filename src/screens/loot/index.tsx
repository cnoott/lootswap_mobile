/***
LootSwap - LOOT LIST SCREEN
***/

import React, {FC, useRef, useState, useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import AddProductStepOne from './addProduct/addProductStepOne';
import AddProductStepTwo from './addProduct/addProductStepTwo';
import AddProductStepThree from './addProduct/addProductStepThree';
import LSButton from '../../components/commonComponents/LSButton';
import {SvgXml} from 'react-native-svg';
import {
  Container,
  Innercontainer,
  SwiperComponent,
  EmptyView,
  TopViewContainer,
  ProductTypeText,
  StepText,
  CurrentStepText,
  ProgressBar,
  ButtonContainer,
  TopMargin,
  TopMinMargin,
  PayPalSubContainer,
  TopMaxMargin,
} from './styles';
import {Size, Type} from '../../enums';
import {LSModal} from '../../components/commonComponents/LSModal';
import {PAY_PAL_IMAGE, LINK_PAYPAL_TEXT} from 'localsvgimages';
import {getAddProductTitle} from '../../utility/utility';

export const LootScreen: FC<{}> = () => {
  const swiperRef = useRef<any>(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [isPayPalModalVisible, setPayPalModalVisible] = useState(false);
  const handleNext = useCallback(() => {
    // setPayPalModalVisible(true);
    swiperRef?.current?.scrollTo(currIndex + 1);
  }, [currIndex]);
  const handleBack = useCallback(() => {
    if (currIndex !== 0) {
      swiperRef?.current?.scrollTo(currIndex - 1);
    }
  }, [currIndex]);
  const handleLinkPayPal = () => {
    setPayPalModalVisible(false);
  };
  const handleCancelPayPalModal = () => {
    setPayPalModalVisible(false);
  };
  const renderTopView = () => {
    return (
      <EmptyView>
        <TopViewContainer>
          <ProductTypeText>{getAddProductTitle(currIndex + 1)}</ProductTypeText>
          <StepText>
            Step <CurrentStepText>{currIndex + 1}</CurrentStepText>/5
          </StepText>
        </TopViewContainer>
        <ProgressBar progress={(currIndex + 1) / 5} />
      </EmptyView>
    );
  };
  const renderPayPalModalView = () => {
    return (
      <LSModal isVisible={isPayPalModalVisible}>
        <LSModal.Container>
          <PayPalSubContainer>
            <TopMargin />
            <SvgXml xml={PAY_PAL_IMAGE} />
            <TopMargin />
            <SvgXml xml={LINK_PAYPAL_TEXT} />
            <TopMaxMargin />
            <LSButton
              title={'Link PayPal account'}
              size={Size.Fit_To_Width}
              type={Type.Primary}
              radius={20}
              onPress={handleLinkPayPal}
            />
            <TopMinMargin />
            <LSButton
              title={'Cancel'}
              size={Size.Fit_To_Width}
              type={Type.Grey}
              radius={20}
              onPress={handleCancelPayPalModal}
            />
          </PayPalSubContainer>
        </LSModal.Container>
      </LSModal>
    );
  };
  const renderBottomButtonView = () => {
    return (
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
  };
  return (
    <Container>
      <InStackHeader back={false} title={'Add Product'} centerAligned={false} />
      {renderTopView()}
      <KeyboardAwareScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Innercontainer}
        keyboardShouldPersistTaps={'handled'}>
        <SwiperComponent ref={swiperRef} onIndexChanged={setCurrIndex}>
          <AddProductStepOne />
          <AddProductStepTwo />
          <AddProductStepThree />
        </SwiperComponent>
      </KeyboardAwareScrollView>
      {renderBottomButtonView()}
      {renderPayPalModalView()}
    </Container>
  );
};

export default LootScreen;
