import styled from 'styled-components/native';
import {scale} from 'react-native-size-matters';
import {layout, space, color} from 'styled-system';

const productImageWidth = 130;

export const Image: any = styled.Image.attrs((props: any) => ({
  width: scale(props?.size ? props?.size : productImageWidth),
  height: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  resizeMode: props?.isStockxItem ? 'contain' : '',
}))`
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const Pressable: any = styled.TouchableOpacity.attrs(() => ({
  width: scale(productImageWidth),
  height: scale(productImageWidth),
  borderRadius: scale(10),
}))``;
