import React, {FC} from 'react';
import {StepOneContainer, StepOneImage, CenteredButton} from './styles';
import {REFER_FRIEND} from '../../../constants/imageConstants';
import LSButton from '../../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface HeaderProps {
  onItemPress?: string;
}

export const LSHomeStepOneCarouselItem: FC<HeaderProps> = React.memo(() => {
  const navigation: NavigationProp<any, any> = useNavigation();
  return (
    <StepOneContainer>
      <StepOneImage source={REFER_FRIEND} />
      <CenteredButton>
      <LSButton
        title={'Refer Now'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={10}
        onPress={() => navigation.navigate('ReferralScreen')}
        fitToWidth={'66%'}
        sizeFont={18}
      />
      </CenteredButton>
    </StepOneContainer>
  );
});
