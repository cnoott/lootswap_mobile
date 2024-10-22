import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

const height = Dimensions.get('window').height;

export const Container = styled.View.attrs(props => ({
  borderRadius: scale(20),
  borderColor: 'grey',
  backgroundColor: '#FAFAFA',
  bg: props.theme.colors.white,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 20,
  mb: props?.isFromStepFour ? scale(0) : scale(80),
}))`
  ${space}
  ${layout}
`;

export const ItemContainer = styled.TouchableOpacity.attrs(props => ({
  height: verticalScale(40),
  alignSelf: 'stretch',
  mt: verticalScale(4),
  mx: 10,
  px: scale(8),
  borderWidth: props?.isSelected ? 2 : 0,
  borderRadius: 8,
  overflow: 'hidden',
  borderColor: props?.isSelected
    ? props?.theme?.colors?.primary
    : props?.theme?.colors?.white,
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

export const ContainerTitle = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  numberOfLines: 1,
  mt: verticalScale(10),
  ml: scale(15),
  mb: scale(8),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist;
  font-weight: 700;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const TitleContainer = styled.View.attrs(() => ({
  flexDirection: 'row',
  alignItems: 'center',
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

export const BrandContainer = styled.View.attrs(() => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  ml: 2,
}))`
  flex-direction: row ${space};
`;

export const BrandText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  width: '97%',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist-Medium;
  ${color}
  ${space}
  ${layout}
`;
export const BrandResultText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  width: '97%',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(11)}px;
  font-family: Urbanist;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${space}
  ${layout}
`;
