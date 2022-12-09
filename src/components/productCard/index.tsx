import React, {FC} from 'react';
import {
  ItemContainer,
  Image,
  FreeShipingContainer,
  ShippingText,
  CellBottomView,
  BottomHeaderView,
  HeaderTextMain,
  EmptyRowView,
  HeaderDes,
} from './styles';

interface LSProductCardProps {
  onPress?: Function;
  item: any;
}

const LSProductCard: FC<LSProductCardProps> = React.memo(props => {
  const {onPress = () => {}, item} = props;

  return (
    <ItemContainer onPress={() => onPress()}>
      <Image source={{uri: item.primary_photo}} />
      <CellBottomView>
        <BottomHeaderView>
          <EmptyRowView>
            <HeaderTextMain>{item.brand}</HeaderTextMain>
          </EmptyRowView>
          <HeaderTextMain>${item.price}</HeaderTextMain>
        </BottomHeaderView>
        <HeaderDes>{item.name}</HeaderDes>
        <EmptyRowView>
          <HeaderTextMain>Size {item.size}</HeaderTextMain>
        </EmptyRowView>
      </CellBottomView>
      {item.who_pays === 'seller-pays' && (
        <FreeShipingContainer>
          <ShippingText>Free Shipping</ShippingText>
        </FreeShipingContainer>
      )}
    </ItemContainer>
  );
});

export default LSProductCard;
