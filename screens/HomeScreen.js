import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

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
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.userGreeting}>Hi!, {this.state.user.email}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                firebase.auth().signOut();
                            }} >
                            <Text style={{ color: 'white' }}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue'
    },
    buttonContainer: {
        width: '86%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "black",
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