import styled from 'styled-components/native';
import {color, layout, space, border} from 'styled-system';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {PrinterIcon} from 'react-native-heroicons/solid';

export const Container = styled.View`
  flex-direction: row ${space};
`;

export const PurchaseCellContainer = styled.TouchableOpacity.attrs(props => ({
  backgroundColor: props.theme.colors.commonSearchBack,
  borderRadius: scale(20),
  minHeight: verticalScale(160),
  alignSelf: 'stretch',
  mb: scale(10),
  px: scale(10),
  py: scale(15),
  shadowColor: props.theme.colors.black,
  shadowOpacity: 0.2,
  shadowRadius: 1,
  shadowOffset: {
    height: 0.5,
    width: 1,
  },
  activeOpacity: 0.9,
}))`
  ${space}
  ${color}
  ${layout}
  ${border}
`;

export const RowView = styled.View.attrs(() => ({
  p: scale(10),
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const OwnerDetailsView = styled.View.attrs(() => ({
  ml: scale(10),
  alignItems: 'flex-start',
}))`
  flex-direction: column;
  ${space}
`;

export const NameLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  numberOfLines: 1,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const StatusContainerView = styled.View.attrs((props: any) => ({
  px: scale(8),
  py: scale(4),
  bg: props?.bgColor,
  borderRadius: scale(8),
  mt: verticalScale(2),
}))`
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const StatusLabel: any = styled.Text.attrs((props: any) => ({
  color: props?.color,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const TimeLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const UserLeftView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 55%;
`;

export const UserRightView = styled.View.attrs(() => ({
  height: '100%',
  mt: scale(10),
}))`
  flex-direction: column;
  align-items: flex-end;
  ${color} ${space} ${layout};
`;

export const PrintLabelContainer = styled.TouchableOpacity.attrs(() => ({
  mt: scale(10),
}))`
  flex-direction: row;
  align-items: center;
  ${space}
  ${layout}
`;

export const PrintIcon: any = styled(PrinterIcon).attrs(props => ({
  color: props.theme.colors.primary,
  size: moderateScale(20),
}))`
  ${color}
  ${space}
    ${layout}
`;

export const PrintLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  ml: scale(5),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
    ${layout}
`;

export const ImageContainer = styled.View.attrs(props => ({
  height: verticalScale(90),
  width: verticalScale(90),
  borderRadius: scale(20),
  bg: props.theme.colors.white,
}))`
  ${layout} ${color} ${space};
`;

export const Image = styled.Image.attrs(() => ({
  width: verticalScale(90),
  height: verticalScale(90),
  borderRadius: scale(20),
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
    ${layout}
`;

export const DetailsContainer = styled.TouchableOpacity.attrs(() => ({
  mt: scale(20),
  flex: 1,
}))`
  flex-direction: row;
  align-items: center;
  ${space}
  ${layout}
`;

export const DetailsRightView = styled.View.attrs(() => ({
  ml: scale(10),
  flex: 1,
}))`
  flex-direction: column;
  align-items: flex-start;
  ${space}
  ${layout}
`;

export const OrderTitle: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  numberOfLines: 2,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const OrderPrice: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mt: scale(5),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter-Bold;
  ${color}
  ${space}
        ${layout}
`;

export const DeliveryAddContainer = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.commonSearchBack,
  alignSelf: 'stretch',
  p: scale(20),
  borderRadius: scale(10),
  flex: 1,
}))`
  flex-direction: row 
  justify-content: space-between;
  ${space} ${layout} ${border};
`;

export const DeliveryAddressLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(5),
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const DeliveryAddSubContainer = styled.View.attrs(() => ({
  flex: 1,
}))``;

export const DeliveryAddressText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  width: '90%',
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist-Medium;
  text-align: left;
  line-height: ${moderateScale(22)}px;
  ${color}
  ${space}
    ${layout}
`;

export const EditLabelContainer = styled.TouchableOpacity.attrs(() => ({}))`
  flex-direction: row;
  ${space} ${layout};
`;

export const EditLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.primary,
  ml: scale(5),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;
