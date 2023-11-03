import React, {FC, useEffect, useRef} from 'react';
import {AnimatedBadge} from './cellBadgeStyles';
import {Animated} from 'react-native';

interface CellBadgeProps {
  top?: Number;
  left?: Number;
}

const CellBadge: FC<CellBadgeProps> = (props) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const {left = -3, top = -3} = props;


  useEffect(() => {
    const blinkingAnimation = Animated.loop(
      Animated.sequence([
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
      ]),
    );

    blinkingAnimation.start();

    return () => blinkingAnimation.stop();
  }, [opacity]);

  return (
    <AnimatedBadge
      style={{opacity}}
      top={top}
      left={left}
    />
  );
};

export default CellBadge;
