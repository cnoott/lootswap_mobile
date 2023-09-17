import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
}))`
  padding-top: ${props => props?.paddingTop}px;
  ${color}
  ${space}
  ${layout}
`;

export const SearchContainer = styled.View.attrs(props => ({
  paddingHorizontal: moderateScale(10),
  bg: props.theme.colors.white,
}))`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const SearchInputContainer = styled.View.attrs(() => ({}))`
  flex: 1;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const EmptySearchContainer = styled.View.attrs(() => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const EmptySearchText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
`;

export const RecentSearchesContainer = styled.View.attrs(() => ({
  px: scale(12),
  py: scale(15),
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const RecentSearchesTitle = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  ${color}
`;

export const RecentSearchesTextContainer = styled.View.attrs(() => ({
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const RecentSearchesText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  py: scale(8),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-SemiBold;
  ${color}
  ${space}
`;

export const GoBackTouchable = styled.TouchableOpacity`
  width: 40px;
  margin-right: ${scale(5)}px;
`;

export const ClearRecentSearchesText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  py: scale(9),
}))`
  text-decoration: underline;
  text-decoration-color: '#6267FE';
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-SemiBold;
  ${color}
  ${space}
`;

export const StockxContainer = styled.TouchableOpacity.attrs(props => ({
  width: scale(225),
  alignSelf: 'stretch',
  borderRadius: 9,
  bg: props.theme.colors.white,
  mr: scale(5),
  my: scale(30),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const StockxImageContainer = styled.View.attrs(props => ({
  height: scale(82),
  width: scale(82),
  bg: props.theme.colors.white,
  borderRadius: scale(14),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const StockxTextContainer = styled.View.attrs(() => ({
  flex: 1,
  flexDirection: 'column',
  mt: verticalScale(2),
}))`
  justify-content: center;
  ${color}
  ${space}
  ${layout}
`;

export const StockxTitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  numberOfLines: 2,
  mt: verticalScale(5),
  ml: 2,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  font-weight: 600;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const StockxNumListingsText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  numberOfLines: 2,
  mt: verticalScale(5),
  ml: 2,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist;
  font-weight: 600;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const StockxBrandContainer = styled.View.attrs(() => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  ml: 2,
}))`
  flex-direction: row ${space};
`;

export const StockxImage = styled(FastImage).attrs(() => ({
  resizeMode: 'contain',
  width: moderateScale(85),
  height: moderateScale(85),
  borderRadius: scale(13),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const StockxFlatList = styled.FlatList.attrs(() => ({
  horizontal: true,
  pt: scale(10),
  px: scale(10),
}))`
  ${space}
  ${layout}
`;

export const FullDivider = styled.View.attrs(props => ({
  bg: props.theme.colors.divider,
  height: verticalScale(1),
  width: '100%',
  alignSelf: 'center',
  mb: verticalScale(7),
}))`
  ${space}
  ${layout}
  ${color}
`;
