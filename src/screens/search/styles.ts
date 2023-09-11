import {moderateScale, verticalScale} from 'react-native-size-matters';
import {layout, space, color} from 'styled-system';
import styled from 'styled-components/native';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const TempText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;
