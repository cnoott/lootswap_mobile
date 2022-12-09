import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({}))`
  flex-direction: row ${space};
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
