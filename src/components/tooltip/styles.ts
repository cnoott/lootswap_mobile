import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {moderateScale, scale} from 'react-native-size-matters';

export const IconContainer = styled.TouchableOpacity.attrs(() => ({}))``;

export const ModalContainer = styled.View.attrs(() => ({}))`
  padding: 10px;
  align-items: center;
  ${space}
  ${layout}
`;

export const TooltipText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: 2,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist-Semibold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;
