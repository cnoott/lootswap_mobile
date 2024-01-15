import React, {FC} from 'react';
import theme from '../../theme';
import {Deal_Type} from 'custom_enums';
import {Container, Text} from './styles';
import {GREAT_DEAL_ICON, FAIR_DEAL_ICON, BAD_DEAL_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {findMarketDataFromSize} from '../../utility/utility';

interface DealBadgeProps {
  fromProductPage: Boolean;
  item: any;
}
export const DealBadge: FC<DealBadgeProps> = props => {
  const {fromProductPage, item} = props;

  const getDealType = (
    itemPrice: number,
    marketPrice: number,
    upperThreshold: number,
    lowerThreshold: number,
  ) => {
    if (itemPrice > marketPrice + marketPrice * upperThreshold) {
      return Deal_Type.Bad;
    }

    if (
      itemPrice > marketPrice + marketPrice * lowerThreshold &&
      itemPrice <= marketPrice + marketPrice * upperThreshold
    ) {
      return Deal_Type.Fair;
    }

    if (itemPrice <= marketPrice + marketPrice * lowerThreshold) {
      return Deal_Type.Great;
    }

    return undefined;
  };

  const getDealRange = () => {
    const {lastSale} = findMarketDataFromSize(item.stockxId, item.size);
    console.log('LAST SALE', lastSale);
    //const lastSale = 200;
    const itemPrice = parseFloat(item.price);
    const marketPrice = parseFloat(lastSale);
    switch (true) {
      case marketPrice < 199:
        return getDealType(itemPrice, marketPrice, 0.2, 0.01);
      case marketPrice > 199 && marketPrice < 500:
        return getDealType(itemPrice, marketPrice, 0.15, 0.05);
      case marketPrice > 500:
        return getDealType(itemPrice, marketPrice, 0.1, 0.04);
    }
  };

  const colorAndText = () => {
    const dealType = getDealRange();
    switch (dealType) {
      case Deal_Type.Great:
        return {
          color: theme.colors.primary,
          text: fromProductPage ? 'Great Deal' : 'Great Trade',
        };
      case Deal_Type.Fair:
        return {
          color: theme.colors.successColor,
          text: fromProductPage ? 'Market Value' : 'Fair Trade',
        };
      case Deal_Type.Bad:
        return {
          color: theme.colors.errorColor,
          text: fromProductPage ? 'Over Market' : 'Bad Trade',
        };
    }
  };

  return (
    <Container color={colorAndText()?.color}>
      <SvgXml xml={GREAT_DEAL_ICON} />
      <Text>{colorAndText()?.text}</Text>
    </Container>
  );
};

export default DealBadge;
