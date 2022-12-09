import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';

export const Container = styled.View.attrs(() => ({
  bg: 'rgba(0,0,0,0.3)',
}))`
   ;
`;

export const ProfileContainerView = styled.View.attrs(props => ({
  width: scale(props?.width),
  height: scale(props?.height),
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${space}
`;

export const Image = styled.Image.attrs(props => ({
  width: scale(props?.width),
  height: scale(props?.height),
  borderRadius: scale(props?.borderRadius),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;
