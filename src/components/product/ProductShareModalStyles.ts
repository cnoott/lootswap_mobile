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
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;
