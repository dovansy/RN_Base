import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
} from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil'

// import { connect } from 'react-redux'

export default class AuthLoadingScreen extends Component {

    componentDidMount() {
        // load something and check login
        setTimeout(() => {
            NavigationUtil.navigate("Login");
        },200);

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
