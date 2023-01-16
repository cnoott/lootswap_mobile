import * as React from 'react';
import OrderUserDetailView from './orderUserDetailView';
import {
  PurchaseCellContainer,
  DetailsContainer,
  ImageContainer,
  Image,
  DetailsRightView,
  OrderTitle,
  OrderPrice,
} from './styles';

interface OrderPurchaseProps {
  item?: any;
  isSales?: boolean;
  onCellPress?: Function;
}

function OrderPurchaseCell(props: OrderPurchaseProps) {
  const {item, isSales = false, onCellPress = () => {}} = props;
  const renderImageView = () => {
    return (
      <ImageContainer>
        <Image
          source={{uri: item?.productId?.primary_photo}}
        />
      </ImageContainer>
    );
  };
  return (
    <PurchaseCellContainer onPress={() => onCellPress()}>
      <OrderUserDetailView item={item} isSales={isSales} />
      <DetailsContainer>
        {renderImageView()}
        <DetailsRightView>
          <OrderTitle>{item?.productId?.name}</OrderTitle>
          <OrderPrice>${item?.productId?.price}</OrderPrice>
        </DetailsRightView>
      </DetailsContainer>
    </PurchaseCellContainer>
  );
}

export default OrderPurchaseCell;
