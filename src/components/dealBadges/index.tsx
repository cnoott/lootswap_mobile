import React, {FC} from 'react';
import theme from '../../theme';
import {Deal_Type} from 'custom_enums';
import {Container, Text} from './styles';
import {GREAT_DEAL_ICON, FAIR_DEAL_ICON, BAD_DEAL_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';
import {findMarketDataFromSize} from '../../utility/utility';

interface DealBadgeProps {
  dealType: typeof Deal_Type;
  fromProductPage: Boolean;
  item: any;
}
export const DealBadge: FC<DealBadgeProps> = props => {
  const {dealType, fromProductPage, item} = props;

  // $501 - $800
  const upperRangeDealType = () => {
    const {lastSale} = findMarketDataFromSize(item, item.size);
    const itemPrice = parseFloat(item.price);
    const marketPrice = parseFloat(lastSale);

    if (itemPrice >= marketPrice + marketPrice + 0.1) {
      return Deal_Type.Bad;
    }

    if (
      itemPrice > marketPrice + marketPrice * 0.04 &&
      itemPrice <= marketPrice + marketPrice * 0.1
    ) {
      return Deal_Type.Fair;
    }

    if (itemPrice <= marketPrice + marketPrice * 0.4) {
      return Deal_Type.Great;
    }

    return Deal_Type.Fair;
  };

  // $200 - $500
  const getMidRangeDealType = () => {
    const {lastSale} = findMarketDataFromSize(item, item.size);
    const itemPrice = parseFloat(item.price);
    const marketPrice = parseFloat(lastSale);

    if (itemPrice > marketPrice + marketPrice + 0.15) {
      return Deal_Type.Bad;
    }

    if (
      itemPrice > marketPrice + marketPrice * 0.05 &&
      itemPrice <= marketPrice + marketPrice * 0.15
    ) {
      return Deal_Type.Fair;
    }

    if (itemPrice <= marketPrice + marketPrice * 0.05) {
      return Deal_Type.Great;
    }

    return Deal_Type.Fair;
  };

  // $1 - 199
  const lowerRangeDealType = () => {
    const {lastSale} = findMarketDataFromSize(item, item.size);
    const itemPrice = parseFloat(item.price);
    const marketPrice = parseFloat(lastSale);

    if (itemPrice > marketPrice + marketPrice + 0.2) {
      return Deal_Type.Bad;
    }

    if (
      itemPrice > marketPrice + marketPrice * 0.1 &&
      itemPrice <= marketPrice + marketPrice * 0.2
    ) {
      return Deal_Type.Fair;
    }

    if (itemPrice <= marketPrice + marketPrice * 0.1) {
      return Deal_Type.Great;
    }
  };

  const colorAndText = () => {
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
