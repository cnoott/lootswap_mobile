import styled from 'styled-components/native';
import {color, border, space} from 'styled-system';

export const LoaderContainer = styled.View.attrs(() => ({
  bg: 'rgba(0,0,0,0.3)',
}))`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  ${color} ${space} ${border};
`;
