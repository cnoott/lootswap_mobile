import styled from 'styled-components/native';
import {color, layout, space} from 'styled-system';
import {moderateScale, scale} from 'react-native-size-matters';

export const Container = styled.View.attrs(() => ({
  my: moderateScale(5),
}))`
  ${space};
`;

export const SubContainer = styled.View.attrs(() => ({
  margin: moderateScale(15),
  flex: 1,
}))`
  ${space}
  ${layout}
`;

export const Image = styled.Image.attrs(props => ({
  height: props?.height,
  width: props?.width,
}))`
  ${color}
  ${space}
  ${layout}
`;

export const TopView = styled.View.attrs(() => ({
  flex: 1,
}))`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${space}
  ${layout}
`;

export const EmptyRowView = styled.View.attrs(() => ({}))`
  flex-direction: row;
  align-items: center;
  ${space}
  ${layout}
`;

export const UserNameText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  ml: scale(10),
  maxWidth: scale(185),
}))`
  font-size: ${moderateScale(15)}px;
  font-family: Urbanist-Bold;
  ${color}
  ${space}
  ${layout}
`;

export const RatingText = styled.Text.attrs(props => ({
  color: props.theme.colors.text_light,
  my: scale(10),
}))`
  font-size: ${moderateScale(13)}px;
  font-family: Urbanist;
  ${color}
  ${space}
  ${layout}
`;

export const TimeText = styled.Text.attrs(props => ({
  color: props.theme.colors.greySubDetails,
  mb: scale(10),
}))`
  font-size: ${moderateScale(10)}px;
  font-family: Urbanist;
  ${color}
  ${space}
  ${layout}
`;
