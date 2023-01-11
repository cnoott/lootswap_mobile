import styled from 'styled-components/native';
import {Dimensions, Platform} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {moderateScale, scale} from 'react-native-size-matters';
import {layout, space, color} from 'styled-system';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
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
    width: scale(20),
    height: scale(3),
    left: (Dimensions.get('window').width / 3 - scale(20)) / 2,
  },
  indicatorContainerStyle: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelStyle: {
    color: props?.theme?.colors?.black,
    fontWeight: '400',
    fontSize: scale(14),
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
  font-size: ${moderateScale(15)}px;
  font-family: Inter-Bold;
  font-weight: 400;
  ${color}
  ${space}
  ${layout}
`;

export const TabContainer = styled.View.attrs((props: any) => ({
  flex: 1,
  backgroundColor: props.theme.colors.bg,
}))`
  ${space}
`;

export const PurchasesListView = styled.FlatList.attrs(() => ({
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

export const SalesListView = styled.FlatList.attrs(() => ({
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
