import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';

export const Badge = styled.View.attrs(props => ({
  right: props?.right,
}))`
  background-color: red;
  height: 16px;
  width: 16px;
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -3px;
  ${layout} ${color} ${space};
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: Urbanist-Bold;
`;
