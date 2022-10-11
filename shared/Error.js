import { View, Text, StyleSheet } from 'react-native';
const Error = ({errorText}) => {
    return (
        <View style={styles.container}>
            <Text>
                {errorText} 
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightcoral',
        width: '90%',
        padding: 20,
        borderRadius: 8,
        textColor: 'white',
        alignItems: 'center',
    },
});

export default Error;
