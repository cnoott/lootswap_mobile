import {LoaderContainer} from './LSLoaderStyles';
import React, {FC} from 'react';
import Spinner from 'react-native-spinkit';
import {useTheme} from 'styled-components';

interface LSInputProps {
  isVisible?: boolean;
}

const LSLoader: FC<LSInputProps> = React.memo(props => {
  const theme = useTheme();
  const {isVisible} = props;
  if (isVisible) {
    return (
      <LoaderContainer>
        <Spinner
          isVisible={true}
          size={60}
          type={'ChasingDots'}
          color={theme.colors.primary}
        />
      </LoaderContainer>
    );
  } else {
    return null;
  }
});

export default LSLoader;
