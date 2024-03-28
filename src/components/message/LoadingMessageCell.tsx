import React, {FC, useEffect, useState} from 'react';
import {MessageBoxContainer, TimeText, MessageText} from './styles';
import {Animated, View, StyleSheet, Text} from 'react-native';
import {styles} from './styles';

/*
interface LSMessageCellProps {
  onPress?: Function;
  item: any;
  self?: boolean;
}
*/

const LoadingMessageCell: FC<LSMessageCellProps> = React.memo(props => {
  const [opacity] = useState(new Animated.Value(0.5)); // Initial opacity for blinking effect
  //const {item, onPress = () => {}, self = false} = props;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <MessageBoxContainer style={styles.container}>
      <Animated.View style={[styles.profilePicPlaceholder, {opacity}]} />
      <View style={{flex: 1}}>
        <Animated.View style={[styles.textPlaceholder, {opacity}]} />
        <Animated.View style={[styles.timePlaceholder, {opacity}]} />
      </View>
    </MessageBoxContainer>
  );
});

export default LoadingMessageCell;
