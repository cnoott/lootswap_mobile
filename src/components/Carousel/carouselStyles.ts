import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale, scale} from 'react-native-size-matters';
import Dots from 'react-native-dots-pagination';

export const Container = styled.View.attrs(props => ({
  height: props.height,
  //bg: props?.isProduct ? props.theme.colors.white : props.theme.colors.screenBg,
  bg: props.theme.colors.white,
}))`
  align-self: ${props => `${props?.isProduct ? 'center' : 'flex-start'}`};
  position: relative;
  ${space}
  ${color}
  ${layout}
`;

export const SubContainer = styled.View.attrs(() => ({
  margin: moderateScale(15),
  flex: 1,
}))`
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs(props => ({
  height: props?.height,
  width: props?.width,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const DotsContainer = styled.View.attrs(props => ({
  bottom: props?.fullScreen ? scale(28) : 1,
}))`
  position: absolute;
  align-self: center;
  ${space}
  ${layout}
`;

export const DotsComponent = styled(Dots).attrs(props => ({
  activeColor: props?.isActiveBorder
    ? props?.theme?.colors?.white
    : props?.theme?.colors?.primary,
  activeBorder: props?.isActiveBorder,
  activeBorderColor: props?.theme?.colors?.primary,
  activeBorderWidth: scale(3),
  activeDotWidth: scale(props?.isActiveBorder ? 13 : 8),
  activeDotHeight: scale(props?.isActiveBorder ? 13 : 8),
  marginHorizontal: scale(4),
}))`
  ${space}
  ${layout}
`;

export const ItemCenterContainer = styled.TouchableWithoutFeedback.attrs(() => ({
  flex: 1,
}))`
  align-items: center;
  justify-content: center;
  width: 100%;
  ${space}
  ${layout}
`;

export const HomeBottomItemContainer = styled.View.attrs(props => ({
  px: scale(15),
  py: scale(10),
  bg: props?.theme?.colors?.screenBg_light,
  borderRadius: scale(8),
  alignSelf: 'center',
}))`
  align-items: center;
  justify-content: center;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const BottomText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  width: '80%',
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  font-weight: 700;
  text-align: center;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const PercentageText = styled.Text.attrs(props => ({
  color: props.theme.colors.errorColor,
}))`
  ${color}
`;

export const SearchBarWrapper = styled.View.attrs(props => ({}))`
  margin-top: 5px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 10000px;
`;
