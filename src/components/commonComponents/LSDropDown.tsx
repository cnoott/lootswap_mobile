import React, {FC, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  DropdownStyle,
  PlaceholderStyle,
  SelectedTextStyle,
  InputSearchStyle,
  IconStyle,
  SelectedBorder,
  SearchIconContainer,
} from './LSDropDownStyles';
import {SvgXml} from 'react-native-svg';
import {DROP_DOWN_ARROW, SEARCH_DROPDOWN} from 'localsvgimages';

interface LSLSDropDownProps {
  itemsList?: any;
  dropdownLabel?: string;
  isSearch?: boolean;
  onSelectItem?: Function;
}

const LSDropDown: FC<LSLSDropDownProps> = React.memo(props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {
    dropdownLabel,
    itemsList = [],
    isSearch = false,
    onSelectItem = () => {},
  } = props;
  return (
    <Dropdown
      style={[
        isSearch ? DropdownStyle : DropdownStyle,
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
        onSelectItem(item);
      }}
      renderRightIcon={() => <SvgXml xml={DROP_DOWN_ARROW} />}
      renderLeftIcon={() =>
        isSearch ? (
          <SearchIconContainer>
            <SvgXml xml={SEARCH_DROPDOWN} />
          </SearchIconContainer>
        ) : null
      }
      autoScroll={false}
    />
  );
});

export default LSDropDown;
