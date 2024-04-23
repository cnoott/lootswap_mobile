import React, {FC} from 'react';
import {SelectedLootText, SelectLootText, FlatList} from './styles';
import StartTradeItemCell from '../../../components/startTrade/startTradeItemCell';
import EmptyListView from '../../../components/commonComponents/EmptyListView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Alert} from 'custom_top_alert';

interface StartTradeStepTwo {
  myItems: any;
  setMyItems: Function;
}

export const StartTradeStepTwo: FC<StartTradeStepTwo> = props => {
  const {myItems, setMyItems} = props;
  const navigation: NavigationProp<any, any> = useNavigation();

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
        ListEmptyComponent={
          <EmptyListView
            title={'You have no items uploaded'}
            subtitle={'In order to send a trade offer you need to upload items'}
            buttonText={'Upload Item'}
            handleButtonPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
              navigation.navigate('List item', {
                screen: 'LootScreen',
              });
            }}
          />
        }
      />
    </>
  );
};

export default StartTradeStepTwo;
