import {verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {color, border, layout, space} from 'styled-system';

export const ModalViewContainer = styled.View.attrs(props => ({
  backgroundColor: props?.theme?.colors.white,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: '#000',
  borderStyle: 'solid',
  p: verticalScale(10),
}))`
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const ModalBottomViewContainer = styled.View.attrs(props => ({
  backgroundColor: props?.theme?.colors.white,
  borderRadius: 25,
  borderWidth: 1,
  borderColor: '#000',
  borderStyle: 'solid',
  p: verticalScale(10),
}))`
  ${layout}
  ${color}
  ${border}
  ${space}
`;

export const CloseTouchable = styled.TouchableOpacity.attrs(() => ({
  hitSlop: {top: 10, left: 10, right: 10, bottom: 10},
}))`
  position: absolute;
  top: 15px;
  right: 15px ${layout} ${space};
`;
