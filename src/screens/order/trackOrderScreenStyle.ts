import styled from 'styled-components/native';
import {layout, space, color, border} from 'styled-system';
import {moderateScale, verticalScale, scale} from 'react-native-size-matters';

const productImageWidth = 120;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const SubContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  mx: moderateScale(10),
  showsVerticalScrollIndicator: false,
}))`
  ${space}
`;

export const RowContainer = styled.View.attrs(() => ({
  mt: verticalScale(10),
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${space}
`;

export const OrderDataLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${space}
  ${layout}
  ${color}
`;

export const TrackingNumberLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${space}
  ${layout}
  ${color}
`;

export const Image = styled.Image.attrs({
  width: scale(36),
  height: scale(36),
})`
  ${space}
  ${layout}
`;

export const OrderImage: any = styled.Image.attrs((props: any) => ({
  width: scale(props?.size ? props?.size : productImageWidth),
  height: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const ImageContainer: any = styled.TouchableOpacity.attrs(
  (props: any) => ({
    height: scale(props?.size ? props?.size : productImageWidth),
    width: scale(props?.size ? props?.size : productImageWidth),
    borderRadius: scale(10),
    bg: props.theme.colors.grey,
    mx: scale(2.5),
    mb: scale(5),
    activeOpacity: 1,
  }),
)`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const OrderCellContainer = styled.View.attrs(props => ({
  mt: verticalScale(10),
  p: scale(6),
  alignSelf: 'stretch',
  bg: props.theme.colors.white,
}))`
  flex-direction: row;
  ${space}
  ${color}
`;

export const OrderDetails = styled.View.attrs(() => ({
  ml: verticalScale(10),
}))`
  justify-content: space-around;
  ${space}
`;

export const OrderNameLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Black;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ColorCircle = styled.View.attrs(props => ({
  mr: verticalScale(10),
  height: scale(18),
  width: scale(18),
  borderRadius: scale(9),
  bg: props.theme.colors.black,
}))`
  ${space}
  ${layout}
  ${color}
`;

export const OrderSubDetailsText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist-Bold;
  font-weight: 500;
  ${space}
  ${layout}
  ${color}
`;

export const DetailsVerticalBar = styled.View.attrs(props => ({
  bg: props.theme.colors.greySubDetails,
  mx: scale(5),
  height: verticalScale(14),
  width: 1.5,
}))`
  ${space}
  ${layout}
  ${color}
`;

export const FullDivider = styled.View.attrs(props => ({
  bg: props.theme.colors.divider,
  mt: scale(10),
  mb: scale(5),
  height: verticalScale(1),
  width: '100%',
  alignSelf: 'center',
}))`
  ${space}
  ${layout}
  ${color}
`;
