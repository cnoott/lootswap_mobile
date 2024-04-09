import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';

export const ModalStyles = {
  margin: 0,
  justifyContent: 'flex-end',
};
export const ModalHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(15),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const ModalSubText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const ScrollView: any = styled.ScrollView.attrs(() => ({
}))`
  padding-vertical: ${scale(8)}px;
  padding-bottom: ${scale(20)}px;
  marginBottom: ${scale(35)}px;
`;

export const Image = styled.Image.attrs((props: any) => ({
  width: scale(56),
  height: scale(56),
  borderRadius: scale(10)
}))`
  ${color}
  ${space}
  ${layout}
`;

export const IconTouchable = styled.TouchableOpacity.attrs(() => ({
}))`

  padding-left: ${scale(15)}px;
`;

export const IconText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: scale(5),
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Urbanist;
  text-align: center;
  align-items: center;
  ${color}
  ${space}
  ${layout}
`;
