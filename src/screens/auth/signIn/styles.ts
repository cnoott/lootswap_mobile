import styled from 'styled-components/native';
import {color, space, layout, border} from 'styled-system';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {ViewStyle} from 'react-native';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  bg: props.theme.colors.white,
}))`
  ${color}
`;

export const HeaderContainer = styled.View.attrs({
  mt: verticalScale(30),
  mb: verticalScale(50),
  ml: scale(12),
})`
  ${space}
`;

export const HeaderLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(15),
}))`
  font-size: ${scale(25)}px;
  font-family: Inter-Black;
  ${color}
  ${space}
  ${layout}
`;

export const HeaderDesLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mt: scale(2),
  mb: verticalScale(46),
  ml: scale(15),
}))`
  font-size: ${scale(12)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled.TouchableOpacity.attrs({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
})``;

export const ForgotPassLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: verticalScale(45),
}))`
  font-size: 16px;
  font-family: Inter-Bold;
  font-weight: 500;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;

export const FullView = styled.View.attrs({
  flex: 1,
})``;

export const BottomButton = styled.TouchableOpacity.attrs(() => ({
  mb: verticalScale(35),
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const ButtonText1 = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: 'Inter-Light';
  ${color}
  ${space}
  ${layout}
`;

export const ButtonText2 = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const Innercontainer: ViewStyle = {
  flex: 1,
};

export const Spacing = styled.View.attrs(() => ({}))`
  margin-top: ${verticalScale(25)}px;
  ${color}
`;
