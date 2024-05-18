import React, {FC} from 'react';
import {StepOneContainer, StepOneImage} from './styles';
import {REFER_FRIEND} from '../../../constants/imageConstants';

interface HeaderProps {
  onItemPress?: string;
}

export const LSHomeStepOneCarouselItem: FC<HeaderProps> = React.memo(() => {
  return (
    <StepOneContainer>
      <StepOneImage source={REFER_FRIEND} />
    </StepOneContainer>
  );
});
