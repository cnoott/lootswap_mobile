import {verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import SearchableDropdown from 'react-native-searchable-dropdown';

export const SearchableDropdownView = styled(SearchableDropdown).attrs(
  (props: any) => ({
    containerStyle: {padding: 0},
    itemStyle: {
      padding: 10,
      marginTop: 2,
      borderRadius: 5,
    },
    itemTextStyle: {
      color: props?.theme.colors.text,
      fontWeight: '700',
      fontSize: scale(13),
    },
    itemsContainerStyle: {
      maxHeight: verticalScale(160),
      backgroundColor: props?.theme.colors.white,
      padding: scale(10),
      borderRadius: scale(10),
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      marginVertical: verticalScale(5),
      borderColor: '#bbb',
      borderWidth: 0.3,
    },
    textInputProps: {
      placeholder: props?.placeHolder,
      placeholderTextColor: props?.theme.colors.placeholder,
      underlineColorAndroid: 'transparent',
      fontSize: scale(14),
      style: {
        padding: scale(15),
        borderWidth: 1,
        borderColor: props?.theme.colors.searchBorder,
        borderRadius: scale(10),
        minHeight: verticalScale(42),
        backgroundColor: props?.theme.colors.searchInnerBG,
      },
    },
    listProps: {
      nestedScrollEnabled: true,
    },
  }),
)`
  ${space}
  ${layout}
  ${color}
  ${border}
`;
