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
  SingleMoneyOfferContainer,
  OfferTextSingleOffer,
} from '../styles';
import {offerCellOnPress} from '../../../utility/utility';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface TradeOfferItemProp {
  items: Array<any>;
  moneyOffer: Number;
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
  const {items, moneyOffer, isInTrade} = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const renderDefaultView = () => {
    return <ImageContainer />;
  };

  const renderSingleMoneyOfferView = () => {
    return (
      <SingleMoneyOfferContainer>
        <OfferTextSingleOffer>+${moneyOffer}</OfferTextSingleOffer>
      </SingleMoneyOfferContainer>
    );
  };

  const renderSingleView = () => {
    const itemPhoto = items[0]?.primary_photo;
    return (
      <ImageContainer>
        <Image source={{uri: itemPhoto}} />
      </ImageContainer>
    );
  };

  const renderSingleViewWithOffer = () => {
    const itemPhoto = items[0]?.primary_photo;
    return (
      <OfferItemContainerCenter itemsCenter={true}>
        <Image source={{uri: itemPhoto}} size={115} />
        <SingleViewOffer>
          <OfferText>+${moneyOffer}</OfferText>
        </SingleViewOffer>
      </OfferItemContainerCenter>
    );
  };
  const renderDoubleView = (isOffer: boolean = false) => {
    const _size = 70;
    const itemLeftPhoto = items[0]?.primary_photo;
    const itemRightPhoto = items[1]?.primary_photo;
    return (
      <OfferItemContainer>
        <ImageContainer size={_size}>
          <Image source={{uri: itemLeftPhoto}} size={_size} />
        </ImageContainer>
        {isOffer && (
          <DoubleViewOffer>
            <OfferText>${moneyOffer}</OfferText>
          </DoubleViewOffer>
        )}
        <ImageContainerDouble size={_size}>
          <Image source={{uri: itemRightPhoto}} size={_size} />
        </ImageContainerDouble>
      </OfferItemContainer>
    );
  };
  const renderTrippleView = (showMoneyOffer: boolean = false) => {
    const _size = 58;
    const photoArray = items.map((item: any) => {
      return item?.primary_photo;
    });
    // Adding one extra element to show money offer view at last
    if (showMoneyOffer) {
      photoArray.push('1');
    }

    const renderTrippleOffer = () => {
      return (
        <TrippleViewOffer size={_size}>
          <OfferText>+${moneyOffer}</OfferText>
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
    const length = items?.length;
    switch (true) {
      case length === 0:
        return renderSingleMoneyOfferView();
      case length === 1 && moneyOffer > 0:
        return renderSingleViewWithOffer();
      case length === 1:
        return renderSingleView();
      case length === 2 && moneyOffer > 0:
        return renderDoubleView(true);
      case length === 2:
        return renderDoubleView();
      case length === 3 && moneyOffer > 0:
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
