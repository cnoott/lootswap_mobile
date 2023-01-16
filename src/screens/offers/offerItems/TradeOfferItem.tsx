/***
LootSwap - TRADE OFFER ITEM
***/

import React, {FC} from 'react';
import {
  ImageContainer,
  ImageContainerDouble,
  OfferItemContainer,
  OfferItemContainerCenter,
  Image,
  SingleViewOffer,
  DoubleViewOffer,
  OfferText,
  OfferItemList,
  TrippleViewOffer,
} from '../styles';
import {offerCellOnPress} from '../../../utility/utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface TradeOfferItemProp {
  subItem?: any;
  isInTrade?: boolean;
}

export interface ListRenderItemInfo {
  item: any;
  index: number;
  separators?: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  };
}

export const TradeOfferItem: FC<TradeOfferItemProp> = props => {
  const {subItem, isInTrade} = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const renderDefaultView = () => {
    return <ImageContainer />;
  };

  const renderSingleView = () => {
    const senderItemPhoto = subItem?.senderItems[0]?.primary_photo;
    return (
      <ImageContainer
        onPress={() =>
          offerCellOnPress(
            subItem?.senderItems[0],
            subItem,
            isInTrade,
            navigation,
          )
        }>
        <Image source={{uri: senderItemPhoto}} />
      </ImageContainer>
    );
  };
  const renderSingleViewWithOffer = () => {
    const senderItemPhoto = subItem?.senderItems[0]?.primary_photo;
    return (
      <OfferItemContainerCenter
        itemsCenter={true}
        onPress={() =>
          offerCellOnPress(
            subItem?.senderItems[0],
            subItem,
            isInTrade,
            navigation,
          )
        }>
        <Image source={{uri: senderItemPhoto}} size={115} />
        <SingleViewOffer>
          <OfferText>+${subItem.senderMoneyOffer}</OfferText>
        </SingleViewOffer>
      </OfferItemContainerCenter>
    );
  };
  const renderDoubleView = (isOffer: boolean = false) => {
    const _size = 70;
    const senderItemLeftPhoto = subItem?.senderItems[0]?.primary_photo;
    const senderItemRightPhoto = subItem?.senderItems[1]?.primary_photo;
    return (
      <OfferItemContainer>
        <ImageContainer
          size={_size}
          onPress={() =>
            offerCellOnPress(
              subItem?.senderItems[0],
              subItem,
              isInTrade,
              navigation,
            )
          }>
          <Image source={{uri: senderItemLeftPhoto}} size={_size} />
        </ImageContainer>
        {isOffer && (
          <DoubleViewOffer>
            <OfferText>${subItem.senderMoneyOffer}</OfferText>
          </DoubleViewOffer>
        )}
        <ImageContainerDouble
          size={_size}
          onPress={() => {
            console.log('pressed');
            offerCellOnPress(
              subItem?.senderItems[1],
              subItem,
              isInTrade,
              navigation,
            );
          }}>
          <Image source={{uri: senderItemRightPhoto}} size={_size} />
        </ImageContainerDouble>
      </OfferItemContainer>
    );
  };
  const renderTrippleView = (showMoneyOffer: boolean = false) => {
    const _size = 58;
    const photoArray = subItem?.senderItems.map((item: any) => {
      return item?.primary_photo;
    });
    // Adding one extra element to show money offer view at last
    if (showMoneyOffer) {
      photoArray.push('1');
    }

    const renderTrippleOffer = () => {
      return (
        <TrippleViewOffer size={_size}>
          <OfferText>+${subItem?.senderMoneyOffer}</OfferText>
        </TrippleViewOffer>
      );
    };
    const trippleViewItem = ({item, index}: ListRenderItemInfo) => {
      const isFooter = index + 1 === photoArray?.length;
      if (isFooter && showMoneyOffer) {
        return renderTrippleOffer();
      }
      return (
        <ImageContainer size={_size}>
          <Image source={{uri: item}} size={_size} />
        </ImageContainer>
      );
    };
    return (
      <OfferItemContainer>
        <OfferItemList data={photoArray} renderItem={trippleViewItem} />
      </OfferItemContainer>
    );
  };
  const renderSubItems = () => {
    const length = subItem?.senderItems?.length;
    switch (true) {
      case length === 1 && subItem?.senderMoneyOffer > 0:
        return renderSingleViewWithOffer();
      case length == 1:
        return renderSingleView();
      case length === 2 && subItem?.senderMoneyOffer > 0:
        return renderDoubleView(true);
      case length === 2:
        return renderDoubleView();
      case length === 3 && subItem?.senderMoneyOffer > 0:
        return renderTrippleView(true);
      case length === 3:
        return renderTrippleView();
      default:
        return renderDefaultView();
    }
  };
  return <>{renderSubItems()}</>;
};

export default TradeOfferItem;
