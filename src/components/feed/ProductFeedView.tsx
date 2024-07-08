import React, {FC, useEffect, useState} from 'react';
import {
  Container,
  ItemCenterContainer,
  Image,
  CarouselContainer,
  DotsComponent,
  DotsContainer,
} from './styles';
import {Dimensions, Alert as NativeAlert} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface ProductFeedViewProps {
  product: any;
}

const ProductFeedView: FC<ProductFeedViewProps> = React.memo((props => {
  const {product} = props;

  return (
    <Container height={height}>
      <CarouselContainer>
        <Carousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={height / 1.5}
          parallaxScrollingOffset={50} // What does this do again?
          autoPlay={false}
          keyExtractor={item => item._id}
          data={[
            product.primary_photo,
            ...product.secondary_photos,
          ]}
          renderItem={({index, item}) => (
            <>
              <ItemCenterContainer>
                <Image
                  width={'100%'}
                  height={'100%'}
                  source={{uri: item}}
                />
              </ItemCenterContainer>
            </>
          )}
        />
        <DotsContainer>
          <DotsComponent
            length={product.secondary_photos.length + 1}
            active={0}
          />
      </DotsContainer>
        </CarouselContainer>
      </Container>
  );

}));

export default ProductFeedView;
