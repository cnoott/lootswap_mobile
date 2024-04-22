import styled from 'styled-components/native';
import {Dimensions, Platform} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const productImageWidth = 130;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))``;

export const OfferMessageContainer = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.light_bg,
}))``;

export const TopTabView = styled(TabView).attrs(() => ({
  flex: 1,
}))``;

export const ChatContainer = styled.View.attrs(() => ({
  flex: 1,
}))``;

export const EmptyListContainer = styled.View.attrs(() => ({
  flex: 1,
}))`
  align-items: center;
  justify-content: center;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs(() => ({
  flex: 1,
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
}))`
  ${space}
  ${layout}
`;

export const CustomTabBar = styled(TabBar).attrs(props => ({
  indicatorStyle: {
    backgroundColor: props?.theme?.colors?.primary,
    width: scale(40),
    height: scale(3),
    left: (Dimensions.get('window').width / 2 - scale(45)) / 2,
  },
  indicatorContainerStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelStyle: {
    color: props?.theme?.colors?.black,
    fontWeight: '400',
    fontSize: scale(16),
  },
  bg: props?.theme?.colors?.white,
}))`
  ${layout}
  ${color}
`;

export const Badge = styled.View`
  background-color: red;
  height: 18px;
  width: 18px;
  border-radius: 9px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -6px;
  right: -12px;
`;

export const BadgeText = styled.Text`
  color: white;
  font-size: 14px;
  font-family: Urbanist-Bold;
`;

export const Indicator = styled.View.attrs(props => ({
  backgroundColor: props?.theme?.colors?.primary,
  width: '80%',
  height: scale(3),
}))`
  align-self: center;
`;

export const TabBarLabel: any = styled.Text.attrs((props: any) => ({
  color: props?.focused
    ? props.theme.colors.black
    : props.theme.colors.placeholder,
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;

export const TabContainer = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
}))`
  ${space}
`;

export const OfferCellContainer = styled.TouchableOpacity.attrs(props => ({
  backgroundColor: props.theme.colors.bg,
  borderRadius: scale(20),
  minHeight: verticalScale(220),
  alignSelf: 'stretch',
  mb: scale(10),
  p: scale(10),
  pb: props?.isMessageItem ? verticalScale(20) : 0,
  shadowColor: '#171717',
  shadowOpacity: 0.2,
  shadowRadius: 1,
  shadowOffset: {width: 0, height: 0},
  activeOpacity: 0.9,
}))`
  ${space}
  ${color}
  ${border}
`;

export const MessageCellContainer = styled.TouchableOpacity.attrs(props => ({
  backgroundColor: props.theme.colors.bg,
  borderRadius: scale(20),
  minHeight: verticalScale(220),
  alignSelf: 'stretch',
  mb: scale(10),
  p: scale(10),
  shadowColor: '#171717',
  shadowOpacity: 0.2,
  shadowRadius: 1,
  shadowOffset: {width: 0, height: 0},
  activeOpacity: 0.9,
}))`
  flex-direction: row;
  align-items: center;
  ${space}
  ${color}
  ${border}
`;

export const OffersListView = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: scale(100),
  },
  mx: scale(10),
  my: scale(10),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const MessagesListView = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
  mx: scale(10),
  my: scale(10),
}))`
  ${color}
  ${space}
  ${layout}
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
}))`
  flex-direction: column;
  ${space}
`;

export const NameLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  numberOfLines: 1,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist-Bold;
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
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const TimeLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  ${color}
  ${space}
  ${layout}
`;

export const ProductNameLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mr: 10,
  width: '100%',
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  align-self: stretch;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 55%;
`;

export const AboveItemLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
  mb: scale(5),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const PublicOfferItemContainer = styled.View.attrs((props: any) => ({
  px: scale(10),
}))`
  ${space}
  ${border}
  ${layout}
`;

export const PublicOffersFilterContainer = styled.View.attrs(props => ({
  p: scale(5),
}))`
  align-items: flex-end;
  ${layout} ${color} ${space} ${border};
`;

export const BottomRowView = styled.View.attrs((props: any) => ({
  mt: scale(props?.topMargin || 20),
  borderWidth: props.isFromHome ? 2 : 0,
  borderColor: props.isFromHome ? '#F3F3F3' : '',
  borderRadius: 20,
  mr: props.isFromHome ? scale(10) : 0,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  ${space}
  ${border}
  ${layout}
`;

export const BottomRowTouchable = styled.TouchableOpacity.attrs(props => ({
  mt: scale(props?.topMargin || 20),
  borderWidth: props.isFromHome ? 2 : 0,
  borderColor: props.isFromHome ? '#F3F3F3' : '',
  borderRadius: 20,
  mr: props.isFromHome ? scale(10) : 0,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  ${space}
  ${border}
  ${layout}
`;

export const Image: any = styled.Image.attrs((props: any) => ({
  width: scale(props?.size ? props?.size : productImageWidth),
  height: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  resizeMode: props?.isStockxItem ? 'contain' : '',
}))`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const ImageContainer: any = styled.View.attrs((props: any) => ({
  height: scale(props?.size ? props?.size : productImageWidth),
  width: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  bg: props.theme.colors.white,
  mx: scale(2.5),
  mb: scale(5),
  activeOpacity: 1,
}))`
  position: relative;
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space} ${border};
`;

export const ImageContainerDouble: any = styled.View.attrs((props: any) => ({
  height: scale(props?.size ? props?.size : productImageWidth),
  width: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  bg: props.theme.colors.white,
  activeOpacity: 1,
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -12px;
  bottom: -5px;
  ${layout} ${color} ${space} ${border};
`;

export const ItemNameText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  mb: scale(2),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-ExtraBold;
  ${color}
  ${space}
    ${layout}
`;

export const OfferItemContainer = styled.View.attrs(props => ({
  height: scale(props?.size ? props.size : productImageWidth),
  width: scale(props?.size ? props.size : productImageWidth),
  borderRadius: scale(10),
  mr: scale(5),
}))`
 
  ${layout} ${color} ${space};
`;

export const OfferItemContainerCenter = styled.View.attrs(props => ({
  height: scale(props?.size ? props.size : productImageWidth),
  width: scale(props?.size ? props.size : productImageWidth),
  borderRadius: scale(10),
  mr: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const SwapButtonContainer = styled.TouchableOpacity.attrs(props => ({
  height: scale(40),
  width: scale(40),
  borderRadius: scale(20),
  bg: props.theme.colors.white,
  activeOpacity: 0.8,
}))`
  align-items: center;
  justify-content: center;
  position: absolute ${layout} ${color} ${space} ${border};
`;

export const SwapLine = styled.View.attrs(props => ({
  height: scale(props?.size ? props.size : productImageWidth),
  width: scale(2),
  bg: props.theme.colors.divider,
  alignSelf: 'center',
}))`
  ${layout} ${color} ${space};
`;

export const SwapIconContainer = styled.View.attrs(props => ({
  zIndex: 1000,
  flex: 1,
  bg: props.theme.colors.primary,
}))`
  position: absolute ${layout} ${color} ${space};
`;

export const SingleViewOffer = styled.View.attrs(props => ({
  px: scale(8),
  py: scale(7),
  borderRadius: scale(10),
  borderBottomLeftRadius: scale(0.1),
  bg: props.theme.colors.offerColor,
  top: 0,
  right: 0,
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  ${layout} ${color} ${space};
`;

export const DoubleViewOffer = styled.View.attrs(props => ({
  px: scale(7),
  py: scale(6),
  borderRadius: scale(20),
  bg: props.theme.colors.offerColor,
  top: -5,
  right: -25,
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  ${layout} ${color} ${space};
`;

export const TrippleViewOffer = styled.View.attrs(props => ({
  height: scale(props?.size ? props?.size : productImageWidth),
  width: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  bg: props.theme.colors.offerColor,
  mx: scale(2.5),
  mb: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const OfferText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const OfferTextSingleOffer: any = styled.Text.attrs(props => ({
  color: props.theme.colors.white,
}))`
  font-size: ${moderateScale(16)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const OfferItemList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
  numColumns: 2,
  alignItems: 'center',
  width: scale(128),
}))`
  ${color}
  ${space}
  ${layout}
`;

export const EmptyView = styled.View`
  align-items: center;
  justify-content: center;
  width: ${scale(45)}px;
`;

export const InputContainer = styled.View.attrs(props => ({
  mb: verticalScale(5),
  px: scale(10),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const InputView = styled.View.attrs(() => ({
  width: '83%',
}))``;

export const Touchable = styled.TouchableOpacity``;

export const InputRightButtonView = styled.View.attrs(props => ({
  width: scale(48),
  height: scale(48),
  borderRadius: scale(24),
  alignItems: 'center',
  justifyContent: 'center',
  bg: props?.theme?.colors?.primary,
}))`
  ${layout}
  ${color}
`;

export const FlastList = styled.FlatList.attrs(() => ({
  showVerticalScrollIndicator: false,
  contentContainerStyle: {flexGrow: 1},
}))`
  ${color}
  ${space}
  ${layout}
`;

export const ModalContainerView = styled.View.attrs(() => ({
  p: scale(15),
}))`
  ${space}
`;

export const TradeModalContainerView = styled.View.attrs(() => ({
  pt: scale(10),
  pb: scale(20),
}))`
  ${space}
`;

export const AddRemoveModalContainerView = styled.View.attrs(() => ({
  pt: scale(10),
  pb: scale(20),
  height: scale(Dimensions.get('window').height / 2 + 100),
}))`
  ${space}
`;

export const SendOfferModalContainerView = styled.KeyboardAvoidingView.attrs(
  () => ({
    behavior: 'padding',
    pt: scale(10),
    pb: scale(20),
    minHeight: scale(Dimensions.get('window').height / 2 + 50),
    maxHeight: scale(Dimensions.get('window').height - 280),
  }),
)`
  ${space}
`;

export const ModalHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
}))`
  font-size: ${moderateScale(20)}px;
  font-family: Urbanist-Bold;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const ModalSubHeaderText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  text-align: center;
  ${color}
  ${space}
  ${layout}
`;

export const MoneyOfferText: any = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  my: scale(5),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  text-align: left;
  ${color}
  ${space}
  ${layout}
`;

export const TopMargin = styled.View.attrs(props => ({
  mt: verticalScale(props?.margin || 20),
}))`
  ${space}
`;

export const EditTradeModalStyle = {
  margin: 0,
  justifyContent: 'flex-end',
};

export const ScrollViewContainer = styled.ScrollView.attrs(() => ({}))``;

export const ItemsListView = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'always',
  contentContainerStyle: {flexGrow: 1, alignItems: 'flex-start'},
  numColumns: 2,
  mb: 10,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const AnimatedCheckBox = styled(BouncyCheckbox).attrs(props => ({
  disableText: true,
  size: scale(20),
  fillColor: props?.theme?.colors.primary,
  unfillColor: props?.theme?.colors.white,
  iconStyle: {
    borderRadius: 8,
  },
  innerIconStyle: {
    borderWidth: 0,
    borderRadius: 8,
    borderColor: props?.selected
      ? props?.theme?.colors.primary
      : props?.theme?.colors.black,
  },
}))`
  position: absolute;
  top: 10px;
  left: 10px;
  ${border}
`;

export const NoOffersLabel: any = styled.Text.attrs((props: any) => ({
  color: props.theme.colors.black,
  mt: verticalScale(10),
}))`
  font-size: ${moderateScale(18)}px;
  font-family: Urbanist-Bold;
  font-weight: 600;
  ${color}
  ${space}
  ${layout}
`;

export const NoOffersMessage: any = styled.Text.attrs((props: any) => ({
  color: props.theme.colors.black,
  my: verticalScale(10),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Urbanist;
  font-weight: 500;
  ${color}
  ${space}
  ${layout}
`;

export const SingleMoneyOfferContainer = styled.View.attrs(props => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(10),
  mr: scale(5),
  bg: props.theme.colors.offerColor,
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const SizeDropdownStyle = {
  width: scale(120),
};
export const ItemTextStyle = {
  fontSize: scale(13),
  fontFamily: 'Urbanist-Bold',
  fontWeight: '400',
  color: 'black',
};

export const PublicOfferDeleteContainer = styled.TouchableOpacity.attrs(
  props => ({
    border: 2,
    borderColor: '#F75555',
    borderRadius: 100,
    width: scale(75),
    height: scale(30),
  }),
)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  ${color}
  ${space}
  ${layout}
  ${border}
`;

export const DeleteText: any = styled.Text.attrs(props => ({
  color: '#F75555',
}))`
  font-size: ${scale(14)}px;
  font-family: Urbanist-SemiBold;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const PublicOfferAcceptContainer = styled.View.attrs(props => ({
  border: 2,
  backgroundColor: 'rgba(36, 192, 93, .10)',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '#24C05D',
  borderRadius: 100,
  width: scale(75),
  height: scale(30),
}))`
  ${border}
  ${space}
  ${color}
  ${layout}
`;

export const AcceptText: any = styled.Text.attrs(() => ({
  color: '#24C05D',
}))`
  font-size: ${scale(14)}px;
  font-family: Urbanist-SemiBold;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const MultiSizeTextContainer = styled.View.attrs(() => ({
  bg: 'white',
  borderRadius: 5,
  minWidth: scale(17),
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // for Android
}))`
  position: absolute;
  top: -4;
  right: -7;
  align-items: center;
  ${space}
  ${layout}
  ${color}
  ${border}
`;
export const SingleSizeTextContainer = styled.View.attrs(() => ({
  bg: 'white',
  borderRadius: 30,
  minWidth: scale(17),
  p: scale(2),
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // for Android
}))`
  position: absolute;
  top: -4;
  right: -7;
  align-items: center;
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const SizeText: any = styled.Text.attrs(() => ({
  color: 'black',
  padding: '2px',
}))`
  font-size: ${scale(12)}px;
  font-family: Urbanist-SemiBold;
  text-shadow-color: black;
  text-shadow-offset: {width: -2px, height: -2px};
  text-shadow-radius: 0;
  ${space}
  ${layout}
  ${color}
  ${border}
`;
