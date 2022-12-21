import {verticalScale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {color, border, layout, space} from 'styled-system';

export const ModalViewContainer = styled.TouchableOpacity.attrs(props => ({
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
