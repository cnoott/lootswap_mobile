/***
LootSwap - LOOT LIST SCREEN
***/

import React, {FC, useRef, useState, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {AuthProps} from '../../redux/modules/auth/reducer';
import AddProductStepOne from './addProduct/addProductStepOne';
import AddProductStepTwo from './addProduct/addProductStepTwo';
import AddProductStepThree from './addProduct/addProductStepThree';
import AddProductStepFour from './addProduct/addProductStepFour';
import AddProductStepFive from './addProduct/addProductStepFive';
import LSButton from '../../components/commonComponents/LSButton';
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
} from './styles';
import {Size, Type} from '../../enums';
import {
  getAddProductTitle,
  validateCreateProductData,
} from '../../utility/utility';
import {HomeProps} from '../../redux/modules/home/reducer';
import {
  UpdateAddProductData,
  fetchMarketData,
  //getUsersDetailsRequest,
} from '../../redux/modules';
import {ADD_PRODUCT_TYPE} from 'custom_types';
import {Alert} from 'custom_top_alert';
import PayPalLinkModal from '../../components/paypalLinkModal';

export const LootScreen: FC<any> = ({route}) => {
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const dispatch = useDispatch();
  const homeData: HomeProps = useSelector(state => state?.home);
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const swiperRef = useRef<any>(null);
  const {addProductData} = homeData;
  const {
    isFromEdit = false,
    editIndex = null,
    isLootEdit = false,
  } = route?.params || {};

  const [currIndex, setCurrIndex] = useState(
    isFromEdit && editIndex ? editIndex - 1 : 0,
  );

  const [stockxLoading, setStockxLoading] = useState(false);

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
  const handleNext = useCallback(async () => {
    Keyboard.dismiss();
    const canGoNext = validateCreateProductData(currIndex + 1, addProductData);
    const fetchedMakretData = addProductData?.stepFive?.median;
    if (canGoNext) {
      if (currIndex === 0 && stockxLoading) {
        Alert.showError('Wait until search is done loading');
        return;
      }
      if (
        currIndex === 0 &&
        addProductData?.stepOne?.stockxUrlKey &&
        !fetchedMakretData
      ) {
        const reqData = {
          userId: userData?._id,
          stockxUrlKey: addProductData?.stepOne?.stockxUrlKey,
          name: addProductData?.stepOne?.productName,
        };

        dispatch(
          fetchMarketData(reqData, err => console.log('ERR fetching>', err)),
        );
      }
      if (
        currIndex === 3 &&
        addProductData?.stepFour?.tradeOptions?.isTradeOnly
      ) {
        navigation.navigate('AddProductOverviewScreen');
        return;
      }
      if (currIndex === 4) {
        navigation.navigate('AddProductOverviewScreen');
      }
      swiperRef?.current?.scrollTo(currIndex + 1);
    } else {
      console.log(currIndex);
      Alert.showError('Please fill all information');
    }
  }, [currIndex, addProductData, navigation, stockxLoading]);

  const handleBack = useCallback(() => {
    if (currIndex !== 0) {
      swiperRef?.current?.scrollTo(currIndex - 1);
      if (currIndex === 1) {
        updateProductData({
          ...addProductData,
          stepFive: {
            ...addProductData?.stepFive,
            median: undefined,
          }
        });
      }
    }
  }, [currIndex]);

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
            return (
              <AddProductStepOne
                updateProductData={updateProductData}
                stockxLoading={stockxLoading}
                setStockxLoading={setStockxLoading}
              />
          );
          case 2:
            return <AddProductStepTwo updateProductData={updateProductData} />
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
          return (
            <AddProductStepOne
              updateProductData={updateProductData}
              stockxLoading={stockxLoading}
              setStockxLoading={setStockxLoading}
            />
          );
        case 2:
          return <AddProductStepTwo updateProductData={updateProductData} />
        case 3:
          return <AddProductStepThree updateProductData={updateProductData} />;
        case 4:
          return <AddProductStepFour updateProductData={updateProductData} />;
        case 5:
          return <AddProductStepFive updateProductData={updateProductData} />;
        default:
          return (
            <AddProductStepOne
              updateProductData={updateProductData}
              stockxLoading={stockxLoading}
              setStockxLoading={setStockxLoading}
            />
          );

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
      <PayPalLinkModal />
    </Container>
  );
};
export default LootScreen;
