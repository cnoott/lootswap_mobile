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
import CreatePublicOfferStepOne from './createPublicOfferStepOne';
import CreatePublicOfferStepTwo from './createPublicOfferStepTwo';

const NUMBER_OF_STEPS = 4;

export const CreatePublicOfferScreen: FC<any> = () => {
  const swiperRef = useRef<any>(null);
  const [currPage, setCurrPage] = useState(0);
  const handleBack = () => {
    swiperRef?.current?.scrollTo(currPage - 1);
  };
  const handleNext = () => {
    swiperRef?.current?.scrollTo(currPage + 1);
  };
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

  const handleSelectSize = (urlKey: any, size: any) => {
    console.log(urlKey, size);
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
    return [1, 2].map(data => {
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

      }
    });
  };

  return (
    <Container>
      {renderTopView()}
      <SwiperComponent ref={swiperRef} onIndexChanged={setCurrPage}>
        {renderSteps()}
      </SwiperComponent>
    </Container>
  );
};

export default CreatePublicOfferScreen;
