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
  margin: moderateScale(15),
  flex: 1,
}))`
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  numColumns: 2,
  showVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${color}
  ${space}
  ${layout}
`;
