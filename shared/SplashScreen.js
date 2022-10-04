import React, { useRef, useEffect } from 'react';
import Icon from '../assets/icon.png';
import { View, Animated, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start();
    },[fadeAnim]);

    return(
        <Animated.View style={{ ...styles.container, opacity: fadeAnim }}>
            <Image 
                source={Icon} 
                style={{ height: 100, width: 100}}
            />
        </Animated.View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default SplashScreen;
