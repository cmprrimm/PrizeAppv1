import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker'



class SignUpScreen extends React.Component {
    state = { displayName: '', email: '', password: '', errorMessage: '', loading: false, dateOfBirth: "" };
    onLoginSuccess() {
        this.props.navigation.navigate('App');
    }
    onLoginFailure(errorMessage) {
        this.setState({ error: errorMessage, loading: false });
    }
    renderLoading() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size={'large'} />
                </View>
            );
        }
    }
    async signInWithEmail() {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(newUser => {
                firebase.database().ref("users").child(newUser.user.uid).set({
                    displayName: this.state.displayName,
                    email: this.state.email,
                    password: this.state.password,
                    dateOfBirth: this.state.dateOfBirth,
                });
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email': {
                        alert('Please insert an email address')
                        break;
                    }
                    case 'auth/invalid-password': {
                        alert('6 or more characters for password')
                        break;

                    }
                }
            });
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <Text style={styles.pageTitle}>
                            Sign Up!
                        </Text>
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Name"
                                placeholderTextColor="black"
                                returnKeyType="next"
                                textContentType="name"
                                value={this.state.displayName}
                                onChangeText={displayName => this.setState({ displayName })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="black"
                                returnKeyType="next"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="black"
                                returnKeyType="done"
                                textContentType="newPassword"
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                            <DatePicker
                                style={{ width: '86%', top: 20 }}
                                date={this.state.dateOfBirth}
                                mode="date"
                                placeholder="Date-Of-Birth"
                                format="YYYY-MM-DD"
                                minDate="1900-05-01"
                                maxDate="2005-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,

                                    },
                                    dateInput: {
                                        marginLeft: 36,
                                        borderColor: 'black',

                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(dateOfBirth) => { this.setState({ dateOfBirth: dateOfBirth }) }}
                            />
                        </View>
                        {this.renderLoading()}
                        <Text
                            style={{
                                top: 10,
                                fontSize: 18,
                                textAlign: 'center',
                                color: 'red',
                                width: '80%'
                            }}
                        >
                            {this.state.error}
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.signInWithEmail()}
                        >
                            <Text style={{ justifyContent: 'center', color: "white" }} >Sign Up</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 40 }}>
                            <Text
                                style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "black" }}
                                onPress={() => {
                                    this.props.navigation.navigate('SignIn');
                                }}
                            >
                                Already have an account?
                            </Text>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'skyblue'
    },
    form: {
        width: '86%',
        marginTop: 100
    },
    logo: {
        marginTop: 20
    },
    input: {
        fontSize: 20,
        borderColor: '#707070',
        borderBottomWidth: 1,
        paddingBottom: 1.5,
        marginTop: 25.5
    },
    button: {
        alignItems: "center",
        backgroundColor: "black",
        top: 30,
        bottom: 20,
        padding: 10,
        height: 40,
        borderRadius: 10,
        width: '86%',
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        height: 44,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#707070'
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: 'black',
        position: 'absolute',
        top: 50,

    }
});
export default SignUpScreen;