/***
LootSwap - TRADE CHECKOUT SUCESS SCREEN
***/

import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Size, Type} from 'custom_enums';
import LSButton from '../../components/commonComponents/LSButton';

export const TradeCheckoutSucessScreen: FC<{}> = () => {
  //const {navigation, orderId} = props.route?.params;

  return (
    <View>
      <Text> Success! </Text>
      <LSButton
        title={'Go To order page'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={20}
        fitToWidth={'100%'}
      />
    </View>
  );
};

export default TradeCheckoutSucessScreen;
