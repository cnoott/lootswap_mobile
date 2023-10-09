import styled from 'styled-components/native'
import {layout, space, color, border, backgroundColor} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.white,
}))`
  ${space}
  ${layout}
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

export const StepContainer = styled.View.attrs(() => ({
  px: scale(4),
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const ChosenStockxProductsFlatList = styled.FlatList.attrs(() => ({
  showsVerticalScrollIndicator: true,
  //contentContainerStyle: {flexGrow: 1},
}))`
  ${space}
  ${layout}
`;

export const TopButtonContainer = styled.View.attrs(() => ({
  pt: scale(8),
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const BrowsePublicOffersContainer = styled.View.attrs(() => ({
  bg: 'white',
  height: '100%',
}))`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const PublicOffersFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingBottom: 200,
  },
  height: '100%',
  paddingBottom: scale(300),
}))`
  padding-bottom: 300px;
  ${color}
  ${space}
  ${layout}
`;

export const MoneyContainer = styled.View.attrs(() => ({
}))`
  ${space}
  ${layout}
`;

export const Spacing = styled.View.attrs(() => ({
  mb: scale(20),
}))`
  ${space}
  ${layout}
`;

export const OfferScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingBottom: 200,
  },
}))`
  ${color}
  ${space}
  ${layout}
`;
