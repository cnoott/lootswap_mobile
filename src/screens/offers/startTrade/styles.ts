import styled from 'styled-components/native';
import {layout, space, color, border, backgroundColor} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Platform} from 'react-native';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;

export const SelectLootText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(5),
  ml: scale(10),
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
`;

export const SelectedLootText = styled.Text.attrs(props => ({
  color: props.theme.colors.textGrey,
  mt: verticalScale(3),
  ml: scale(16),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${space}
  ${layout}
  ${color}
`;

export const TradeReviewText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(3),
  ml: scale(15),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const TradeReviewTextTwo = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
  mt: verticalScale(10),
  ml: scale(15),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const ButtonContainer = styled.View.attrs(() => ({
  mb: verticalScale(5),
}))`
  flex-direction: row;
  justify-content: space-around;
  position: absolute;
  bottom: 10px;
  width: 100%;
  ${space}
  ${layout}
`;

export const FlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${space}
  ${layout}
`;

export const ScrollSubContainer = styled.ScrollView.attrs(() => ({
  flex: 1,
  showsVerticalScrollIndicator: false,
}))`
  ${space}
  ${layout}
`;

export const AddMoneyContainer = styled.View.attrs(() => ({
  flex: 1,
  py: scale(5),
  px: scale(15),
}))`
  flex-direction: row;
  justify-content: flex-start;
  ${space}
  ${layout}
`;

export const EditMoneyContainer = styled.View.attrs(() => ({
  flex: 1,
  py: scale(5),
  px: scale(15),
}))`
  flex-direction: row;
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const MoneyOfferText = styled.Text.attrs(props => ({
  color: props.theme.colors.successColor,
  mt: verticalScale(10),
  ml: scale(15),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 700;
  ${space}
  ${layout}
  ${color}
`;

export const ChooseOfferContainer = styled.View.attrs(() => ({
  flex: 1,
  mt: verticalScale(30),
}))`
  ${space}
  ${layout}
`;

export const ORText = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  py: scale(30),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-ExtraBold
  align-self: center;
  ${space}
  ${layout}
  ${color}
`;

export const TradeOfferButtonConatiner = styled.TouchableOpacity.attrs(props => ({
  width: scale(250),
  height: verticalScale(170),
  bg: props.theme.colors.primary,
  borderRadius: scale(30),
  activeOpacity: 0.6,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  width: full;
  ${layout}
  ${color}
  ${border}
`;

export const TradeOfferTopSection = styled.View.attrs(() => ({
  flex: 1,
  mt: verticalScale(30),
}))`
  flex-direction: row;
  ${layout} ${space} ${border}
`;
export const TradeOfferBottomSection = styled.View.attrs(() => ({
  flex: 1,
  px: scale(10),
}))`
  ${layout} ${space} ${border}
`;

export const ButtonTitleText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
  mb: verticalScale(5),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold
  align-self: center;
  ${space}
  ${layout}
  ${color}
`;

export const ButtonSubText = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist
  text-align: center;
  ${space}
  ${layout}
  ${color}
`;

export const MoneyOfferButtonConatiner = styled.TouchableOpacity.attrs(props => ({
    width: scale(250),
    height: verticalScale(170),
    bg: props.theme.colors.successColor,
    borderRadius: scale(30),
    activeOpacity: 0.6,
}))`
  align-items: center;
  justify-content: center;
  align-self: center;
  width: full;
  ${layout}
  ${color}
  ${border}
`;

export const MoneyOfferBottomSection = styled.View.attrs(() => ({
  mt: verticalScale(1),
  p: scale(8),
}))`
  ${layout} ${space}
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
}))`
  ${color}
  ${space}
  ${layout}
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
  flex:1,
}))`
  ${space}
  ${layout}
`;

export const MoneyOfferInputContainer = styled.View.attrs(() => ({
  mb: verticalScale(7),
}))`
  flex-direction: row;
  align-self: center;
  align-items: center;
  ${layout} ${space} ${border}
`;

export const MoneyOfferInput = styled.TextInput.attrs(props => ({
  color: props?.notValid
    ? props.theme.colors.danger
    : props.theme.colors.primary,

  fontFamily: 'Urbanist-Bold',
  fontSize: moderateScale(40),
}))`
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const InvalidText = styled.Text.attrs(props => ({
  color: props.theme.colors.danger,
  mb: verticalScale(4),
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist
  align-self: center;
  ${space}
  ${layout}
  ${color}
`;


export const Line = styled.View.attrs(props => ({
  borderBottomColor: props.notValid
    ? props.theme.colors.danger
    : props.theme.colors.primary,
  mx: scale(48),
  mb: verticalScale(12),
}))`
  ${space}
  ${layout}
  ${border}
  ${color}
  border-bottom-width: 3px;
`;

export const SubText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mb: verticalScale(32),
}))`
  font-size: ${moderateScale(12)}px;
  font-family: Urbanist
  align-self: center;
  ${space}
  ${layout}
  ${color}
`;

export const MoneySign = styled.Text.attrs(props => ({
  color: props?.notValid
    ? props.theme.colors.danger
    : props.theme.colors.primary,
  mr: scale(8),
}))`
  font-size: ${moderateScale(40)}px;
  font-family: Urbanist-Bold
  align-self: center;
  ${space}
  ${layout}
  ${color}
`;

export const OfferPriceText = styled.Text.attrs(props => ({
  color: props.theme.colors.black,
}))`
  font-size: ${moderateScale(19)}px;
  font-family: Urbanist;
  font-weight: 700;
  align-self: center;
  ${space}
  ${layout}
  ${color}
`;

export const SendOfferContainer = styled.View.attrs(() => ({
  flex: 1,
  mb: verticalScale(90),
  pb: verticalScale(10),
}))`
  justify-content: space-between;
  ${space}
  ${layout}
`;
