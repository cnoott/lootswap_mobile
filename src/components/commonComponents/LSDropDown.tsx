import React, {FC, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  DropdownStyle,
  DropdownStyleSearch,
  PlaceholderStyle,
  SelectedTextStyle,
  InputSearchStyle,
  IconStyle,
  SelectedBorder,
} from './LSDropDownStyles';
import {SvgXml} from 'react-native-svg';
import {DROP_DOWN_ARROW} from 'localsvgimages';

interface LSLSDropDownProps {
  itemsList?: any;
  dropdownLabel?: string;
  isSearch?: boolean;
}

const LSDropDown: FC<LSLSDropDownProps> = React.memo(props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {dropdownLabel, itemsList = [], isSearch = false} = props;
  return (
    <Dropdown
      style={[
        isSearch ? DropdownStyleSearch : DropdownStyle,
        isFocus && SelectedBorder,
      ]}
      placeholderStyle={PlaceholderStyle}
      selectedTextStyle={SelectedTextStyle}
      inputSearchStyle={InputSearchStyle}
      iconStyle={IconStyle}
      data={itemsList}
      search={isSearch}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? dropdownLabel || 'Select item' : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item);
      }}
      renderRightIcon={() => <SvgXml xml={DROP_DOWN_ARROW} />}
    />
  );
});

export default LSDropDown;
