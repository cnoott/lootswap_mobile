import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {LSProfileImageComponent} from '../commonComponents/profileImage';
import {LSTradeButton} from '../commonComponents/LSTradeButton';
import {PROFILE_TRIPPLE_DOT_ICON} from 'localsvgimages';
import {
  Container,
  TopView,
  EmptyRowView,
  UserNameText,
  RatingText,
  TimeText,
} from './styles';
import {scale} from 'react-native-size-matters';

interface RatingComponentProps {
  ratingData?: any;
}

const RatingComponent = (props: RatingComponentProps) => {
  const {ratingData} = props;
  return (
    <Container>
      <TopView>
        <EmptyRowView>
          <LSProfileImageComponent
            profileUrl={''}
            imageHeight={48}
            imageWidth={48}
            imageRadius={24}
          />
          <UserNameText>Darlene Robertson</UserNameText>
        </EmptyRowView>
        <EmptyRowView>
          <LSTradeButton
            label={`${'\u2605'} ${ratingData}`}
            isSelected={false}
            paddingX={8}
            paddingY={3}
          />
          <SvgXml
            xml={PROFILE_TRIPPLE_DOT_ICON}
            height={scale(20)}
            width={scale(20)}
          />
        </EmptyRowView>
      </TopView>
      <RatingText>
        The item is very good, my son likes it very much and wearing it every
        day 💯💯💯{' '}
      </RatingText>
      <TimeText>6 days ago</TimeText>
    </Container>
  );
};

export default RatingComponent;
