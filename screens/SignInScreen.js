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
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <Text style={styles.pageTitle}>
                            LOG IN!
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

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.signInWithEmail()}>
                            <Text style={{ justifyContent: 'center', color: "white" }} > Sign In</Text>
                        </TouchableOpacity>


                        <View style={{ marginTop: 40 }}>
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
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: 'skyblue'
    },
    form: {
        width: "86%",
        marginTop: 200
    },

    input: {
        fontSize: 20,
        borderColor: "#707070",
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
    pageTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: 'black',
        position: 'absolute',
        top: 50,

    },
});
export default SignInScreen;