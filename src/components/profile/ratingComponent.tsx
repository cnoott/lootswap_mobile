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
            profileUrl={ratingData.userId.profile_picture}
            imageHeight={48}
            imageWidth={48}
            imageRadius={24}
          />
          <UserNameText>{ratingData.userId.name}</UserNameText>
        </EmptyRowView>
        <EmptyRowView>
          <LSTradeButton
            label={`${'\u2605'} ${ratingData.rating}`}
            isSelected={false}
            paddingX={8}
            paddingY={3}
          />
        </EmptyRowView>
      </TopView>
      <RatingText>{ratingData.description}</RatingText>
    </Container>
  );
};

export default RatingComponent;
