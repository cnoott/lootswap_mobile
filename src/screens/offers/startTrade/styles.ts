import styled from 'styled-components/native';
import {layout, space, color} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SelectLootText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(5),
  ml: scale(10),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
`;

export const SelectedLootText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  mt: verticalScale(3),
  ml: scale(16),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${space}
  ${layout}
  ${color}
`;

export const ButtonContainer = styled.View.attrs(() => ({
  mb: verticalScale(5),
}))`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10;
  width: 100%;
  ${space}
  ${layout}
`;

