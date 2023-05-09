import React, {FC} from 'react';
import {
  SelectedLootText,
  SelectLootText,
} from './styles';

export const StartTradeStepTwo: FC<any> = props => {

  return (
    <>
      <SelectLootText> Select Loot TWO </SelectLootText>
      <SelectedLootText>2/3 Items selected</SelectedLootText>
    </>
  );
};

export default StartTradeStepTwo;

