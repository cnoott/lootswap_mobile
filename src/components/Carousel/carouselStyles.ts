import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {moderateScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  height: props.height,
}))`
  align-self: center;
  ${space}
`;

export const SubContainer = styled.View.attrs(() => ({
  margin: moderateScale(15),
  flex: 1,
}))`
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs(props => ({
  height: props?.height,
  width: props?.width,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BottomText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  width: '80%',
  my: 10,
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Inter-Bold;
  font-weight: 600;
  text-align: center;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;
