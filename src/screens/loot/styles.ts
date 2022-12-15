import styled from 'styled-components/native';
import {layout, space} from 'styled-system';

export const Container = styled.View.attrs(props => ({
  flex: 1,
  backgroundColor: props.theme.colors.secondary,
}))`
  ${space}
  ${layout}
`;
