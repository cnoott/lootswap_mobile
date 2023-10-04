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
import {scale, moderateScale} from 'react-native-size-matters';

interface TradeOfferItemProp {
  items: Array<any>;
  moneyOffer: Number;
  isInTrade?: boolean;
  isStockxItem?: boolean;
  isFromHome?: boolean;
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

const HOME_SIZE = 80;
const OFFERS_SIZE = 130;

export const TradeOfferItem: FC<TradeOfferItemProp> = props => {
  const {
    items,
    moneyOffer,
    isInTrade,
    isStockxItem = false,
    isFromHome = false,
  } = props;
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object
  const renderDefaultView = () => {
    return <ImageContainer />;
  };

  const getImageUri = (item: any) => {
    if (isStockxItem) {
      return item?.image;
    }
    return item?.primary_photo;
  };

  const renderSingleMoneyOfferView = () => {
    return (
      <SingleMoneyOfferContainer>
        <OfferTextSingleOffer>+${moneyOffer}</OfferTextSingleOffer>
      </SingleMoneyOfferContainer>
    );
  };

  const renderSingleView = () => {
    const itemPhoto = getImageUri(items[0]);
    return (
      <ImageContainer size={isFromHome ? HOME_SIZE : OFFERS_SIZE}>
        <Image
          isStockxItem={isStockxItem}
          isFromHome={isFromHome}
          source={{uri: itemPhoto}}
          size={isFromHome ? HOME_SIZE : OFFERS_SIZE}
        />
      </ImageContainer>
    );
  };

  const renderSingleViewWithOffer = () => {
    const itemPhoto = getImageUri(items[0]);
    return (
      <OfferItemContainerCenter
        itemsCenter={true}
        size={isFromHome ? HOME_SIZE : 115}
      >
        <Image
          source={{uri: itemPhoto}}
          size={isFromHome ? HOME_SIZE : 115}
          isStockxItem={isStockxItem}
        />
        <SingleViewOffer>
          <OfferText>+${moneyOffer}</OfferText>
        </SingleViewOffer>
      </OfferItemContainerCenter>
    );
  };
  const renderDoubleView = (isOffer: boolean = false) => {
    const _size = 70;
    const fromHomeSize = scale(45);
    const itemLeftPhoto = getImageUri(items[0]);
    const itemRightPhoto = getImageUri(items[1]);

    return (
      <OfferItemContainer size={moderateScale(90)}>
        <ImageContainer size={isFromHome ? fromHomeSize : _size}>
          <Image
            source={{uri: itemLeftPhoto}}
            size={isFromHome ? fromHomeSize : _size}
            isStockxItem={isStockxItem}
          />
        </ImageContainer>
        {isOffer && (
          <DoubleViewOffer>
            <OfferText>${moneyOffer}</OfferText>
          </DoubleViewOffer>
        )}
        <ImageContainerDouble size={isFromHome ? fromHomeSize : _size}>
          <Image
            source={{uri: itemRightPhoto}}
            size={isFromHome ? fromHomeSize : _size}
            isStockxItem={isStockxItem}
          />
        </ImageContainerDouble>
      </OfferItemContainer>
    );
  };
  const renderTrippleView = (showMoneyOffer: boolean = false) => {
    const _size = 58;
    const photoArray = items.map((item: any) => {
      return isStockxItem ? item?.image : item?.primary_photo;
    });
    // Adding one extra element to show money offer view at last
    if (showMoneyOffer) {
      photoArray.push('1');
    }

    const renderTrippleOffer = () => {
      return (
        <TrippleViewOffer size={isFromHome ? moderateScale(40) : _size}>
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
        <ImageContainer size={isFromHome ? moderateScale(40) : _size}>
          <Image
            source={{uri: item}}
            size={isFromHome ? moderateScale(40) : _size}
            isStockxItem={isStockxItem}
          />
        </ImageContainer>
      );
    };
    return (
      <OfferItemContainer size={moderateScale(90)}>
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
