import { StyleSheet, Text, View, Image, Dimensions, Pressable } from 'react-native';

const HitCard = ({hit, navigation}) => (
    <View style={styles.container}>
    <Pressable 
        onPress={() => navigation.navigate('ProductPage', {
            productId: hit.objectID
        })}
    >
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: hit.primary_photo }}
                style={styles.image}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.brand}> {hit.brand} </Text>
            <Text> {hit.size} </Text> 
        </View>
        <View style={styles.info}>
            <Text style={styles.name}> {hit.name} </Text>
        </View>
        <View style={styles.priceContainer}>
            <Text style={styles.price}> ${hit.price} </Text>
        </View>
    </Pressable>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 4,
        width: '50%',
        paddingBottom: 20,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: Dimensions.get('window').width / 2 - 5,
        height: undefined,
        aspectRatio: 5/6,
        marginBottom: 10,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    brand: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    name: {
        marginTop: 4,
    },
    priceContainer: {
        marginHorizontal: 5,
        marginTop: 4,
    }
});

export default HitCard;
