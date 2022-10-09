import { View, Text, StyleSheet } from 'react-native';

const Badges = ({ type }) => {
    if (type === 'trade-sell') {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 6 }}>
                <View style={styles.tradeContainer}>
                    <Text style={ styles.tradeText }> Trade </Text>
                </View>

                <View style={styles.sellContainer}>
                    <Text style={styles.sellText}> Sell </Text>
                </View>           
            </View>
        );
    }
    else if (type === 'trade-only') {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 6 }}>
                <View style={styles.tradeContainer}>
                    <Text style={ styles.tradeText }> Trade </Text>
                </View>
            </View>
        );
    }
    else if (type === 'sell-only') {
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 6 }}>
                <View style={styles.sellContainer}>
                    <Text style={styles.sellText}> Sell </Text>
                </View>           
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    sellContainer: {
        backgroundColor: '#FDF6B2',
        borderRadius: 10,
        width: 55,
        padding: 3
    },

    sellText: {
        color: '#723B13',
        alignItems: 'center',
        textAlign: 'center',
    },

    tradeContainer: {
        backgroundColor: '#E1EFFE',
        borderRadius: 10,
        textAlign: 'center',
        width: 66,
        padding: 3,
        marginRight: 9,
    },

    tradeText: {
        color: '#4862B2',
        alignItems: 'center',
        textAlign: 'center',
    },
});

export default Badges;
