import React, {FC} from 'react';
import LSInput from '../commonComponents/LSInput';
import {useTheme} from 'styled-components';
import {HOME_SEARCH_INPUT_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LSHomeScreenSearchProps {
  query?: String;
  setQuery?: Function;
  isFromHome?: Boolean;
  onSubmitSearch?: Function;
}

const LSHomeScreenSearch: FC<LSHomeScreenSearchProps> = React.memo(props => {
  const {
    query,
    setQuery = () => {},
    isFromHome = false,
    onSubmitSearch = () => {},
  } = props;
  const theme = useTheme();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const handleOnFocus = () => {
    if (isFromHome) {
      navigation?.navigate('Search');
    }
  };

  return (
    <LSInput
      value={query}
      onChangeText={setQuery}
      placeholder={'Search'}
      leftIcon={HOME_SEARCH_INPUT_ICON}
      homeSearch={true}
      inputBackColor={theme?.colors?.screenBg_light}
      onPressIn={() => handleOnFocus()}
      enterKeyHint={'search'}
      autoFocus={!isFromHome}
      onSubmitEditing={() => onSubmitSearch()}
    />
  );
});

export default LSHomeScreenSearch;
