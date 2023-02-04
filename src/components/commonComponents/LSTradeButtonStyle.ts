import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, scale} from 'react-native-size-matters';

export const TradeButton = styled.TouchableOpacity.attrs((props: any) => ({
  px: scale(15),
  py: scale(8),
  borderRadius: scale(20),
  bg: props?.selected ? props.theme.colors.black : props.theme.colors.white,
  my: scale(5),
  borderWidth: 1,
  borderColor: props.theme.colors.black,
  mr: scale(10),
  activeOpacity: 0.6,
}))`
  align-items: center;
  justify-content: center;
  align-self: flex-start ${layout} ${color} ${space} ${border};
`;

export const TradeButtonText = styled.Text.attrs((props: any) => ({
  color: props?.selected ? props.theme.colors.white : props.theme.colors.black,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  font-weight: 500;
  ${color}
  ${space}
`;
