import React, {FC} from 'react';
import LSInput from '../commonComponents/LSInput';
import {useTheme} from 'styled-components';
import {HOME_SEARCH_INPUT_ICON, HOME_FILTER_ICON} from 'localsvgimages';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale} from 'react-native-size-matters';

interface LSHomeScreenSearchProps {
  query?: String;
  setQuery?: Function;
  isFromHome?: Boolean;
  onSubmitSearch?: Function;
  goBackToSearch?: Function;
  navigateToFilters?: Function;
}

const LSHomeScreenSearch: FC<LSHomeScreenSearchProps> = React.memo(props => {
  const {
    query,
    setQuery = () => {},
    isFromHome = false,
    onSubmitSearch = () => {},
    goBackToSearch = () => {},
    navigateToFilters = () => {},
  } = props;
  const theme = useTheme();
  const navigation: NavigationProp<any, any> = useNavigation(); // Accessing navigation object

  const handleOnFocus = () => {
    if (isFromHome) {
      navigation?.navigate('Search');
    } else {
      goBackToSearch();
    }
  };

  return (
    <LSInput
      value={query}
      onChangeText={setQuery}
      placeholder={'Search'}
      leftIcon={HOME_SEARCH_INPUT_ICON}
      rightIcon={!isFromHome && HOME_FILTER_ICON}
      onRightIconPress={() => navigateToFilters()}
      homeSearch={true}
      inputBackColor={isFromHome ? 'white' : theme?.colors?.screenBg_light}
      onPressIn={() => handleOnFocus()}
      enterKeyHint={'search'}
      autoFocus={!isFromHome}
      onSubmitEditing={() => onSubmitSearch()}
      editable={!isFromHome}
      height={scale(36)}
    />
  );
});

export default LSHomeScreenSearch;
