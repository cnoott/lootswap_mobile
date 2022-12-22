import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SubContainer = styled.ScrollView.attrs(() => ({
  marginVertical: moderateScale(5),
  marginHorizontal: moderateScale(15),
}))`
  ${space}
  ${layout}
`;

export const ProductNameContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.commonSearchBack,
  minHeight: verticalScale(90),
  alignSelf: 'stretch',
  borderRadius: scale(20),
  py: scale(15),
  px: scale(20),
}))`
  justify-content: center;
  ${space}
  ${layout}
`;

export const ProductNameLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(22)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const ProductBrandLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  mt: verticalScale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
`;

export const SubHeaderText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mb: scale(10),
  mt: scale(20),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  ${color}
  ${space}
`;

export const DesText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter;
  font-weight: 300;
  ${color}
  ${space}
`;

export const Divider = styled.View.attrs(props => ({
  height: verticalScale(1),
  bg: props.theme.colors.grey,
  alignSelf: 'stretch',
  mt: verticalScale(15),
}))`
  ${space}
  ${layout}
    ${color}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${space}
  ${layout}
`;
