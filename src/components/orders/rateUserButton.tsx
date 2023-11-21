import React, {FC} from 'react';
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from '../../enums';

interface RateUserButtonProps {
  isTradeOrder: boolean;
  isReceiver: boolean;
  isSeller: boolean;
  order: any;
  navigation: any;
}

export const RateUserButton: FC<RateUserButtonProps> = props => {
  const {isTradeOrder, isReceiver, isSeller, order, navigation} = props;

  if (isTradeOrder && isReceiver && order?.receiverHasRated) {
    return <></>;
  }
  if (isTradeOrder && !isReceiver && order?.senderHasRated) {
    return <></>;
  }
  if (!isTradeOrder && isSeller && order?.sellerHasRated) {
    return <></>;
  }
  if (!isTradeOrder && !isSeller && order?.buyerHasRated) {
    return <></>;
  }
  return (
    <LSButton
      title={'Rate User'}
      size={Size.ViewSmall}
      type={Type.View}
      onPress={() =>
        navigation.navigate('SubmitReviewScreen', {
          orderDetails: order,
          isTradeOrder: isTradeOrder,
        })
      }
    />
  );
};

export default RateUserButton;
