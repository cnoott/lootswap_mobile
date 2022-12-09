import {ProfileContainerView, Image} from './styles';
import React, {FC} from 'react';
import {SvgXml} from 'react-native-svg';
import {PROFILE_PLACEHOLDER_ICON} from 'localsvgimages';
import {scale} from 'react-native-size-matters';

interface ProfileImageProps {
  profileUrl?: string;
  imageHeight?: number;
  imageWidth?: number;
  imageRadius?: number;
}

export const LSProfileImageComponent: FC<ProfileImageProps> = React.memo(
  imageProps => {
    const {
      profileUrl = '',
      imageHeight = 64,
      imageWidth = 64,
      imageRadius = 32,
    } = imageProps;
    return (
      <ProfileContainerView height={imageHeight} width={imageWidth}>
        <SvgXml
          xml={PROFILE_PLACEHOLDER_ICON}
          height={scale(imageHeight)}
          width={scale(imageWidth)}
        />
        {profileUrl && (
          <Image
            source={{uri: profileUrl}}
            height={imageHeight}
            width={imageWidth}
            borderRadius={imageRadius}
          />
        )}
      </ProfileContainerView>
    );
  },
);
