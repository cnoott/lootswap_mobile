import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {layout, space} from 'styled-system';
import {verticalScale, scale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  justify-content: space-between;
  ${space}
  ${layout}
`;

export const EmptyTopView = styled.View``;

export const GoogleContainer = styled.View.attrs(() => ({
}))`
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
