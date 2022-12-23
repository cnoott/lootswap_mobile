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
import {HomeProps} from '../../../redux/modules/home/reducer';

interface ProductStep {
  updateProductData: Function;
}

export const AddProductStepFour: FC<ProductStep> = props => {
  const addProductData: HomeProps = useSelector(
    state => state?.home?.addProductData,
  );
  const [tradeDes, setTradeDes] = useState('');
  const {stepFour} = addProductData;
  const {updateProductData} = props;
  const onBlurCall = () => {
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeDescription: tradeDes,
      },
    });
  };
  const onButtonPress = (newData: any) => {
    updateProductData({
      ...addProductData,
      stepFour: {
        ...addProductData?.stepFour,
        tradeOptions: {
          ...addProductData?.stepFour?.tradeOptions,
          ...newData,
        },
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
          () =>
            onButtonPress({
              isTradeAndSell: !stepFour?.tradeOptions?.isTradeAndSell,
            }),
        )}
        {renderTradeButton(
          'Trade Only',
          stepFour?.tradeOptions?.isTradeOnly,
          () =>
            onButtonPress({isTradeOnly: !stepFour?.tradeOptions?.isTradeOnly}),
        )}
        {renderTradeButton(
          'Sell Only',
          stepFour?.tradeOptions?.isSellOnly,
          () =>
            onButtonPress({isSellOnly: !stepFour?.tradeOptions?.isSellOnly}),
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
