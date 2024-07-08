import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  HOME_RIGHT_PERSON_ONE,
  HOME_RIGHT_PERSON_TWO,
  HOME_LEFT_PERSON_ONE,
  HOME_LEFT_PERSON_TWO,
} from 'localsvgimages';
import {
  Container,
  StepThreeHeaderText,
  HeaderPrimaryText,
  StepTwoSubText,
  Image,
  RightPersonOneContainer,
  RightPersonTwoContainer,
  LeftPersonOneContainer,
  LeftPersonTwoContainer,
  TopAreaContainer,
  VerticalSpace,
} from './styles';
import {HOME_CAROUSEL_MIDDLE} from '../../../constants/imageConstants';
import {scale} from 'react-native-size-matters';

export const LSHomeStepTwoCarouselItem: FC<any> = React.memo(() => {
  return (
    <Container>
      <StepThreeHeaderText>All Traded Items Are</StepThreeHeaderText>
      <HeaderPrimaryText> Authenticated</HeaderPrimaryText>
      <StepTwoSubText>
        Any items you trade get sent to our authentication center so you dont
        get scammed.
      </StepTwoSubText>
      <Image
        source={HOME_CAROUSEL_MIDDLE}
        width={scale(309)}
        height={scale(125)}
      />
      <VerticalSpace space={scale(40)} />
      <RightPersonTwoContainer>
        <SvgXml xml={HOME_RIGHT_PERSON_TWO} />
      </RightPersonTwoContainer>
      <RightPersonOneContainer>
        <SvgXml xml={HOME_RIGHT_PERSON_ONE} />
      </RightPersonOneContainer>

      <LeftPersonOneContainer>
        <SvgXml xml={HOME_LEFT_PERSON_TWO} />
      </LeftPersonOneContainer>
      <LeftPersonTwoContainer>
        <SvgXml xml={HOME_LEFT_PERSON_ONE} />
      </LeftPersonTwoContainer>
    </Container>
  );
});
