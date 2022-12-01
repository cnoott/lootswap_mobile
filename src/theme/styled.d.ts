import 'styled-components';
import theme from './index';

type ThemeInterface = typeof theme;
type ThemeNewInterface = {
  width: number;
  type: string;
  size: string;
  height: number;
};

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface, ThemeNewInterface {}
}
