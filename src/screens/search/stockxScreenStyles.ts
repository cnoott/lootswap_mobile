import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const Container = styled.View.attrs(props => ({}))`
  padding-horizontal: 8px;
`;

export const TitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  numberOfLines: 4,
  mt: verticalScale(5),
  ml: 2,
}))`
  max-width: 80%;
  font-size: ${moderateScale(22)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const MiddleContainer = styled.View.attrs(() => ({
  mt: verticalScale(25),
  px: scale(10),
}))`
  flex-direction: row;
  justify-content: space-between;
  ${color}
  ${space}
  ${layout}
`;

const IMAGE_SIZE = 140;

export const ImageContainer = styled.View.attrs(props => ({
  height: scale(IMAGE_SIZE + 30),
  width: scale(IMAGE_SIZE + 30),
  bg: props.theme.colors.white,
  borderRadius: 15,
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const StockxImage = styled(FastImage).attrs(() => ({
  resizeMode: 'contain',
  width: moderateScale(IMAGE_SIZE),
  height: moderateScale(IMAGE_SIZE),
  borderRadius: scale(13),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const ProductDetailsContainer = styled.View.attrs(props => ({
  bg: props.theme.colors.white,
  borderRadius: 15,
  p: scale(15),
}))`
  justify-content: space-between;
  width: 40%;
  ${layout} ${color} ${space} ${border};
`;

export const SectionContainer = styled.View.attrs(props => ({}))``;

export const SelectSizeText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const SizeDropdownStyle = {
  width: scale(88),
};

export const SelectedTextStyle = {
  fontSize: moderateScale(15),
  fontFamily: 'Urbanist-Bold',
  color: '#6267FE',
};

export const ItemTextStyle = {
  fontSize: scale(15),
  fontFamily: 'Urbanist-Bold',
  fontWeight: '400',
  color: 'black',
};

export const MarketRangeText = styled.Text.attrs(props => ({
  color: props.theme.colors.successColor,
  mt: verticalScale(10),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const BottomContainer = styled.View.attrs(() => ({}))`
  margin-top: ${verticalScale(20)}px;
  padding-horizontal: ${scale(10)}px;
  margin-bottom: ${verticalScale(120)}px;
`;

export const BottomTitle = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(10),
  mb: verticalScale(5),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const DataContainer = styled.View.attrs(props => ({}))`
  margin-bottom: 10px;
`;

export const DataRowContainer = styled.TouchableOpacity.attrs(props => ({
  bg: props.theme.colors.white,
  borderRadius: scale(13),
  height: scale(55),
  px: scale(14),
  mb: verticalScale(8),
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${border}
  ${color}
  ${space}
  ${layout}
`;

export const NumberDataText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(10),
  mb: verticalScale(5),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const DataLabelText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  mt: verticalScale(10),
  mb: verticalScale(5),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;
