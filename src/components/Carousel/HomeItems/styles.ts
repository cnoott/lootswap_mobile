import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {color, border, layout, space} from 'styled-system';
import {scale} from 'react-native-size-matters';

export const Container = styled(LinearGradient).attrs(() => ({
  flex: 1,
  height: '100%',
  width: '100%',
  colors: ['#F1F2FF', 'rgba(255, 255, 255, 0)'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
}))`
  justify-content: center;
  align-items: center;
  ${color}
`;

export const HeaderText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-weight: 900;
  font-size: ${scale(19)}px;
  font-family: Mont;
  text-align: center;
  ${color}
  ${space}
`;

export const HeaderPrimaryText = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-family: Mont;
  ${color}
`;

export const HeaderBottomText = styled.Text.attrs(props => ({
  color: props.theme.colors.greyLabel,
  mt: scale(5),
  mb: scale(30),
}))`
  font-weight: 600;
  font-size: ${scale(15)}px;
  font-family: Inter-Bold;
  text-align: center;
  ${color}
  ${space}
`;

export const OnlyText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mt: scale(30),
  mb: scale(6),
}))`
  font-weight: 700;
  font-size: ${scale(18)}px;
  font-family: Inter;
  text-align: center;
  ${color}
  ${space}
`;

export const PayPalDesText = styled.Text.attrs(() => ({
  color: '#9F9F9F',
  mt: scale(5),
  mb: scale(70),
}))`
  font-weight: 500;
  font-size: ${scale(10)}px;
  font-family: Inter;
  text-align: center;
  ${color}
  ${space}
`;

export const SwapContainer = styled.View.attrs(() => ({}))`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  align-self: stretch;
  ${color}
`;

export const SwapIconContainer = styled.View.attrs(() => ({
  height: scale(40),
  width: scale(40),
  borderRadius: scale(20),
  activeOpacity: 0.8,
  mb: scale(20),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const Image = styled.Image.attrs((props: any) => ({
  height: scale(props?.height),
  width: scale(props?.width),
  borderRadius: scale(12),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const BottomLeftContainer = styled.View.attrs(() => ({
  height: scale(38),
  width: scale(150),
  mb: scale(20),
}))`
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  ${layout} ${color} ${space} ${border};
`;

export const BottomRightContainer = styled.View.attrs(() => ({
  height: scale(38),
  width: scale(150),
  mb: scale(20),
}))`
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  ${layout} ${color} ${space} ${border};
`;

export const BottomText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  maxWidth: scale(90),
}))`
  font-size: ${scale(12)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const VerticalSpace = styled.View.attrs((props: any) => ({
  height: scale(props?.space || 10),
}))`
  ${space};
`;

export const FirstLeftImage = styled.View.attrs(() => ({}))`
  position: absolute;
  left: 0px;
  bottom: 170px;
  ${space};
`;

export const FirstRightImage = styled.View.attrs(() => ({}))`
  position: absolute;
  right: 0px;
  bottom: 175px;
  ${space};
`;

export const SecondLeftImage = styled.View.attrs(() => ({}))`
  position: absolute;
  left: 0px;
  bottom: 0px;
  ${space};
`;

export const SecondRightImage = styled.View.attrs(() => ({}))`
  position: absolute;
  right: 0px;
  bottom: 0px;
  ${space};
`;

export const StepThreeHeaderText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(5),
}))`
  font-weight: 900;
  font-size: ${scale(18)}px;
  font-family: Inter-Black;
  ${color}
  ${space}
`;

export const ExecutivePerksText = styled.Text.attrs(() => ({
  color: '#9F9F9F',
  mt: scale(5),
  mb: scale(20),
}))`
  font-weight: 500;
  font-size: ${scale(10)}px;
  font-family: Inter;
  text-align: center;
  ${color}
  ${space}
`;

export const DiscordContainer = styled.View.attrs(() => ({}))`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  ${color}
`;

export const EmptyView = styled.View``;
