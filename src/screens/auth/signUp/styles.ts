import styled from 'styled-components/native';
import {color, space, layout, border} from 'styled-system';
import {scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  bg: props.theme.colors.white,
}))`
  align-items: center;
  ${space}
  ${color}
`;

export const HeaderContainer = styled.View.attrs({
  mt: verticalScale(100),
  mb: verticalScale(46),
})`
  align-self: stretch;
  align-items: center;
  ${space}
`;

export const HeaderLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: verticalScale(56),
}))`
  font-size: 32px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const Touchable = styled.TouchableOpacity.attrs(props => ({
  hitSlop: {left: 20, right: 20, top: 10, bottom: 10},
}))``;

export const ForgotPassLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: verticalScale(20),
}))`
  font-size: 16px;
  font-family: 'Inter-Bold';
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View``;

export const FullView = styled.View.attrs({
  width: '100%',
})`
  ${color}
`;

export const ProfileContainerView = styled.View.attrs({
  width: scale(70),
  height: scale(70),
})`
  align-items: center;
  justify-content: center;
  ${space}
  ${color}
`;

export const ProfileUploadView = styled.View.attrs({
  p: scale(10),
  mb: verticalScale(10),
})`
  ${color}
  ${space}
`;

export const EditIconContainer = styled.TouchableOpacity.attrs(props => ({}))`
  position: absolute;
  right: 10px;
  bottom: 15px;
`;

export const BottomButton = styled.TouchableOpacity.attrs(props => ({}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  bottom: 60px;
  flex-direction: row;
  ${layout}
  ${color}
  ${border}
`;

export const ButtonText1 = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: 13px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const ButtonText2 = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: 16px;
  font-family: 'Inter-Bold';
  ${color}
  ${space}
  ${layout}
`;

export const Innercontainer = {
  flex: 1,
  paddingHorizontal: scale(20),
  alignItems: 'center',
};
