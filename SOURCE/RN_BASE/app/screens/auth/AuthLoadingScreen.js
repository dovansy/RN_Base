import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
} from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@constant'
import AsyncStorage from '@react-native-community/async-storage'
import i18 from '@i18';

// import { connect } from 'react-redux'

export default class AuthLoadingScreen extends Component {

    componentDidMount() {
        // load something and check login

        setTimeout(async() => {
            try {
                token = await AsyncStorage.getItem('token')
                // alert(token)
                if(token && token.length > 0 ){
                    NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
                }else{
                    NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
                }
            } catch (error) {
                NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
            }
        }, 1000);


    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View>
                    <ActivityIndicator />
                </View>
            </SafeAreaView>
        )
    }



}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

// export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
