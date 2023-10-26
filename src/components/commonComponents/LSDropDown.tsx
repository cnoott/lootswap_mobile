import React, {FC, useState, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  DropdownStyle,
  PlaceholderStyle,
  SelectedTextStyle,
  InputSearchStyle,
  ItemContainerStyle,
  IconStyle,
  SelectedBorder,
  SearchIconContainer,
} from './LSDropDownStyles';
import {SvgXml} from 'react-native-svg';
import {DROP_DOWN_ARROW, SEARCH_INPUT_ICON} from 'localsvgimages';

interface LSLSDropDownProps {
  itemsList?: any;
  dropdownLabel?: string;
  isSearch?: boolean;
  onSelectItem?: Function;
  selectedValue?: any;
  disabled?: boolean;
  onFocus?: Function;
}

const LSDropDown: FC<LSLSDropDownProps> = React.memo(props => {
  const [value, setValue] = useState(props?.selectedValue || null);
  const [isFocus, setIsFocus] = useState(false);
  const {
    dropdownLabel,
    itemsList = [],
    isSearch = false,
    onSelectItem = () => {},
    disabled = false,
    onFocus = () => {},
  } = props;

  const handleOnFocus = () => {
    console.log('focusing');
    setIsFocus(true);
    onFocus();
  };

  useEffect(() => {
    setValue(props.selectedValue);
  }, [props.selectedValue]);
  return (
    <Dropdown
      style={[
        isSearch ? DropdownStyle : DropdownStyle,
        isFocus && SelectedBorder,
      ]}
      placeholderStyle={PlaceholderStyle}
      selectedTextStyle={SelectedTextStyle}
      inputSearchStyle={InputSearchStyle}
      containerStyle={ItemContainerStyle}
      iconStyle={IconStyle}
      fontFamily={'Urbanist'}
      data={itemsList}
      search={isSearch}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? dropdownLabel || 'Select item' : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => handleOnFocus()}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item);
        onSelectItem(item);
      }}
      renderRightIcon={() => <SvgXml xml={DROP_DOWN_ARROW} />}
      renderLeftIcon={() =>
        isSearch ? (
          <SearchIconContainer>
            <SvgXml xml={SEARCH_INPUT_ICON} />
          </SearchIconContainer>
        ) : null
      }
      autoScroll={false}
      disable={disabled}
    />
  );
});

export default LSDropDown;
