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
  mt: verticalScale(100),
  mb: verticalScale(46),
})`
  align-items: center;
  ${space}
`;

export const HeaderLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: verticalScale(46),
}))`
  font-size: ${scale(25)}px;
  font-family: Inter-Bold;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled.TouchableOpacity.attrs({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
})``;

export const ForgotPassLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: verticalScale(20),
  mt: verticalScale(20),
}))`
  font-size: 16px;
  font-family: Inter-Bold;
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
  mb: 60,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: row;
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
  color: props.theme.colors.text,
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
