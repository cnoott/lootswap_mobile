import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {moderateScale, verticalScale} from 'react-native-size-matters';
const width = Dimensions.get('window').width;

export const Container = styled.View.attrs(() => ({
  height: verticalScale(width / 2 - 50),
}))``;

export const SubContainer = styled.View.attrs(() => ({
  margin: moderateScale(15),
  flex: 1,
}))`
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs({
  height: verticalScale(width / 2 - 60),
})`
  ${color}
  ${space}
  ${layout}
`;
