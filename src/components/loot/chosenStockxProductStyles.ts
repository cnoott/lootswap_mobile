import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

const height = Dimensions.get('window').height;

export const Container = styled.View.attrs(props => ({
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#F2F2F2',
  p: scale(10),
}))`
  ${layout} ${color} ${space} ${border};
`;
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
  height: verticalScale(50),
  width: verticalScale(50),
  bg: props.theme.colors.white,
  borderRadius: scale(14),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const Image = styled(FastImage).attrs(() => ({
  resizeMode: 'contain',
  width: verticalScale(50),
  height: verticalScale(50),
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
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist;
  font-weight: 600;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const DeleteButtonContainer = styled.TouchableOpacity.attrs(props => ({
  width: scale(80),
  height: scale(35),
  bg: 'rgba(247, 85, 85, 0.1)',
  borderRadius: 50,
  activeOpacity: 0.6,
  mt: scale(8),
}))`
  align-items: center;
  justify-content: center;
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const DeleteButtonText = styled.Text.attrs(props => ({
  color: '#F75555',
}))`
  font-size: ${scale(14)}px;
  font-weight: 600 ${color};
  font-family: Urbanist-Bold;
`;
