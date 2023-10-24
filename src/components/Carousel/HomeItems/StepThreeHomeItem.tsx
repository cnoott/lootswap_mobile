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

export const LSHomeStepThreeCarouselItem: FC<HeaderProps> = React.memo(() => {
  const renderImages = () => {
    return (
      <>
        <FirstLeftImage>
          <Image source={HOME_CAROUSEL_SHOE_THREE} width={110} height={105} />
        </FirstLeftImage>
        <FirstRightImage>
          <Image source={HOME_CAROUSEL_SHOE_FOUR} width={110} height={105} />
        </FirstRightImage>
        <SecondLeftImage>
          <Image source={HOME_CAROUSEL_CLOTH_THREE} width={100} height={85} />
        </SecondLeftImage>
        <SecondRightImage>
          <Image source={HOME_CAROUSEL_CLOTH_FOUR} width={90} height={70} />
        </SecondRightImage>
      </>
    );
  };
  return (
    <Container>
      <HeaderText>
        <HeaderPrimaryText>Lowest</HeaderPrimaryText>{' '}
        {'seller fees in the Game'}
      </HeaderText>
      <HeaderBottomText>
        {"that's more profit for you to keep."}
      </HeaderBottomText>
      <OnlyText>ONLY A</OnlyText>
      <LSButton
        title={'6% platform fee'}
        size={Size.Fit_To_Width}
        type={Type.Primary}
        radius={10}
        onPress={() => {}}
        fitToWidth={'42%'}
        sizeFont={18}
      />
      <PayPalDesText>{'*Does not include PayPal processing fee'}</PayPalDesText>
      {renderImages()}
    </Container>
  );
});
