import React, { useEffect, useState } from 'react';
import { getProduct } from '../../api/apiProduct';
import { getUser } from '../../api/apiUser';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useUserContext, useUpdateIsHome } from '../../shared/UserContext';
import Svg, { Path } from 'react-native-svg'
import { ArrowSmallLeftIcon } from 'react-native-heroicons/solid';
import { ShieldCheckIcon } from 'react-native-heroicons/outline';
import ButtonOptions from './ButtonOptions';
import StarRating from './StarRating';
import Badges from './Badges';

const BackIcon = () => {
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="black"
                viewBox="0 0 51 24"
            >
                <Path d="M15.75 19.5 8.25 12l7.5-7.5" />
            </Svg>
        );
};


// TODO:
// - Clickable user profile
// - bubbles pagination
// - put all itesm will be shipped by ups piority

const ProductPage = ({ navigation, route }) => {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);

    const [productUser, setProductUser] = useState({});
    const [userRating, setUserRating] = useState(0);

    const { productId } = route.params;

    useEffect(() => {
        getProduct(productId).then(async productData => {
            setProduct(productData);

            let allImages = [productData.primary_photo];
            await productData.secondary_photos.map(secondary_photo => allImages.push(secondary_photo));
            setImages(allImages);

            getUser(productData.userId).then(userData => {
                setProductUser(userData);
                let sum = 0;
                userData.ratings.forEach(rating => {
                    sum = sum + rating.rating;
                });
                const rating = sum / userData.ratings.length;
                setUserRating(rating);
            });

        });


    },[]);

    return (
        <View>
            <ScrollView>
                <View style={styles.imagesContainer}>
                    <Carousel
                        loop={false}
                        mode={'parallax'}
                        modeConfig={{
                            parallaxScrollingScale: 0.93,
                            parallaxScrollingOffset: 50,
                        }}
                        parallaxScrollingOffset={50}
                        width={width}
                        height={height * .60}
                        data={images}
                        scrollAnimationDuration={500}
                        onSnapToItem={(index) => console.log('current index:', index)}
                        renderItem={({ index }) => (
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                <Image
                                    source={{ uri: images[index] }}
                                    style={{ width: undefined, height: undefined, flex: 1}}
                                />

                            </View>
                        )}
                    />
                </View>


                <View style={styles.textContainer}>
                    <Pressable style={styles.goBackContainer} onPress={() => navigation.goBack()}>
                        <ArrowSmallLeftIcon color='blue'  size={20}/> 
                        <Text style={{ marginTop: 2, color: 'blue' }}> Go Back </Text>
                    </Pressable>
                    <Text style={styles.titleText}>{product.brand}</Text>
                    <Badges type={product?.type}/>
                    <Text style={styles.info}>{product.name}</Text>
                    <Text style={styles.info}>Size: {product.size}</Text>
                    <Text style={styles.info}>Condition: {product.condition}</Text>
                    <Text style={styles.price}>${product.price}</Text>

                    <ButtonOptions product={product}/>

                    <View style={styles.priceProtection}>
                        <ShieldCheckIcon size={40} color='purple'/>
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}> 
                                Buyer Protection Guarantee
                            </Text>
                            <Text style={{ fontWeight: 'normal', fontSize: 12 }}> Purchases are covered by PayPal Purchase Protection </Text>
                        </View>

                    </View>

                    <View style={styles.profileContainer}>
                        <View style={styles.pfp}>
                        <Image
                            source={{ uri: productUser.profile_picture }}
                            style={{ width: 50, height: 50  }}
                        />

                        </View>
                            <View>
                                <Text style={styles.userName}> {productUser.name}</Text>
                                {productUser?.ratings?.length !== 0 ? (<StarRating rating={userRating}/>) : <Text style={{ color: 'gray' }}> New Seller, Rating not avaliabe </Text>}
                            </View>
                    </View>

                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10}}> Description </Text>
                    <Text style={{ marginBottom: 50 }}> {product.description} </Text>

                </View>

            </ScrollView>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imagesContainer: {
        position: 'relative',
        marginBottom: 2,
    },

    goBackContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: -10
    },

    textContainer: {
        marginHorizontal: 20
    },
    titleText: {
        fontFamily: 'Inter-Black',
        fontSize: 21,
        marginBottom: 5,
    },
    info: {
        marginBottom: 5,
        fontSize: 15,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5
    },

    priceProtection: {
        alignItems: 'center',
        flex: 0, flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
    },

    profileContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
    },

    pfp: {
        borderRadius: 40,
        width: 50,
        overflow: 'hidden',
    },
    userName: {
        fontFamily: 'Inter-Black',
        fontSize: 15,
    },
    rating: {
        fontSize: 13,
    },
});

export default ProductPage;
