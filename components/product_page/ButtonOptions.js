import { View, Text, Pressable, StyleSheet } from 'react-native';



const ButtonOptions = ({ product }) => {
    const TradeButton = () => (
        <View style={styles.containerTrade}>
            <Pressable style={styles.tradeButton}> 
                <Text style={styles.tradeText}>Send Offer</Text>
            </Pressable>
        </View>
    );

    const BuyButton = () => (
        <View style={styles.containerBuy}>
            <Pressable style={styles.buyButton}> 
                <Text style={styles.buyText}>Buy Now</Text>
            </Pressable>
        </View>
    );
    /* 
    if (!product.isVisible) {
        return (
        <View style={styles.containerBuy}>
            <Pressable style={styles.buyButton}> 
                <Text style={styles.buyText}>Item no longer avaliable </Text>
            </Pressable>
        </View>
        );
    }

    if

*/
    return (
        <View>
            <BuyButton/>
            <TradeButton/>
        </View>
        
    );
};

const styles = StyleSheet.create({
    containerTrade: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10
    },
    containerBuy: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    tradeButton: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#6267fe',
        borderRadius: 8,
        width: '100%'
    },
    tradeText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 15,
        fontFamily: 'Inter-Black',
    },

    buyButton: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        borderRadius: 8,
        width: '100%'
    },
    buyText: {
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 15,
        fontFamily: 'Inter-Black',
    },

    
});

export default ButtonOptions;
