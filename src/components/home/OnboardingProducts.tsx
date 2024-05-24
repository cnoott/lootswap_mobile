import React, {FC, useState, useEffect, useCallback} from 'react';
import {
  SectionContainer,
  SectionTopContainer,
  SectionTitleText,
  FlatList,
} from '../../screens/home/styles'
import LSButton from '../commonComponents/LSButton';
import {Size, Type} from '../../enums';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const OnboardingProducts: FC<{}> = () => {
  const navigation: NavigationProp<any, any> = useNavigation(); 

  return (
    <>
      <SectionContainer>
        <SectionTopContainer>
          <SectionTitleText>Popular Listings</SectionTitleText>
          <LSButton
            title={'View All'}
            size={Size.ViewSmall}
            type={Type.View}
            radius={20}
            onPress={() =>
              navigation?.navigate('AllListingsScreen', {
                hotItems: true,
              })
            }
          />
        </SectionTopContainer>
      </SectionContainer>

      <FlatList
        data={[...hotProducts, ...hotLoadingItems]} // TODO: loading items
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() + index + 'hot' : `loading-${index}`
        }
        onEndReached={() => hotOnEndReached()}
        horizontal={true}
        onEndReachedThreshold={0.5}
      />
    </>
  );
};

export default OnboardingProducts;
