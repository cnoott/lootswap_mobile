/***
LootSwap - LOOT LIST SCREEN
***/

import React, {FC, useRef, useState, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import AddProductStepOne from './addProduct/addProductStepOne';
import AddProductStepTwo from './addProduct/addProductStepTwo';
import AddProductStepThree from './addProduct/addProductStepThree';
import AddProductStepFour from './addProduct/addProductStepFour';
import AddProductStepFive from './addProduct/addProductStepFive';
import LSButton from '../../components/commonComponents/LSButton';
import {SvgXml} from 'react-native-svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
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
import {HomeProps} from '../../redux/modules/home/reducer';
import {UpdateAddProductData} from '../../redux/modules';
import {ADD_PRODUCT_TYPE} from 'custom_types';

export const LootScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const homeData: HomeProps = useSelector(state => state?.home);
  const swiperRef = useRef<any>(null);
  const [isPayPalModalVisible, setPayPalModalVisible] = useState(false);
  const {addProductData} = homeData;
  const {
    isFromEdit = false,
    editIndex = null,
    isLootEdit = false,
  } = route?.params || {};
  const [currIndex, setCurrIndex] = useState(
    isFromEdit && editIndex ? editIndex - 1 : 0,
  );
  console.log('addProductData ===', addProductData);
  const updateProductData = (proData: ADD_PRODUCT_TYPE) => {
    dispatch(UpdateAddProductData(proData));
  };
  const handleDone = () => {
    if (isLootEdit) {
      navigation.goBack();
    } // Navigating again to AddProductOverviewScreen
    else {
      navigation.navigate('AddProductOverviewScreen');
    }
  };
  const handleNext = useCallback(() => {
    // setPayPalModalVisible(true);
    Keyboard.dismiss();
    if (currIndex === 4) {
      navigation.navigate('AddProductOverviewScreen');
    }
    swiperRef?.current?.scrollTo(currIndex + 1);
  }, [currIndex, navigation]);
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
    if (isFromEdit) {
      return (
        <ButtonContainer>
          <LSButton
            title={'Done'}
            size={Size.Fit_To_Width}
            type={Type.Primary}
            radius={20}
            onPress={handleDone}
          />
        </ButtonContainer>
      );
    }
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
  const renderSteps = () => {
    if (!isFromEdit) {
      return [1, 2, 3, 4, 5].map(data => {
        switch (data) {
          case 1:
            return <AddProductStepOne updateProductData={updateProductData} />;
          case 2:
            return <AddProductStepTwo updateProductData={updateProductData} />;
          case 3:
            return (
              <AddProductStepThree updateProductData={updateProductData} />
            );
          case 4:
            return <AddProductStepFour updateProductData={updateProductData} />;
          case 5:
            return <AddProductStepFive updateProductData={updateProductData} />;
          default:
            break;
        }
      });
    } else {
      switch (editIndex) {
        case 1:
          return <AddProductStepOne updateProductData={updateProductData} />;
        case 2:
          return <AddProductStepTwo updateProductData={updateProductData} />;
        case 3:
          return <AddProductStepThree updateProductData={updateProductData} />;
        case 4:
          return <AddProductStepFour updateProductData={updateProductData} />;
        case 5:
          return <AddProductStepFive updateProductData={updateProductData} />;
        default:
          return <AddProductStepOne updateProductData={updateProductData} />;
      }
    }
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
          {renderSteps()}
        </SwiperComponent>
      </KeyboardAwareScrollView>
      {renderBottomButtonView()}
      {renderPayPalModalView()}
    </Container>
  );
};

export default LootScreen;
