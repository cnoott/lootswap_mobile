/***
LootSwap - ADD_PRODUCT STEP 4
***/

import React, {FC, useState} from 'react';
import LSInput from '../../../components/commonComponents/LSInput';
import {
  Container,
  HorizontalSpace,
  TradeOptionsText,
  TradeButton,
  TradeButtonText,
  Touchable,
  EmptyView,
} from './styles';
import {useSelector} from 'react-redux';
import {ADD_PRODUCT_TYPE} from 'custom_types';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepFour: FC<ProductStep> = props => {
  const addProductData: ADD_PRODUCT_TYPE = useSelector(
    state => state?.home?.addProductData,
  );
  const {stepFour} = addProductData;
  const [tradeDes, setTradeDes] = useState(stepFour?.tradeDescription || '');
  const {updateProductData} = props;
  const onChangeTrade = (index = 1) => {
    const newData = {
      isTradeAndSell: false,
      isTradeOnly: false,
      isSellOnly: false,
    };
    switch (index) {
      case 1:
        newData.isTradeAndSell = true;
        newData.isTradeOnly = false;
        newData.isSellOnly = false;
        break;
      case 2:
        newData.isTradeAndSell = false;
        newData.isTradeOnly = true;
        newData.isSellOnly = false;
        break;
      case 3:
        newData.isTradeAndSell = false;
        newData.isTradeOnly = false;
        newData.isSellOnly = true;
        break;
      default:
        break;
    }
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeOptions: {
          ...newData,
        },
      },
    });
  };
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeDescription: tradeDes,
      },
    });
  };
  const renderTradeButton = (
    label: string,
    isSelected: boolean,
    onPress: Function,
  ) => {
    return (
      <Touchable onPress={onPress}>
        <TradeButton selected={isSelected}>
          <TradeButtonText selected={isSelected}>{label}</TradeButtonText>
        </TradeButton>
      </Touchable>
    );
  };
  const renderTradeView = () => {
    return (
      <EmptyView>
        <TradeOptionsText>Trade Options</TradeOptionsText>
        {renderTradeButton(
          'Trade and Sell',
          stepFour?.tradeOptions?.isTradeAndSell,
          () => onChangeTrade(1),
        )}
        {renderTradeButton(
          'Trade Only',
          stepFour?.tradeOptions?.isTradeOnly,
          () => onChangeTrade(2),
        )}
        {renderTradeButton(
          'Sell Only',
          stepFour?.tradeOptions?.isSellOnly,
          () => onChangeTrade(3),
        )}
      </EmptyView>
    );
  };
  return (
    <Container>
      <HorizontalSpace>
        {renderTradeView()}
        <TradeOptionsText>
          Are there any particular items you wish to trade this item for?
        </TradeOptionsText>
      </HorizontalSpace>
      <LSInput
        onChangeText={setTradeDes}
        value={tradeDes}
        placeholder={'Description'}
        multiline={true}
        height={200}
        horizontalSpace={20}
        onBlurCall={onBlurCall}
      />
    </Container>
  );
};

export default AddProductStepFour;
