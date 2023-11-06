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
import CellBadge from '../../components/offers/cellBadge';

interface OrderPurchaseProps {
  item?: any;
  isSales?: boolean;
  onCellPress?: Function;
  userData: any;
}

function OrderPurchaseCell(props: OrderPurchaseProps) {
  const {item, isSales = false, onCellPress = () => {}, userData} = props;
  const isBuyer = item?.buyerId?._id === userData?._id;
  const showNotifBadge =
    (isBuyer && item?.buyerNewNotif) || (!isBuyer && item?.sellerNewNotif);
  const renderImageView = () => {
    return (
      <ImageContainer>
        <Image source={{uri: item?.productId?.primary_photo}} />
      </ImageContainer>
    );
  };
  return (
    <PurchaseCellContainer onPress={() => onCellPress()}>
      <OrderUserDetailView item={item} isSales={isSales} userData={userData} />
      {showNotifBadge && <CellBadge top={12} left={8}/>}
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
