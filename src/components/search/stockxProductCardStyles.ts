import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

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

