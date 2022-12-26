import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';

const productImageWidth = 130;

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))``;

export const TopTabView = styled(TabView).attrs(() => ({
  flex: 1,
}))``;

export const CustomTabBar = styled(TabBar).attrs(props => ({
  indicatorStyle: {
    backgroundColor: props?.theme?.colors?.primary,
    width: scale(20),
    height: scale(3),
    left: (Dimensions.get('window').width / 2 - scale(20)) / 2,
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
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;

export const TabContainer = styled.View.attrs(() => ({
  flex: 1,
  backgroundColor: '#E5E5E5',
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
  ${border}
`;

export const OffersListView = styled.FlatList.attrs(() => ({
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
  font-family: Inter-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const DesignationLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
  mt: verticalScale(2),
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const TimeLabel: any = styled.Text.attrs(props => ({
  color: props.theme.colors.greySecondary,
}))`
  font-size: ${moderateScale(14)}px;
  font-family: Inter;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyRowView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 55%;
`;

export const BottomRowView = styled.View.attrs(() => ({
  mt: scale(20),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  ${space}
`;

export const Image: any = styled.Image.attrs((props: any) => ({
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

export const ImageContainer: any = styled.View.attrs((props: any) => ({
  height: scale(props?.size ? props?.size : productImageWidth),
  width: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  bg: props.theme.colors.grey,
  mx: scale(2.5),
  mb: scale(5),
}))`
  align-items: center;
  justify-content: center;
  ${layout} ${color} ${space};
`;

export const ImageContainerDouble: any = styled.View.attrs((props: any) => ({
  height: scale(props?.size ? props?.size : productImageWidth),
  width: scale(props?.size ? props?.size : productImageWidth),
  borderRadius: scale(10),
  bg: props.theme.colors.grey,
  bottom: 0,
  right: 0,
}))`
  align-items: center;
  justify-content: center;
  position: absolute;
  ${layout} ${color} ${space};
`;

export const OfferItemContainer = styled.View.attrs(() => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
  borderRadius: scale(10),
  mr: scale(5),
}))`
  ${layout} ${color} ${space};
`;

export const OfferItemContainerCenter = styled.View.attrs(() => ({
  height: scale(productImageWidth),
  width: scale(productImageWidth),
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
  height: scale(productImageWidth),
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
  px: scale(8),
  py: scale(7),
  borderRadius: scale(20),
  bg: props.theme.colors.offerColor,
  top: 20,
  right: 0,
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
  font-family: Inter-Bold;
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
