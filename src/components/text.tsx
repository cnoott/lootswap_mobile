import {Text} from './styles';
import React, {FC} from 'react';
import {TextProps} from 'react-native';
import {useTheme} from 'styled-components';
import {Type} from '../enums';

interface InTextProps extends TextProps {
  fontSize?: number;
  color?: string;
  title?: string;
  type?: string;
  family?: string;
}

export const InText: FC<InTextProps> = React.memo(props => {
  const {fontSize, color, children, title, family} = props;
  return (
    <Text {...props} fontSize={fontSize} color={color} fontFamily={family}>
      {children || title}
    </Text>
  );
});

const getColor = (type: any, theme: any) => {
  let color = theme.colors.primary;
  switch (type) {
    case Type.Secondary:
      color = theme.colors.secondary;
      break;
    case Type.Placeholder:
      color = theme.colors.placeholder;
      break;
    default:
      break;
  }
  return color;
};
export const TextS: FC<InTextProps> = React.memo(props => {
  const {type} = props;
  const theme = useTheme();
  return <InText {...props} fontSize={11} color={getColor(type, theme)} />;
});

export const TextL: FC<InTextProps> = React.memo(props => {
  const {type} = props;
  const theme = useTheme();
  return <InText {...props} fontSize={14} color={getColor(type, theme)} />;
});

export const TextXL: FC<InTextProps> = React.memo(props => {
  const {type} = props;
  const theme = useTheme();
  return <InText {...props} fontSize={15} color={getColor(type, theme)} />;
});

export const TextXXXL: FC<InTextProps> = React.memo(props => {
  const {type} = props;
  const theme = useTheme();
  return <InText {...props} fontSize={20} color={getColor(type, theme)} />;
});

export const TextLX: FC<InTextProps> = React.memo(props => {
  const {type} = props;
  const theme = useTheme();
  return <InText {...props} fontSize={48} color={getColor(type, theme)} />;
});
