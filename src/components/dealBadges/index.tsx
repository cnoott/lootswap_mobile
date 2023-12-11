import React, {FC} from 'react';
import theme from '../../theme';
import {Deal_Type} from 'custom_enums';
import {Container, Text} from './styles';
import {GREAT_DEAL_ICON, FAIR_DEAL_ICON, BAD_DEAL_ICON} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';

interface DealBadgeProps {
  dealType: typeof Deal_Type;
  fromProductPage: Boolean;
}
export const DealBadge: FC<DealBadgeProps> = props => {
  const {dealType, fromProductPage} = props;

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
