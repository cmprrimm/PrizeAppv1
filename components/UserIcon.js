import { FontAwesome } from '@expo/vector-icons';
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';



function UserIcon({ navigation }) {

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() =>
                navigation.navigate('Acc')
            }>
                <FontAwesome name="user" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '85%',
        top: 70
    }
});

export default UserIcon;