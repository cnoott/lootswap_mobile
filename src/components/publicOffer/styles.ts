import styled from 'styled-components/native';
import {Dimensions, Platform} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {scale} from 'react-native-size-matters';
import {layout, space, color, border} from 'styled-system';
import {StyleSheet} from 'react-native';

export const HomePublicOfferCard = styled.TouchableOpacity.attrs(props => ({
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
export const PublicOfferItemContainer = styled.View.attrs((props: any) => ({
  px: scale(10),
}))`
  ${space}
  ${border}
  ${layout}
`;

export const BottomRowView = styled.View.attrs((props: any) => ({
  mt: scale(props?.topMargin || 20),
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  ${space}
`;

export const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: scale(10),
  },
  userDetailsPlaceholder: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileImagePlaceholder: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'lightgrey',
    marginRight: scale(10),
  },
  profileImagePlaceholderSmall: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'lightgrey',
    marginRight: scale(10),
  },
  userNamePlaceholder: {
    width: scale(100),
    height: scale(12),
    backgroundColor: 'grey',
    borderRadius: scale(6),
    marginRight: 'auto',
  },
  offerDetailsPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: scale(5),
  },
  offerPlaceholder: {
    width: scale(135),
    height: scale(135),
    backgroundColor: 'lightgrey',
    borderRadius: scale(10),
    marginHorizontal: scale(5),
  },
  homeImagePlaceholderWrapper: {
    alignItems: 'center', // This will center the rectangle above the image
    //marginHorizontal: scale(20.1), // Adds horizontal margin between the image wrappers
    padding: scale(0.5),
  },
  homeImagePlaceholder: {
    width: scale(98),
    height: scale(98),
    borderRadius: 10,
    backgroundColor: 'darkgrey',
  },
  homeTextPlaceholder: {
    width: scale(100), // Set the width less than the image to look like a label
    height: scale(10), // Set a smaller height for the rectangle shape
    backgroundColor: 'darkgrey', // Your desired color for the rectangle
    marginBottom: scale(5), // Space between the rectangle and the image
    borderRadius: scale(5), // Optional: if you want rounded corners
  },
});
