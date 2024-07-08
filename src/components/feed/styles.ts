import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Dots from 'react-native-dots-pagination';

export const Container = styled.View.attrs((props: any) => ({
  flex: 1,
  bg: props?.theme?.colors?.black,
  height: props.height,
}))`
  ${space}
  ${layout}
  ${color}
`;
export const CarouselContainer = styled.View.attrs((props: any) => ({
  flex: 1,
  mt: scale(40),
}))`
  ${space}
  ${layout}
  ${color}
`;

export const ItemCenterContainer = styled.TouchableWithoutFeedback.attrs(
  () => ({
    flex: 1,
  }),
)`
  align-items: center;
  justify-content: center;
  width: 100%;
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
}))`
  ${space}
  ${layout}
`;

export const DotsComponent = styled(Dots).attrs(props => ({
  passiveColor: 'grey',
  activeColor: props?.theme?.colors?.white,
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
