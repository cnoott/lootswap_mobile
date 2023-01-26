import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {color, space} from 'styled-system';
import {moderateScale} from 'react-native-size-matters';

export const TabBarContainer = styled.View.attrs(props => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: moderateScale(75),
  backgroundColor: props?.theme.colors.white,
  shadowColor:
    Platform.OS === 'ios' ? 'rgba(0, 0, 0, 0.2)' : props?.theme.colors.black,
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.58,
  shadowRadius: 16,
  elevation: 24,
  paddingBottom: moderateScale(15),
}))`
  ${color}
`;

export const TabItemTouchable = styled.TouchableOpacity.attrs(() => ({
  flex: 1,
  alignItems: 'center',
  accessibilityRole: 'button',
}))``;

export const TabItemContainer = styled.View`
  justify-content: space-around;
  align-items: center;
`;

export const TabItemText = styled.Text.attrs(props => ({
  color: props.isActive
    ? props.theme.colors.primary
    : props.theme.colors.placeholder,
  marginTop: moderateScale(2),
}))`
  font-weight: ${props => `${props.isActive ? 600 : 400}`};
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist;
  ${color}
  ${space}
`;
