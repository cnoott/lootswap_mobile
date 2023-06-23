import React, {FC, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {
  DropdownStyle,
  SelectedTextStyle,
  DropdownContainer,
  ItemTextStyle,
} from './chooseAlbumDropDownStyles';
import {DROP_DOWN_ARROW} from 'localsvgimages';
import {SvgXml} from 'react-native-svg';

interface ChooseAlbumDropdownProps {
  albumList: Array<any>;
  onSelectAlbum: Function;
  selectedAlbum: any;
}

const ChooseAlbumDropdown: FC<ChooseAlbumDropdownProps> = React.memo(props => {
  const [isFocus, setIsFocus] = useState(false);
  const {albumList, onSelectAlbum, selectedAlbum} = props;

  return (
    <Dropdown
      style={[DropdownStyle]}
      selectedTextStyle={SelectedTextStyle}
      placeholderStyle={SelectedTextStyle}
      itemTextStyle={ItemTextStyle}
      containerStyle={DropdownContainer}
      data={albumList}
      value={selectedAlbum.title}
      labelField={'title'}
      valueField={'title'}
      onChange={item => {
        onSelectAlbum(item);
        console.log('slect', item);
      }}
      maxHeight={300}
      renderRightIcon={() => <SvgXml xml={DROP_DOWN_ARROW} />}
    />
  );
});

export default ChooseAlbumDropdown;
