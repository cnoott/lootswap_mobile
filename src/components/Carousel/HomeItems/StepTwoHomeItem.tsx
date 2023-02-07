import React, {FC} from 'react';
import LSButton from '../../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {
  Container,
  HeaderText,
  HeaderPrimaryText,
  HeaderBottomText,
  OnlyText,
  PayPalDesText,
  Image,
  FirstLeftImage,
  FirstRightImage,
  SecondLeftImage,
  SecondRightImage,
} from './styles';
import {
  HOME_CAROUSEL_CLOTH_THREE,
  HOME_CAROUSEL_CLOTH_FOUR,
  HOME_CAROUSEL_SHOE_THREE,
  HOME_CAROUSEL_SHOE_FOUR,
} from '../../../constants/imageConstants';

interface HeaderProps {
  onItemPress?: string;
}

export const LSHomeStepTwoCarouselItem: FC<HeaderProps> = React.memo(() => {
  const renderImages = () => {
    return (
      <>
        <FirstLeftImage>
          <Image source={HOME_CAROUSEL_SHOE_THREE} width={160} height={115} />
        </FirstLeftImage>
        <FirstRightImage>
          <Image source={HOME_CAROUSEL_SHOE_FOUR} width={160} height={115} />
        </FirstRightImage>
        <SecondLeftImage>
          <Image source={HOME_CAROUSEL_CLOTH_THREE} width={150} height={85} />
        </SecondLeftImage>
        <SecondRightImage>
          <Image source={HOME_CAROUSEL_CLOTH_FOUR} width={100} height={80} />
        </SecondRightImage>
      </>
    );
  };
  return (
    <Container>
      <HeaderText>
        <HeaderPrimaryText>Lowest</HeaderPrimaryText>{' '}
        {'seller fees in\n the Game'}
      </HeaderText>
      <HeaderBottomText>
        {"that's more profit for you\nto keep."}
      </HeaderBottomText>
      <OnlyText>ONLY A</OnlyText>
      <LSButton
        title={'6% platform fee'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={10}
        onPress={() => {}}
        fitToWidth={'55%'}
        sizeFont={24}
      />
      <PayPalDesText>{'*Does not include PayPal processing fee'}</PayPalDesText>
      {renderImages()}
    </Container>
  );
});
