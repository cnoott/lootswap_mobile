import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const ItemContainer = styled.View.attrs(props => ({
  height: verticalScale(100),
  alignSelf: 'stretch',
  borderRadius: scale(20),
  bg: props.theme.colors.white,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 20,
  mt: verticalScale(1),
  mx: 10,
  px: scale(8),
}))`
  flex-direction: row;
  align-items: center;
  ${layout} ${color} ${space};
`;

export const CellTouchable = styled.TouchableOpacity`
  padding: 5px;
`;

export const ImageContainer = styled.View.attrs(props => ({
  height: verticalScale(80),
  width: verticalScale(80),
  borderRadius: scale(14),
  bg: props.theme.colors.grey,
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const Image = styled.Image.attrs(() => ({
  width: verticalScale(80),
  height: verticalScale(80),
  borderRadius: scale(13),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const TitleBrandContainer = styled.View.attrs(() => ({
  flex: 1,
}))`
  justify-content: flex-start;
`;

export const DesContainer = styled.View.attrs(() => ({
  ml: scale(10),
  height: verticalScale(100),
  flex: 1,
  py: verticalScale(12),
}))`
  justify-content: space-evenly ${space} ${layout};
`;

export const BrandText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  width: '97%',
  numberOfLines: 2,
  ellipsizeMode: 'tail',
  mb: verticalScale(2),
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const ConditionSizeText = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
  width: '97%',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Medium;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;
export const ConditionSizeResultText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  width: '97%',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const TitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Medium;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const PriceText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Inter-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const DesBottomContainer = styled.View.attrs(() => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  mr: scale(82),
}))`
  text-alight: right;
  flex-direction: row ${space};
`;

export const AnimatedCheckBox = styled(BouncyCheckbox).attrs(props => ({
  disableText: true,
  size: scale(20),
  fillColor: props?.theme?.colors.primary,
  unfillColor: props?.theme?.colors.grey,
  iconStyle: {
    borderRadius: 8,
  },
  innerIconStyle: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: props?.selected
      ? props?.theme?.colors.primary
      : props?.theme?.colors.lightGrey,
  },
}))`
  position: absolute;
  top: 10px;
  right: 10px;
  ${border}
`;
