import styled from 'styled-components/native';
import {color, border, layout} from 'styled-system';

export const ButtonContainer = styled.TouchableOpacity.attrs(props => ({
  width: props.width,
  height: props.height,
  bg: props.buttonColor,
  borderRadius: props.borderSize,
  activeOpacity: 0.6,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  width: full;
  ${layout}
  ${color}
  ${border}
`;

export const BText = styled.Text.attrs(props => ({
  color: props.textColor,
}))`
  font-size: ${props => `${props.fontSize}px`};
  font-weight: 600 ${color};
  font-family: Urbanist-Bold;
`;
