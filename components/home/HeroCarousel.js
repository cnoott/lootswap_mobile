import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import mocaLows from '../../assets/moca-lows.png';
import ysl from '../../assets/ysl.png';
import redOctobers from '../../assets/red.png';

const SlideOne = () => (
    <View
        style={styles.slide}
    >
        <Image source={mocaLows} style={styles.image}/>
        <Text style={styles.title}>
            Swap Clothing and Sneakers Safely and Securely
        </Text>
    </View>

);

const SlideTwo = () => (
    <View
        style={styles.slide}
    >
        <Image source={ysl} style={styles.image}/>
        <Text style={styles.title}>
            Swap Clothing and Sneakers Safely and Securely
        </Text>
    </View>

);

const SlideThree = () => (
    <View
        style={styles.slide}
    >
        <Image source={redOctobers} style={styles.image}/>
        <Text style={styles.title}>
            Swap Clothing and Sneakers Safely and Securely
        </Text>
    </View>

);

const RenderItem = ({index}) => {
    if (index === 0) {
        return (<SlideOne/>);
    }
    else if (index === 1 ) {
        return (<SlideTwo/>);
    }
    else if (index === 2) {
        return (<SlideThree/>);
    }
};

const HeroCarousel = ({ navigation }) => {
    const width = Dimensions.get('window').width;


    return (
        <View style={styles.container}>
            <Carousel
                loop
                pagingEnabled={true}
                width={width}
                height={width / 2 + 50}
                autoPlay={true}
                autoPlayInterval={6000}
                data={[...new Array(3).keys()]}
                scrollAnimationDuration={1000}
                renderItem={({ index }) => (<RenderItem index={index}/>)}
            />
        </View>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    slide: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    image: {
        width: Dimensions.get('window').width -10,
        height: Dimensions.get('window').width /2 - 10 ,
        marginTop: 5,
        resizeMode: 'cover'

    },
    title: {
        fontSize: 20,
        padding: 5,
        fontFamily: 'Inter-Black',
        justifyContent: 'flex-end',
        justifyContent: 'center'
    },
});


export default HeroCarousel;
