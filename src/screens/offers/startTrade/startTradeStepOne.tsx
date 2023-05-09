import React, {FC} from 'react';
import {
  SelectedLootText,
  SelectLootText,
} from './styles';

export const StartTradeStepOne: FC<any> = props => {

  return (
    <>
      <SelectLootText> Select Loot (30) </SelectLootText>
      <SelectedLootText>2/3 Items selected</SelectedLootText>
    </>
  );
};

export default StartTradeStepOne;
