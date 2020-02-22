import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';
import NavigationUtil from '../../navigation/NavigationUtil';
import { GoogleSignin , statusCodes} from '@react-native-community/google-signin';
import reactotron from 'reactotron-react-native'
GoogleSignin.configure();
import {requestLogin} from '~/constants/Api'
import AsyncStorage from '@react-native-community/async-storage'


export default class LoginScreen extends Component {

    state = {
        isLoading: false,
        err: null,
        data: {},
        inputName: '0123456789',
        inputPass: '0123456789'
    }

    // Somewhere in your code
    _ggLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            console.log(userInfo)
            NavigationUtil.navigate("Main")

        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    _fbLogin() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log(data.accessToken.toString())
                            NavigationUtil.navigate("Main")
                        }
                    )
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {this._loginBlock()}
                <TouchableOpacity
                    onPress={() => {
                        this._fbLogin()
                    }}>
                    <Text> Facebook Login </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        marginTop: 50
                    }}
                    onPress={() => {
                        this._ggLogin()
                    }}>
                    <Text> Google Login </Text>
                </TouchableOpacity>

            </View>
        );
    }


    _loginBlock() {
        return (<View style={style.login}>
            <TextInput
                placeholder='Tài khoản'
                style={style.username}
                value={this.state.inputName}
                onChangeText={name => {
                    this.setState({
                        ...this.state,
                        inputName: name
                    })
                }}
            >
            </TextInput>

            <TextInput
                placeholder='Mật khẩu'
                style={style.username}
                value={this.state.inputPass}
                onChangeText={pass => {
                    this.setState({
                        ...this.state,
                        inputPass: pass
                    })
                }}>

            </TextInput>

            <TouchableOpacity
                onPress={() => {
                    // alert(`Tài khoản : ${this.state.inputName}
                    // Mật khẩu :  ${this.state.inputPass}`)
                    this._loginWithUsername()
                }}
            >
                <Text>Đăng nhập</Text>
            </TouchableOpacity>
        </View>)
    }

    _loginWithUsername = async () => {
        try {
            response = await requestLogin({
                "value": this.state.inputName,
                "password": this.state.inputPass,
                "type": "4"
            })
            token = response.data.token;
            await AsyncStorage.setItem("token", token)
            NavigationUtil.navigate("Main")

            reactotron.log(response)
        } catch (error) {
            reactotron.log(error)
        }
    }



}

const style = StyleSheet.create({
    login: {
        width: '100%',
        alignItems: 'center'
    },
    username: {
        width: '80%',
        height: 50,
        margin: 10,
        backgroundColor: 'gray'
    }
})