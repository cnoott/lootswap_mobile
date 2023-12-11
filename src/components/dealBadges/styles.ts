import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs((props: any) => ({
  bg: props?.color,
}))`
  padding: ${scale(6)}px ${scale(8)}px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  ${space}
  ${layout}
  ${color}
`;

export const Text = styled.Text.attrs(() => ({
  color: 'white',
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-SemiBold;
  margin-left: 5px;
  ${color}
  ${space}
  ${layout}
`;
