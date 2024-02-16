import styled from 'styled-components/native';
import {color, border, layout, space} from 'styled-system';

export const ButtonContainer = styled.TouchableOpacity.attrs(props => ({
  width: props.width,
  height: props.height,
  bg: props.buttonColor,
  borderRadius: props.borderSize,
  borderColor: props.borderColor,
  borderWidth: props.border,
  activeOpacity: 0.6,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: full;
  ${layout}
  ${color}
  ${border}
  border-color: ${props => props.borderColor};
  border-width: ${props => props.border};
  ${space}
`;

export const BText = styled.Text.attrs(props => ({
  color: props.textColor,
}))`
  font-size: ${props => `${props.fontSize}px`};
  font-weight: 600 ${color};
  font-family: Urbanist-Bold;
`;
