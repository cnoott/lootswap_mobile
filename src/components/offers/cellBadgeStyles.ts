import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {Animated} from 'react-native';

export const AnimatedBadge = Animated.createAnimatedComponent(styled.View.attrs(
  props => ({
    top: props.top,
    left: props.left,
  }),
)`
  background-color: red;
  height: 14px;
  width: 14px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;
  position: absolute;
  ${layout} ${color} ${space};
`);
