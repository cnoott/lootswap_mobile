import styled from 'styled-components/native';
import {border, color, layout, space} from 'styled-system';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;
export const ProfileContainerView = styled.View.attrs({
  width: scale(105),
  height: scale(105),
})`
  align-items: center;
  justify-content: center;
  align-self: center;
  ${space}
`;
export const Image = styled.Image.attrs({
  width: scale(100),
  height: scale(100),
  borderRadius: scale(50),
})`
  position: absolute;
  align-self: center;
  ${color}
  ${space}
${layout}
`;
export const UserNameText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: 10,
  mb: 20,
}))`
  font-size: ${moderateScale(24)}px;
  font-family: Urbanist-Bold;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;

export const StarContainer = styled.View`
  flex-direction: row ${space};
  justify-content: center;
`;

export const CommentsText = styled.Text.attrs(props => ({
  color: props.theme.colors.text,
  my: 10,
  mt: 30,
}))`
  font-size: ${moderateScale(17)}px;
  font-family: Urbanist-Bold;
  align-self: center;
  ${color}
  ${space}
  ${layout}
`;
