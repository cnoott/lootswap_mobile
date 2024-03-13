/***
  LootSwap - CREATE PUBLIC OFFER
 ***/

import React, {FC, useState, useRef, useEffect} from 'react';
import {ProgressBar, SwiperComponent} from '../loot/styles';
import {LSStartTradeHeader} from '../../components/commonComponents/headers/startTradeHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {Container, ButtonContainer} from './styles';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useSelector, useDispatch} from 'react-redux';
import CreatePublicOfferStepOne from './createPublicOfferStepOne';
import CreatePublicOfferStepTwo from './createPublicOfferStepTwo';
import CreatePublicOfferStepThree from './createPublicOfferStepThree';
import CreatePublicOfferReview from './createPublicOfferReview';
import {getMyDetailsNoLoadRequest} from '../../redux/modules';
import {Alert} from 'custom_top_alert';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const NUMBER_OF_STEPS = 4;

export const CreatePublicOfferScreen: FC<any> = ({route}) => {
  const {preselectedStockxItem = {}, skipFirstScreen = false} =
    route?.params || {};
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const dispatch = useDispatch();
  const navigation: NavigationProp<any, any> = useNavigation();

  const [myItems, setMyItems] = useState(userData?.my_items);

  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(skipFirstScreen ? 1 : 0);
  const handleBack = () => {
    if (currPage === 0) {
      navigation.goBack();
    } else {
      swiperRef?.current?.scrollTo(currPage - 1);
    }
  };
  const handleNext = () => {
    if (canGoNext()) {
      if (currPage === 3) {
        navigation?.navigate('CreatePublicOfferCheckoutScreen', {
          publicOffersData: publicOffersData,
          myItems: myItems,
        });
      }
      swiperRef?.current?.scrollTo(currPage + 1);
    }
  };

  useEffect(() => {
    if (skipFirstScreen) {
      swiperRef?.current?.scrollTo(1);
    }
  }, []);

  useEffect(() => {
    dispatch(getMyDetailsNoLoadRequest(userData?._id));
  }, [dispatch, userData?._id]);

  const [publicOffersData, setPublicOffersData] = useState({
    receivingStockxProducts: skipFirstScreen ? [preselectedStockxItem] : [],
    sendingProductIds: [], //remove later because we use myItems to keep track of items
    receivingMoneyOffer: 0,
    sendingMoneyOffer: 0,
  });
  const {
    receivingStockxProducts,
    sendingProductIds,
    receivingMoneyOffer,
    sendingMoneyOffer,
  } = publicOffersData;
  const [query, setQuery] = useState('');

  const canGoNext = () => {
    switch (currPage) {
      case 1:
        if (receivingMoneyOffer?.length === 0) {
          return false;
        }

        let allSizesFilled = true;
        for (let i in receivingStockxProducts) {
          if (typeof receivingStockxProducts[i].chosenSize === 'undefined') {
            allSizesFilled = false;
          }
        }
        return allSizesFilled;
      case 2:
        const mySelected = myItems.filter(_item => _item?.isSelected);
        if (mySelected.length === 0) {
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const headerTitle = () => {
    switch (currPage) {
      case 0:
      case 1:
        return 'Public Offers';
      case 2:
        return 'Your loot';
      case 3:
        return 'Review Offer';
    }
  };

  const renderTopView = () => (
    <>
      <LSStartTradeHeader
        title={headerTitle()}
        subText={
          (currPage === 0 || currPage === 1) &&
          'Select up to 3 items you want to trade for'
        }
        profilePicture={userData?.profile_picture}
        showPfp={headerTitle() === 'Your loot'}
        onBackPress={handleBack}
      />
      <ProgressBar progress={(currPage + 1) / NUMBER_OF_STEPS} />
    </>
  );

  const renderBottomButtonView = () =>
    (currPage !== 0 || receivingStockxProducts.length !== 0) && (
      <ButtonContainer>
        <LSButton
          title={'Next'}
          size={Size.Large}
          type={canGoNext() ? Type.Primary : Type.Grey}
          radius={20}
          onPress={handleNext}
        />
      </ButtonContainer>
    );

  const handleSelectSize = (urlKey: any, size: any) => {
    const newReceivingStockxProducts = JSON.parse(
      JSON.stringify(receivingStockxProducts),
    );

    const foundIndex = newReceivingStockxProducts.findIndex(
      product => product.urlKey === urlKey,
    );

    if (foundIndex !== -1) {
      newReceivingStockxProducts[foundIndex].chosenSize = size.value;
      setPublicOffersData(prevState => ({
        ...prevState,
        receivingStockxProducts: newReceivingStockxProducts,
      }));
    }
  };

  const handleDeleteProduct = (urlKey: string) => {
    const newReceivingStockxProducts = receivingStockxProducts.filter(
      product => product.urlKey !== urlKey,
    );
    setPublicOffersData(prevState => ({
      ...prevState,
      receivingStockxProducts: newReceivingStockxProducts,
    }));
    if (!newReceivingStockxProducts.length) {
      handleAddAnotherItem();
    }
  };

  const handleAddAnotherItem = () => {
    handleBack();
  };

  const renderSteps = () => {
    return [1, 2, 3, 4].map(data => {
      switch (data) {
        case 1:
          return (
            <CreatePublicOfferStepOne
              publicOffersData={publicOffersData}
              setPublicOffersData={setPublicOffersData}
              handleNext={handleNext}
            />
          );
        case 2:
          return (
            <CreatePublicOfferStepTwo
              receivingStockxProducts={receivingStockxProducts}
              handleAddAnotherItem={handleAddAnotherItem}
              handleSelectSize={handleSelectSize}
              handleDeleteProduct={handleDeleteProduct}
            />
          );
        case 3:
          return (
            <CreatePublicOfferStepThree
              myItems={myItems}
              setMyItems={setMyItems}
            />
          );
        case 4:
          return (
            <CreatePublicOfferReview
              myItems={myItems}
              setMyItems={setMyItems}
              publicOffersData={publicOffersData}
              setPublicOffersData={setPublicOffersData}
            />
          );
      }
    });
  };

  return (
    <Container>
      {renderTopView()}
      <SwiperComponent
        ref={swiperRef}
        onIndexChanged={setCurrPage}
        index={currPage}>
        {renderSteps()}
      </SwiperComponent>
      {renderBottomButtonView()}
    </Container>
  );
};

export default CreatePublicOfferScreen;
