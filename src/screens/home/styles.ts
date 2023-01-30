import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {moderateScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  marginVertical: moderateScale(5),
  marginHorizontal: moderateScale(10),
}))`
  ${space}
  ${layout}
`;

export const SearchContainer = styled.View.attrs(props => ({
  paddingVertical: moderateScale(5),
  paddingHorizontal: moderateScale(10),
  bg: props.theme.colors.white,
}))`
  ${space}
  ${layout}
  ${color}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;
