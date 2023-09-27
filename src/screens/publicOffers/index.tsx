/***
  LootSwap - CREATE PUBLIC OFFER
 ***/

import React, {FC, useState, useRef, useEffect} from 'react';
import {ProgressBar, SwiperComponent} from '../loot/styles';
import {LSStartTradeHeader} from '../../components/commonComponents/headers/startTradeHeader';
import LSButton from '../../components/commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {
  Container,
  ButtonContainer,
} from './styles';
import {AuthProps} from '../../redux/modules/auth/reducer';
import {useSelector, useDispatch} from 'react-redux';
import CreatePublicOfferStepOne from './createPublicOfferStepOne';
import CreatePublicOfferStepTwo from './createPublicOfferStepTwo';
import CreatePublicOfferStepThree from './createPublicOfferStepThree';
import {getMyDetailsNoLoadRequest} from '../../redux/modules';
import {Alert} from 'custom_top_alert';

const NUMBER_OF_STEPS = 4;

export const CreatePublicOfferScreen: FC<any> = () => {
  const auth: AuthProps = useSelector(state => state.auth);
  const {userData} = auth;
  const dispatch = useDispatch();

  const [myItems, setMyItems] = useState(userData?.my_items);

  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(0);
  const handleBack = () => {
    swiperRef?.current?.scrollTo(currPage - 1);
  };
  const handleNext = () => {
    swiperRef?.current?.scrollTo(currPage + 1);
  };

  useEffect(() => {
    dispatch(getMyDetailsNoLoadRequest(userData?._id));
  }, [dispatch, userData?._id]);

  const [publicOffersData, setPublicOffersData] = useState({
    receivingStockxProducts: [],
    sendingProductIds: [],
    receivingMoneyOffer: null,
    sendingMoneyOffer: null,
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
          return false
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
    currPage !== 0 && (
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
      JSON.stringify(receivingStockxProducts)
    );

    const foundIndex = newReceivingStockxProducts.findIndex(product => product.urlKey === urlKey);

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
    setQuery('');
    handleBack();
  };

  const renderSteps = () => {
    return [1, 2, 3].map(data => {
      switch (data) {
        case 1:
          return (
            <CreatePublicOfferStepOne
              publicOffersData={publicOffersData}
              setPublicOffersData={setPublicOffersData}
              handleNext={handleNext}
              query={query}
              setQuery={setQuery}
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
      }
    });
  };

  return (
    <Container>
      {renderTopView()}
      <SwiperComponent ref={swiperRef} onIndexChanged={setCurrPage}>
        {renderSteps()}
      </SwiperComponent>
      {renderBottomButtonView()}
    </Container>
  );
};

export default CreatePublicOfferScreen;
