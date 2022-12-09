import * as React from 'react';
import {StarIcon} from 'react-native-heroicons/outline';
import {StarIcon as StarIconSolid} from 'react-native-heroicons/solid';
import {moderateScale} from 'react-native-size-matters';
import {Container} from './styles';

interface RatingsProps {
  rating?: number;
  isProduct?: boolean;
}

function StarRatings(props: RatingsProps) {
  const {rating = 3} = props;
  return (
    <Container>
      {[...new Array(5).keys()].map(ratIndex => {
        if (rating > ratIndex) {
          return <StarIconSolid key={ratIndex} size={moderateScale(16)} />;
        } else {
          return <StarIcon key={ratIndex} size={moderateScale(16)} />;
        }
      })}
    </Container>
  );
}

export default StarRatings;
