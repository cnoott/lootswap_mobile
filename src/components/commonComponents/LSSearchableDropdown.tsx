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
    const {
      itemsList = [],
      updateSelectedItems = () => {},
      placeHolder = 'Search',
      onItemPress = () => {},
    } = props;
    return (
      <SearchableDropdownView
        onItemSelect={onItemPress}
        items={itemsList}
        defaultIndex={0}
        resetValue={false}
        placeHolder={placeHolder}
      />
    );
  },
);

export default LSSearchableDropdown;
