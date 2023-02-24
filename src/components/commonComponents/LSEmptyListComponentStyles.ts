import styled from 'styled-components/native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {layout, space, color} from 'styled-system';

export const EmptyListContainer = styled.View.attrs(() => ({
  flex: 1,
}))`
  align-items: center;
  justify-content: center;
`;

export const NoOffersLabel: any = styled.Text.attrs((props: any) => ({
  color: props.theme.colors.black,
  mt: verticalScale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  ${color}
  ${space}
    ${layout}
`;

export const NoOffersMessage: any = styled.Text.attrs((props: any) => ({
  color: props.theme.colors.text,
  my: verticalScale(10),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;
