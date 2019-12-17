/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppNavigator from './navigation/AppNavigator';
import NavigationUtil from './navigation/NavigationUtil';
import { Provider } from "react-redux";
import store from "./redux/store";
import Reactotron from 'reactotron-react-native';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import codePush from "react-native-code-push";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => NavigationUtil.setTopLevelNavigator(navigatorRef)}
        />
      </Provider>
    )
  }


 constructor(properties) {
        super(properties);
        // OneSignal.init("6b13a5c4-571f-4244-b5f6-d220309f4f4d"); // android
        OneSignal.init("7e35ea0b-5a0c-4927-9da1-a3b3d094eafc"); // ios


        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        Reactotron.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        Reactotron.log('Message: ', openResult.notification.payload.body);
        Reactotron.log('Data: ', openResult.notification.payload.additionalData);
        Reactotron.log('isActive: ', openResult.notification.isAppInFocus);
        Reactotron.log('openResult: ', openResult);
    }

    onIds(device) {
        Reactotron.log('Device info: ', device);
    }

}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };



MyApp = codePush(codePushOptions)(App);

export default MyApp

