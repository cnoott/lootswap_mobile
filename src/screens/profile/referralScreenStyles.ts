import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const TopContainer = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const TopTextContainer = styled.View.attrs((props: any) => ({
  mt: verticalScale(10),
}))`
  align-items: center;
  ${space} ${border} ${color};
`;

export const TopTextHeader = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const GreenText = styled.Text.attrs(() => ({
  color: '#04AC29',
}))`
  font-size: ${moderateScale(18)}px;
  text-align: center;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const TopTextSub = styled.Text.attrs(props => ({
  mt: verticalScale(3),
  ml: scale(8),
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Medium;
  ${color}
  ${space}
  ${layout}
`;

export const MiddleText = styled.Text.attrs(props => ({
  mt: verticalScale(20),
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(15)}px;
  text-align: center;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const LinkSectionContainer = styled.View.attrs((props: any) => ({
  mt: verticalScale(6),
  p: scale(18),
}))`
  ${space} ${border} ${color};
`;

export const LinkHeader = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const LinkContainer = styled.View.attrs(props => ({
  mt: verticalScale(10),
  borderRadius: scale(10),
  p: scale(15),
  backgroundColor: '#E0E0E0',
  shadowColor: props.theme.colors.primary,
  shadowOpacity: 0.2,
  shadowRadius: 4,
  shadowOffset: {
    height: 1,
    width: 1,
  },
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${space} ${border} ${color};
`;

export const Touchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
}))``;

export const LinkText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
}))`
  font-family: Urbanist;
  font-size: ${moderateScale(13)}px;
  ${color}
  ${space}
  ${layout}
`;

export const ShareButtonContainer = styled.View.attrs(props => ({
  mb: verticalScale(8),
}))`
  ${space}
  ${layout}
`;

export const ImageContainer = styled.View.attrs(() => ({
}))`
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs((props: any) => ({
  height: scale(props?.height),
  width: scale(props?.width),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BulletPointView = styled.View`
  flex-direction: row;
  margin-vertical: ${verticalScale(5)}px;
  width: 80%;
  margin-left: 8%
`;

export const Bullet = styled.View`
  width: ${scale(4)}px;
  height: ${scale(4)}px;
  border-radius: ${scale(2)}px;
  background-color: #6267FE;
  margin-right: ${scale(10)}px;
  margin-top: ${scale(8)}px;
`;

export const BulletBoldText = styled.Text`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-ExtraBold;
  color: #6A74DF;
`;
export const BulletText = styled.Text`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist;
  color: black;
`;
