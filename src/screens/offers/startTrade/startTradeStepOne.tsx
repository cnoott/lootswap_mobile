import React, {FC} from 'react';
import {SelectedLootText, SelectLootText, FlatList} from './styles';
import StartTradeItemCell from '../../../components/startTrade/startTradeItemCell';
import {Alert} from 'custom_top_alert';

interface StartTradeStepOneProps {
  otherUserItems: any;
  setOtherUserItems: Function;
}

export const StartTradeStepOne: FC<StartTradeStepOneProps> = props => {
  const {otherUserItems, setOtherUserItems} = props;

  const onItemPress = (itemId: string) => {
    const offerItems = [...otherUserItems];
    const alreadySelectedItems = offerItems?.filter(_fil => _fil?.isSelected);
    const foundItemIndex = offerItems?.findIndex(
      _item => _item?._id === itemId
    );

    if (offerItems[foundItemIndex]?.isSelected) {
      offerItems[foundItemIndex].isSelected = false;
      setOtherUserItems(offerItems);
      return;
    }
    if (alreadySelectedItems?.length >= 3) {
      Alert.showError('Already 3 items selected');
      return;
    }

    offerItems[foundItemIndex].isSelected = true;
    setOtherUserItems(offerItems);
  };

  return (
    <>
      <SelectLootText> Select Loot ({otherUserItems.length}) </SelectLootText>
      <SelectedLootText>
        {otherUserItems.filter(_item => _item?.isSelected).length}/3 Items 
      </SelectedLootText>

      <FlatList
        data={otherUserItems}
        renderItem={item => (
          <StartTradeItemCell
            onPress={() => onItemPress(item?.item?._id)}
            item={item.item}
          />
        )}
        contentInset={{bottom: 85}}
      />
    </>
  );
};

export default StartTradeStepOne;
