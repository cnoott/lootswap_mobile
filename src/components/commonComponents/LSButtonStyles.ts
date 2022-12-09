import styled from 'styled-components/native';
import {color, border, layout} from 'styled-system';
import {Size, Type} from '../../enums';

export const ButtonContainer = styled.TouchableOpacity.attrs(props => ({
  width: props.width,
  height: props.height,
  // borderWidth: props.size === Size.Medium ? 2 : 0,
  bg:
    props.type === Type.Primary
      ? props.theme.colors.primary
      : props.theme.colors.secondaryButton,
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
  color:
    props.type === Type.Primary
      ? props.theme.colors.white
      : props.theme.colors.white,
}))`
  font-size: ${props => `${props.fontSize}px`};
  font-weight: 600 ${color};
`;
