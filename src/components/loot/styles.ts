import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

export const ItemContainer = styled.View.attrs(props => ({
  height: verticalScale(140),
  alignSelf: 'stretch',
  borderRadius: scale(20),
  bg: props.theme.colors.white,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 20,
  mt: verticalScale(20),
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
  height: verticalScale(110),
  width: verticalScale(110),
  borderRadius: scale(20),
  bg: props.theme.colors.grey,
}))`
  ${layout} ${color} ${space};
`;

export const DesContainer = styled.View.attrs(() => ({
  ml: scale(10),
  height: verticalScale(100),
  flex: 1,
}))`
  justify-content: space-evenly ${space} ${layout};
`;

export const TitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  width: '97%',
  numberOfLines: 2,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const BrandText = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  width: '97%',
  numberOfLines: 1,
  ellipsizeMode: 'tail',
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Inter-Bold;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const DesBottomContainer = styled.View.attrs(() => ({
  alignItems: 'center',
  justifyContent: 'space-between',
}))`
  flex-direction: row ${space};
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

export const Image = styled.Image.attrs(() => ({
  width: verticalScale(110),
  height: verticalScale(110),
  borderRadius: scale(20),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;
