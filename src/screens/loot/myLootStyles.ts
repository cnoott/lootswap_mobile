import styled from 'styled-components/native';
import {layout, space} from 'styled-system';
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
  flex: 1,
}))`
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${space}
  ${layout}
`;
