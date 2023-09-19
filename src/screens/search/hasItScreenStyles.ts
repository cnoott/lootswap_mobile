import {moderateScale, verticalScale, scale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import styled from 'styled-components/native';

export const Container = styled.View.attrs(props => ({
  bg: '#FFFFFF',
  height: '100%',
}))`
  ${layout} ${space} ${color} ${border}
`;

export const StockxProductCardContainer = styled.View.attrs(props => ({
}))`
  margin-bottom: ${scale(5)}px;
  align-items: center;
  ${layout} ${space} ${color} ${border}
`;
