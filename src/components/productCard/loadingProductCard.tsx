import React, {FC, useEffect, useState} from 'react';
import {
  ItemContainer,
  EmptyView,
  CellBottomView,
  BottomHeaderView,
  EmptyRowView,
} from './styles';
import {Animated} from 'react-native';
import {scale} from 'react-native-size-matters';

const LoadingProductCard: FC<{}> = () => {
  const [opacity] = useState(new Animated.Value(1)); // Initial value for opacity: 1

  useEffect(() => {
    const blink = Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    const loop = Animated.loop(blink);
    loop.start();

    return () => loop.stop();
  }, []);

  const BlinkingImage = () => {
    return (
      <Animated.View
        style={{
          width: scale(185),
          height: scale(180),
          borderRadius: 10,
          backgroundColor: 'lightgrey',
          opacity,
        }}
      />
    );
  };

  const BlinkingTitle = () => {
    return (
      <Animated.View
        style={{
          width: 130,
          height: 12,
          borderRadius: 20,
          backgroundColor: 'grey',
          opacity,
        }}
      />
    );
  };

  const BlinkingBrand = () => {
    return (
      <Animated.View
        style={{
          width: 80,
          height: 12,
          borderRadius: 20,
          backgroundColor: 'grey',
          opacity,
          marginTop: 5,
        }}
      />
    );
  };


  return (
    <ItemContainer>
      <EmptyView>
        <BlinkingImage />
      </EmptyView>
      <CellBottomView>
        <BottomHeaderView>
          <EmptyRowView>
            <BlinkingTitle />
          </EmptyRowView>
        </BottomHeaderView>
        <BottomHeaderView isMiddle={true}>
          <EmptyRowView>
            <BlinkingBrand />
          </EmptyRowView>
        </BottomHeaderView>
      </CellBottomView>
    </ItemContainer>
  );
};

export default LoadingProductCard;


