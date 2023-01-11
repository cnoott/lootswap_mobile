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
  item?: number;
  isSales?: boolean;
}

function OrderPurchaseCell(props: OrderPurchaseProps) {
  const {item, isSales = false} = props;
  const renderImageView = () => {
    return (
      <ImageContainer>
        <Image
          source={{uri: item?.primary_photo || 'https://picsum.photos/200'}}
        />
      </ImageContainer>
    );
  };
  return (
    <PurchaseCellContainer>
      <OrderUserDetailView item={item} isSales={isSales} />
      <DetailsContainer>
        {renderImageView()}
        <DetailsRightView>
          <OrderTitle>Puma XP500</OrderTitle>
          <OrderPrice>$30.00</OrderPrice>
        </DetailsRightView>
      </DetailsContainer>
    </PurchaseCellContainer>
  );
}

export default OrderPurchaseCell;
