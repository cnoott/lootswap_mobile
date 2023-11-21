import React, {FC, useState} from 'react';
import {InStackHeader} from '../../components/commonComponents/headers/stackHeader';
import {SendMoneyOfferStepOne} from './startTrade/sendMoneyOfferStepOne';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {changeMoneyOffer, getTrade} from '../../redux/modules';
import {useDispatch} from 'react-redux';


export const EditMoneyOfferTradeScreen: FC<any> = ({route}) => {
  const {trade, userData} = route.params;
  const [moneyOffer, setMoneyOffer] = useState(trade.senderMoneyOffer);
  const navigation: NavigationProp<any, any> = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const reqData = {
      userId: userData?._id,
      tradeId: trade?._id,
      moneyOffer: moneyOffer,
    };

    dispatch(
      changeMoneyOffer(
        reqData,
        res => {
          dispatch(
            getTrade({
              userId: userData?._id,
              tradeId: trade?._id,
            }),
          );
          navigation.goBack();
        },
        error => {
          console.log(error);
        },
      ),
    );
  };

  return (
    <>
      <InStackHeader title="Edit Shipping Address" />
      <SendMoneyOfferStepOne
        item={trade.receiverItems[0]}
        moneyOffer={moneyOffer}
        setMoneyOffer={setMoneyOffer}
        handleMoneyOfferNext={handleSubmit}
      />
    </>
  );
};

export default EditMoneyOfferTradeScreen;
