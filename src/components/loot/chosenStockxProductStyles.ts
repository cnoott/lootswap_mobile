import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

const height = Dimensions.get('window').height;

export const ItemContainer = styled.View.attrs(props => ({
  //height: verticalScale(40),
  alignSelf: 'stretch',
  mt: verticalScale(4),
  mx: 10,
  px: scale(8),
  borderRadius: 8,
  overflow: 'hidden',
  borderColor: props?.theme?.colors?.white,
}))`
  flex-direction: row;
  align-items: center;
  ${layout} ${color} ${space} ${border};
`;

export const ImageContainer = styled.View.attrs(props => ({
  height: verticalScale(40),
  width: verticalScale(40),
  bg: props.theme.colors.white,
  borderRadius: scale(14),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const Image = styled(FastImage).attrs(() => ({
  resizeMode: 'contain',
  width: verticalScale(40),
  height: verticalScale(40),
  borderRadius: scale(13),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const TextContainer = styled.View.attrs(() => ({
  flex: 1,
  flexDirection: 'column',
  mt: verticalScale(2),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const TitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  numberOfLines: 2,
  mt: verticalScale(5),
  ml: 2,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist;
  font-weight: 600;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

