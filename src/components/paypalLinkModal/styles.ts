import {verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {layout, space} from 'styled-system';

export const PayPalSubContainer = styled.View.attrs(() => ({}))`
  align-items: center;
  ${space}
  ${layout}
`;
export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;
export const TopMargin = styled.View.attrs(() => ({
  mt: verticalScale(20),
}))`
  ${space}
`;
export const TopMinMargin = styled.View.attrs(() => ({
  mt: verticalScale(10),
}))`
  ${space}
`;

export const TopMaxMargin = styled.View.attrs(() => ({
  mt: verticalScale(60),
}))`
  ${space}
`;
