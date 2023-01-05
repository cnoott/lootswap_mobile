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

interface TradeOfferItemProp {
  subItem?: any;
}

export const TradeOfferItem: FC<TradeOfferItemProp> = props => {
  const {subItem} = props;
  const renderSingleView = () => {
    const senderItemPhoto = subItem?.senderItems[0]?.primary_photo;
    return (
      <ImageContainer>
        <Image source={{uri: senderItemPhoto}} />
      </ImageContainer>
    );
  };
  const renderSingleViewWithOffer = () => {
    const senderItemPhoto = subItem?.senderItems[0]?.primary_photo;
    return (
      <OfferItemContainerCenter itemsCenter={true}>
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
        <ImageContainer size={_size}>
          <Image source={{uri: senderItemLeftPhoto}} size={_size} />
        </ImageContainer>
        {isOffer && (
          <DoubleViewOffer>
            <OfferText>${subItem.senderMoneyOffer}</OfferText>
          </DoubleViewOffer>
        )}
        <ImageContainerDouble size={_size}>
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
    const trippleViewItem = ({item, index}: any) => {
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
    switch (true) {
      case subItem?.senderItems?.length === 1 && subItem?.senderMoneyOffer > 0:
        return renderSingleViewWithOffer();
      case subItem?.senderItems?.length === 1:
        return renderSingleView();
      case subItem?.senderItems?.length === 2 && subItem?.senderMoneyOffer > 0:
        return renderDoubleView(true);
      case subItem?.senderItems?.length === 2:
        return renderDoubleView();
      case subItem?.senderItems?.length === 3 && subItem?.senderMoneyOffer > 0:
        return renderTrippleView(true);
      case subItem?.senderItems?.length === 3:
        return renderTrippleView();

      default:
        return renderSingleView();
    }
  };
  return <>{renderSubItems()}</>;
};

export default TradeOfferItem;
