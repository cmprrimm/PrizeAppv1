import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';



function SettingsIcon({ navigation }) {

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() =>
                navigation.navigate('Acc')
            }>
                <Ionicons name="md-settings" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: '85%',
        top: 70
    }
});

export default SettingsIcon;