import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import LSButton from '../../commonComponents/LSButton';
import {Size, Type} from 'custom_enums';
import {SWAP_ICON_HOME_CAROASAL} from 'localsvgimages';
import {
  Container,
  HeaderText,
  VerticalSpace,
  SwapContainer,
  SwapIconContainer,
  Image,
  BottomLeftContainer,
  BottomRightContainer,
  BottomText,
} from './styles';
import {
  CASH_BALENCE,
  HOME_CAROUSEL_CLOTH_ONE,
  HOME_CAROUSEL_CLOTH_TWO,
  HOME_CAROUSEL_SHOE_ONE,
  HOME_CAROUSEL_SHOE_TWO,
  VERIFY_TRADES,
} from '../../../constants/imageConstants';

interface HeaderProps {
  onItemPress?: string;
}

export const LSHomeStepOneCarouselItem: FC<HeaderProps> = React.memo(() => {
  const renderSwapTopView = () => {
    return (
      <SwapContainer>
        <Image source={HOME_CAROUSEL_SHOE_ONE} width={96} height={67.5} />
        <SwapIconContainer>
          <SvgXml xml={SWAP_ICON_HOME_CAROASAL} />
        </SwapIconContainer>
        <Image source={HOME_CAROUSEL_SHOE_TWO} width={96} height={67.5} />
      </SwapContainer>
    );
  };
  const renderSwapBottomView = () => {
    return (
      <SwapContainer>
        <Image source={HOME_CAROUSEL_CLOTH_ONE} width={80} height={91} />
        <SwapIconContainer>
          <SvgXml xml={SWAP_ICON_HOME_CAROASAL} />
        </SwapIconContainer>
        <Image source={HOME_CAROUSEL_CLOTH_TWO} width={80} height={91} />
      </SwapContainer>
    );
  };
  const renderLeftBottomView = () => (
    <BottomLeftContainer>
      <Image source={VERIFY_TRADES} width={40} height={40} />
      <BottomText>All trades are 100% verified</BottomText>
    </BottomLeftContainer>
  );
  const renderRightBottomView = () => (
    <BottomRightContainer>
      <Image source={CASH_BALENCE} width={40} height={40} />
      <BottomText>Add cash to balance deals</BottomText>
    </BottomRightContainer>
  );
  return (
    <Container>
      <HeaderText>Swap Sneakers & Clothing</HeaderText>
      <VerticalSpace space={5} />
      <LSButton
        title={'Safely & Securely'}
        size={Size.Custom}
        type={Type.Primary}
        radius={6}
        onPress={() => {}}
        sizeFont={14}
        customWidth={130}
        customHeight={34}
      />
      {renderSwapTopView()}
      {renderSwapBottomView()}
      <SwapContainer>
        {renderLeftBottomView()}
        {renderRightBottomView()}
      </SwapContainer>
      <VerticalSpace space={5} />
    </Container>
  );
});
