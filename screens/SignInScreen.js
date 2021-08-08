import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";

class SignInScreen extends React.Component {
    state = { email: '', password: '', errorMessage: '', loading: false };
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
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(this.onLoginSuccess.bind(this))
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    this.onLoginFailure.bind(this)('Weak Password!');
                } else {
                    this.onLoginFailure.bind(this)(errorMessage);
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
                                Log In!
                            </Text>
                            <View style={styles.form}>
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
                            </View>
                            {this.renderLoading()}
                            <Text
                                style={{
                                    top: 10,
                                    fontSize: 18,
                                    textAlign: "center",
                                    color: "red",
                                    width: "80%"
                                }}
                            >{this.state.error}</Text>
                            <View style={{ marginTop: 20 }}>
                                <Text
                                    style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "blue" }}
                                    onPress={() => {
                                        this.props.navigation.navigate("SignUp");
                                    }}
                                >
                                    Forgotten Password?
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.signInWithEmail()}>
                                <Text style={{ color: "black", fontWeight: "bold" }} > Sign In</Text>
                            </TouchableOpacity>


                            <View style={{ marginTop: 50 }}>
                                <Text
                                    style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "black" }}
                                    onPress={() => {
                                        this.props.navigation.navigate("SignUp");
                                    }}
                                >
                                    Don't have an Account?
                                </Text>
                            </View>


                        </KeyboardAvoidingView>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
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
    form: {
        width: 320,
        marginTop: 100,
    },
    logo: {

        marginTop: 20
    },
    input: {
        fontSize: 20,
        borderBottomWidth: 1,
        paddingBottom: 1,
        marginTop: 25.5,

    },

    button: {
        alignItems: 'center',
        backgroundColor: "lightblue",
        top: 30,
        bottom: 20,
        padding: 10,
        height: 40,
        borderRadius: 10,

    },

    pageTitle: {
        left: '27.5%',
        fontSize: 32,
        fontWeight: '700',
        color: 'black',
        borderColor: 'black',
        position: 'absolute',
        top: 50,

    },

});
export default SignInScreen;