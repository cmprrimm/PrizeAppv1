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
                        alert('Please fill out all details correctly!')
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
                <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding">
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
                                <Text style={styles.dobText}>Date - of - Birth
                                    <DatePicker
                                        style={{ width: '50%', left: 120 }}
                                        date={this.state.dateOfBirth}
                                        mode="date"
                                        placeholder=" "
                                        format="DD-MM-YYYY"
                                        minDate="01-05-1900"
                                        maxDate="01-06-2005"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            placeholder: {
                                                color: "black"
                                            },
                                            dateIcon: {
                                                top: 9,
                                                padding: 5,
                                                width: 30,

                                            },
                                            dateInput: {
                                                width: 90,
                                                top: 14,
                                                marginLeft: 20,
                                                borderColor: 'transparent',
                                                fontWeight: 'bold',
                                                color: 'black',

                                            }
                                        }}
                                        onDateChange={(dateOfBirth) => { this.setState({ dateOfBirth: dateOfBirth }) }}
                                    />
                                </Text>
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
                                <Text style={{ justifyContent: 'center', color: "black", fontWeight: 'bold' }} >Sign Up</Text>
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
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback >
        );
    }
}
const styles = StyleSheet.create({
    container: {

        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: '85%'
    },
    form: {
        alignItems: 'center',
        marginTop: 100,
    },
    logo: {

        marginTop: 20
    },
    input: {
        fontSize: 20,
        borderBottomWidth: 1,
        paddingBottom: 5,
        marginTop: 25.5,
        width: '80%'
    },
    dobText: {
        left: 0,
        right: 10,
        fontSize: 20,
        marginTop: 15,
        borderBottomWidth: 1,
        width: '80%',
        bottom: 10
    },
    button: {
        left: 40,
        width: '80%',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: "lightblue",
        justifyContent: 'center',
        bottom: 30,
        padding: 10,
        height: 40,
        borderRadius: 10,
    },

    pageTitle: {
        left: '35%',
        fontSize: 32,
        fontWeight: '700',
        color: 'black',
        position: 'absolute',
        top: 50,

    },

});
export default SignUpScreen;