import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const AddLoot = ({ navigation }) => {
    return(
        <View>
            <Text> This is the Add Loot page </Text>
        </View>
    );

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
            },
        });

};

export default AddLoot;

