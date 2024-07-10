import React, {FC, useEffect, useState} from 'react';
import {
  Container,
  ItemCenterContainer,
  Image,
  CarouselContainer,
  DotsComponent,
  DotsContainer,
  ProductInfoContainer,
  RowView,
  BrandText,
  PriceText,
  TimeText,
  NameText,
  LabelText,
  ReadDescText,
} from './styles';
import {Dimensions, Alert as NativeAlert} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {scale} from 'react-native-size-matters';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

interface ProductFeedViewProps {
  product: any;
}

const ProductFeedView: FC<ProductFeedViewProps> = React.memo(props => {
  const {product} = props;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Container height={height * 0.9}>
      <CarouselContainer>
        <Carousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={true}
          width={width}
          height={height / 1.53}
          parallaxScrollingOffset={50} // What does this do again?
          autoPlay={false}
          keyExtractor={item => item._id}
          onSnapToItem={newIndex => setActiveIndex(newIndex)}
          data={[product.primary_photo, ...product.secondary_photos]}
          renderItem={({index, item}) => (
            <>
              <ItemCenterContainer>
                <Image width={'100%'} height={'100%'} source={{uri: item}} />
              </ItemCenterContainer>
            </>
          )}
        />
        <DotsContainer>
          <DotsComponent
            length={product.secondary_photos.length + 1}
            active={activeIndex}
          />
        </DotsContainer>
      </CarouselContainer>
      <ProductInfoContainer>
        <RowView>
          <BrandText>{product.brand}  <TimeText>2d ago</TimeText></BrandText>
          <PriceText>${parseFloat(product.price).toFixed(2)}</PriceText>
        </RowView>
        <RowView>
          <NameText>{product.name}</NameText>
        </RowView>
        <RowView>
          <LabelText>Condition: <NameText>{product.condition}</NameText></LabelText>
        </RowView>
        <RowView>
          <LabelText>Size: <NameText>{product.size}</NameText></LabelText>
        </RowView>
        <RowView>
          <ReadDescText>Read Description</ReadDescText>
        </RowView>
      </ProductInfoContainer>
    </Container>
  );

});

export default ProductFeedView;
