import styled from 'styled-components/native';
import {layout, space, color, border, backgroundColor} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
}))`
  ${space}
  ${layout}
`;

export const ButtonContainer = styled.View.attrs(() => ({
  mb: verticalScale(5),
}))`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  width: 100%;
  ${space}
  ${layout}
`;
