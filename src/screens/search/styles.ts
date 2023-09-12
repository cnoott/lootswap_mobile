import {moderateScale, verticalScale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import styled from 'styled-components/native';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
}))`
  padding-top: ${props => props?.paddingTop}px;
  ${color}
  ${space}
  ${layout}
`;

export const SearchContainer = styled.View.attrs(props => ({
  paddingHorizontal: moderateScale(15),
  bg: props.theme.colors.white,
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const EmptySearchContainer = styled.View.attrs(props => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const EmptySearchText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
`;
