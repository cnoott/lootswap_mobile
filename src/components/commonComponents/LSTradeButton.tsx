import React from 'react';
import {TradeButton, TradeButtonText} from './LSTradeButtonStyle';

type LSTradeButtonProps = {
  label: string;
  isSelected?: boolean;
  onButtonPress?: Function;
  paddingX?: number;
  paddingY?: number;
};

export const LSTradeButton = ({
  label = '',
  isSelected = false,
  onButtonPress = () => {},
  paddingX = 15,
  paddingY = 8,
}: LSTradeButtonProps) => {
  return (
    <TradeButton
      selected={isSelected}
      onPress={() => onButtonPress(label)}
      paddingX={paddingX}
      paddingY={paddingY}>
      <TradeButtonText selected={isSelected}>{label}</TradeButtonText>
    </TradeButton>
  );
};
