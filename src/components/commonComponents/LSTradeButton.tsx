import React from 'react';
import {TradeButton, TradeButtonText} from './LSTradeButtonStyle';

type LSTradeButtonProps = {
  label: string;
  isSelected?: boolean;
  onButtonPress?: Function;
};

export const LSTradeButton = ({
  label = '',
  isSelected = false,
  onButtonPress = () => {},
}: LSTradeButtonProps) => {
  return (
    <TradeButton selected={isSelected} onPress={() => onButtonPress(label)}>
      <TradeButtonText selected={isSelected}>{label}</TradeButtonText>
    </TradeButton>
  );
};
