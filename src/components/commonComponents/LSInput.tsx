import {InputContainer, ErrorText, TextInput, Touchable} from './LSInputStyles';
import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface LSInputProps extends TextInputProps {
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: Function;
  homeSearch?: boolean;
  filterSearch?: boolean;
  height?: number;
  horizontalSpace?: string;
  topSpace?: number;
  onBlurCall?: Function;
  keyboardType?: string;
  inputRadius?: number;
  defaultValue?: any;
  horizontalLeftPadding?: number;
  horizontalRightPadding?: number;
  rightCustomView?: any;
  textAlign?: string;
  maxLength?: number;
  onFocus?: Funciton;
}

const LSInput: FC<LSInputProps> = React.memo(props => {
  const {
    error,
    leftIcon,
    rightIcon,
    horizontalSpace,
    topSpace,
    inputBackColor,
    onRightIconPress = () => {},
    homeSearch = false,
    filterSearch = false,
    onBlurCall = () => {},
    keyboardType = 'default',
    inputRadius = 8.5,
    horizontalLeftPadding = 10,
    horizontalRightPadding = 10,
    rightCustomView = null,
    textAlign = 'left',
    maxLength = 10000000,
    onFocus = () => {},
  } = props;
  return (
    <>
      <InputContainer
        isHomeSearch={homeSearch || filterSearch}
        horizontalSpace={horizontalSpace}
        horizontalLeftPadding={horizontalLeftPadding}
        horizontalRightPadding={horizontalRightPadding}
        topSpace={topSpace}
        inputRadius={inputRadius}
        inputBackColor={inputBackColor}>
        {leftIcon && <SvgXml xml={leftIcon} />}
        <TextInput
          {...props}
          isHomeSearch={homeSearch}
          onBlur={onBlurCall}
          keyboardType={keyboardType}

          textAlign={textAlign}
          maxLength={maxLength}
          autoCapitalize={false}
          onFocus={() => onFocus()}
        />
        {rightIcon && (
          <Touchable onPress={onRightIconPress}>
            <SvgXml xml={rightIcon} />
          </Touchable>
        )}
        {rightCustomView && rightCustomView}
      </InputContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
});

export default LSInput;
