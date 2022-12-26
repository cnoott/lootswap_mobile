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
  subItem?: number;
}

export const TradeOfferItem: FC<TradeOfferItemProp> = props => {
  const {subItem = 1} = props;
  const renderSingleView = () => {
    return (
      <ImageContainer>
        <Image source={{uri: 'https://picsum.photos/200'}} />
      </ImageContainer>
    );
  };
  const renderSingleViewWithOffer = () => {
    return (
      <OfferItemContainerCenter itemsCenter={true}>
        <Image source={{uri: 'https://picsum.photos/200'}} size={115} />
        <SingleViewOffer>
          <OfferText>+$50</OfferText>
        </SingleViewOffer>
      </OfferItemContainerCenter>
    );
  };
  const renderDoubleView = (isOffer: boolean = false) => {
    const _size = 70;
    return (
      <OfferItemContainer>
        <ImageContainer size={_size}>
          <Image source={{uri: 'https://picsum.photos/200'}} size={_size} />
        </ImageContainer>
        {isOffer && (
          <DoubleViewOffer>
            <OfferText>+$50</OfferText>
          </DoubleViewOffer>
        )}
        <ImageContainerDouble size={_size}>
          <Image source={{uri: 'https://picsum.photos/200'}} size={_size} />
        </ImageContainerDouble>
      </OfferItemContainer>
    );
  };
  const renderTrippleView = () => {
    const _size = 60;
    const renderTrippleOffer = () => {
      return (
        <TrippleViewOffer size={_size}>
          <OfferText>+$50</OfferText>
        </TrippleViewOffer>
      );
    };
    const trippleViewItem = ({item}) => {
      if (item === 3) {
        return renderTrippleOffer();
      }
      return (
        <ImageContainer size={_size}>
          <Image source={{uri: 'https://picsum.photos/200'}} size={_size} />
        </ImageContainer>
      );
    };
    return (
      <OfferItemContainer>
        <OfferItemList
          data={[...new Array(4).keys()]}
          renderItem={trippleViewItem}
        />
      </OfferItemContainer>
    );
  };
  const renderSubItems = () => {
    switch (subItem) {
      case 0:
        return renderSingleView();
      case 1:
        return renderSingleViewWithOffer();
      case 2:
        return renderDoubleView();
      case 3:
        return renderDoubleView(true);
      case 4:
        return renderTrippleView();

      default:
        return renderSingleView();
    }
  };
  return <>{renderSubItems()}</>;
};

export default TradeOfferItem;
