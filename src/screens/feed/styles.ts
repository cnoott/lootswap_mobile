import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

// FLatlist should take entire height and width
export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${color}
  ${space}
  ${layout}
`;


