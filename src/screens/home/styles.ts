import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.screenBg,
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
  bg: props.theme.colors.screenBg,
  pb: moderateScale(10),
  borderBottomColor: props.theme.colors.divider,
  borderBottomWidth: moderateScale(2),
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  numColumns: 2,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1, backgroundColor: 'white'},
}))`
  ${color}
  ${space}
  ${layout}
`;

export const CarousalContainer = styled.View.attrs(() => ({
  width: '100%',
}))`
  align-items: center;
  justify-content: center;
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;
