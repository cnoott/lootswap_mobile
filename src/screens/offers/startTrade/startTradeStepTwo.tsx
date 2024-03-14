import React, {FC} from 'react';
import {SelectedLootText, SelectLootText, FlatList} from './styles';
import StartTradeItemCell from '../../../components/startTrade/startTradeItemCell';
import {Alert} from 'custom_top_alert';

interface StartTradeStepTwo {
  myItems: any;
  setMyItems: Function;
}

export const StartTradeStepTwo: FC<StartTradeStepTwo> = props => {
  const {myItems, setMyItems} = props;

  const onItemPress = (itemId: string) => {
    const offerItems = [...myItems];
    const alreadySelectedItems = offerItems?.filter(_fil => _fil?.isSelected);
    const foundItemIndex = offerItems?.findIndex(
      _item => _item?._id === itemId,
    );

    if (offerItems[foundItemIndex]?.isSelected) {
      offerItems[foundItemIndex].isSelected = false;
      setMyItems(offerItems);
      return;
    }
    if (alreadySelectedItems?.length >= 3) {
      Alert.showError('Already 3 items selected');
      return;
    }

    offerItems[foundItemIndex].isSelected = true;
    setMyItems(offerItems);
  };

  return (
    <>
      <SelectLootText> Select Loot ({myItems.length})</SelectLootText>
      <SelectedLootText>
        {myItems.filter(_item => _item?.isSelected).length}/3 Items
      </SelectedLootText>

      <FlatList
        data={myItems}
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

export default StartTradeStepTwo;
