import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import PickAvatar from '../components/Avatar.js';

class HomeScreen extends React.Component {
    state = { user: {} };
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({ user: user });
            }
        })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
                <View style={styles.container}>
                    <Text style={styles.userGreeting}>Hi!, {this.state.user.email}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                firebase.auth().signOut();
                            }} >
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '85%'
    },
    buttonContainer: {
        width: '86%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 10,
        width: '86%',
    },
    userGreeting: {
        position: 'absolute',
        top: 100,
        fontSize: 20,
        fontWeight: 'bold',
    }

});
export default HomeScreen;