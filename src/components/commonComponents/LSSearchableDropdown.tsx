import React, {FC, useState} from 'react';
import {SearchableDropdownView} from './LSSearchableDropdownStyles';

interface LSSearchableDropdownProps {
  itemsList?: any;
  updateSelectedItems?: Function;
  placeHolder?: string;
  onItemPress?: Function;
}

const LSSearchableDropdown: FC<LSSearchableDropdownProps> = React.memo(
  props => {
    const [selectedItems, setSelectedItems] = useState([]);
    const {
      itemsList = [],
      updateSelectedItems = () => {},
      placeHolder = 'Search',
      onItemPress = () => {},
    } = props;
    return (
      <SearchableDropdownView
        onItemSelect={(item: any) => {
          onItemPress(item);
          const oldItems: any = selectedItems;
          oldItems.push(item);
          setSelectedItems(oldItems);
          updateSelectedItems(oldItems);
        }}
        items={itemsList}
        defaultIndex={0}
        resetValue={false}
        placeHolder={placeHolder}
      />
    );
  },
);

export default LSSearchableDropdown;
