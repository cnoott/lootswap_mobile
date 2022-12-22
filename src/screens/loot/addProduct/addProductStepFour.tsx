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

export const AddProductStepFour: FC<{}> = () => {
  const [tradeDes, setTradeDes] = useState('');
  const renderTradeButton = (label: string, isSelected: boolean) => {
    return (
      <Touchable>
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
        {renderTradeButton('Trade and Sell', false)}
        {renderTradeButton('Trade Only', true)}
        {renderTradeButton('Sell Only', false)}
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
      />
    </Container>
  );
};

export default AddProductStepFour;
