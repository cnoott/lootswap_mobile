import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
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
  paddingVertical: moderateScale(0),
  paddingHorizontal: moderateScale(10),
}))`
  /* Shadow properties for iOS */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;

  /* Shadow properties for Android */
  elevation: 3;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1, backgroundColor: 'white'},
}))`
  ${color}
  ${space}
  ${layout}
`;

export const PublicOffersFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {flexGrow: 1, backgroundColor: 'white'},
  height: scale(160),
  mb: scale(10),
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

export const SectionTitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(22)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
`;

export const SectionTopContainer = styled.View.attrs(() => ({
}))`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  ${space}
  ${layout}

`;

export const SectionContainer = styled.View.attrs(() => ({
  px: scale(8),
}))`
  ${space}
  ${layout}
`;

export const ViewButtonContainer = styled.View.attrs(() => ({
}))``;

export const EmptyView = styled.View``;
