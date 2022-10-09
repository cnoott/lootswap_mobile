import { View, StyleSheet, Text } from 'react-native';
import { StarIcon } from 'react-native-heroicons/outline';
import { StarIcon as StarIconSolid } from 'react-native-heroicons/solid';

const StarRating = ({ rating }) => {
    

    return (
        <View style={styles.container}>
            {[0, 1, 2, 3, 4].map(number => {
                if (rating  > number) {
                return(
                    <StarIconSolid key={number} size={15}/>
                )
                }
                else {
                    return (
                        <StarIcon key={number} size={15}/>
                    );
                }
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
});

export default StarRating;
