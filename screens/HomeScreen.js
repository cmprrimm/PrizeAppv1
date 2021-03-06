import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import UserIcon from '../components/UserIcon';
import SettingsIcon from '../components/SettingsIcon';



class HomeScreen extends React.Component {

    state = {
        user: [],
        userData: [],

    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref('users/' + user.uid).on('value', (snapshot) => {
                if (user != null) {
                    const user = snapshot.val();
                    this.setState({
                        user, userData: user
                    });
                }
            });

        });

    }



    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
                <SettingsIcon navigation={this.props.navigation} />
                <UserIcon navigation={this.props.navigation} />
                <View style={styles.container}>
                    <Text style={styles.userGreeting}>Hi, {this.state.user.displayName}</Text>
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
        top: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
    userEmail: {
        position: 'absolute',
        top: 60,
        fontSize: 15,
        color: 'gray',
    }

});
export default HomeScreen;