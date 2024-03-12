import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {layout, space, color, border} from 'styled-system';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

export const MainContent = styled.View.attrs(props => ({
  backgroundColor: props.theme.colors.white,
  flex: 1,
}))`
  ${color}
  ${space}
  ${layout}
`;
export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
  ${color}
  ${space}
  ${layout}
`;

export const EmptyTopView = styled.View``;

export const GoogleContainer = styled.View.attrs(() => ({}))`
  ${space}
  ${layout}
`;

export const TopSpaceView = styled.View`
  margin-top: ${verticalScale(30)}px;
`;

export const EmptyBottomView = styled.View`
  margin-bottom: ${verticalScale(20)}px;
`;

export const Innercontainer: ViewStyle = {
  flex: 1,
};

export const AutocompleteStyles = {
  textInputContainer: {
    paddingHorizontal: scale(23),
    paddingVertical: scale(15),
  },
  container: {
    marginBottom: scale(28),
    zIndex: 999,
  },
  textInput: {
    padding: scale(10),
    backgroundColor: '#f5f5f5',
    height: scale(46),
    borderRadius: scale(8),
    fontFamily: 'Urbanist',
    paddingLeft: scale(20),
  },
  listView: {
    position: 'absolute',
    top: scale(57),
    left: scale(25),
    right: scale(25),
  },
};

export const DisclaimerView = styled.View.attrs((props: any) => ({
  mt: verticalScale(5),
  borderWidth: 0.5,
  borderRadius: scale(20),
  borderColor: props.theme.colors.protectionBorder,
  p: scale(12),
  overflow: 'hidden',
  mx: scale(22),
}))`
  flex-direction: row;
  align-items: center;
  ${space} ${border} ${color};
`;

export const GuarenteedDesView = styled.View.attrs(() => ({
  ml: scale(16),
  flex: 1,
  mx: 20,
}))`
  ${space};
  ${border}
  ${layout}
`;

export const DisclaimerTopLabel = styled.Text.attrs(props => ({
  color: props.theme.colors.lightGrey,
  ml: scale(10),
  width: '95%',
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist-Medium;
  ${color}
  ${space}
  ${layout}
`;
