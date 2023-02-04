import * as React from 'react';
import {useTheme} from 'styled-components';
import {StarIcon} from 'react-native-heroicons/outline';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';
import {moderateScale} from 'react-native-size-matters';
import {Container} from './styles';

interface RatingsProps {
  rating?: number;
  isProduct?: boolean;
  starColor?: string;
}

function StarRatings(props: RatingsProps) {
  const theme = useTheme();
  const {rating = 3, starColor = theme?.colors?.primary} = props;
  return (
    <Container>
      {[...new Array(5).keys()].map(ratIndex => {
        if (rating > ratIndex) {
          return (
            <StarIconSolid
              key={ratIndex}
              size={moderateScale(16)}
              color={starColor}
            />
          );
        } else {
          return <StarIcon key={ratIndex} size={moderateScale(16)} />;
        }
      })}
    </Container>
  );
}

export default StarRatings;
