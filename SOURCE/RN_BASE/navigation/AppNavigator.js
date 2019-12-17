import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import I18n from '../i18n/i18n';
import * as theme from "../constants/Theme";
import {
    Image
} from "react-native";
const TabBarComponent = props => <BottomTabBar {...props} />;

const Auth = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    ForgotPassword: ForgotPasswordScreen
})


const tabbarIcons = {
    Home: require("../assets/images/ic_home.png"),
    User: require("../assets/images/ic_user.png"),
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    const iconSource = tabbarIcons[routeName] || require("../assets/images/ic_home.png");
    const iconSize = focused ? 25 : 22;
    return (
        <Image
            source={iconSource}
            fadeDuration={0}
            style={{ tintColor: tintColor, width: iconSize, height: iconSize }}
        />
    );
};

const Main = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            title: I18n.t("home"),
            navigationOptions: {
                tabBarLabel: I18n.t("home"),
            },
        },
        User: {
            screen: UserScreen,
            title: I18n.t("user"),
            navigationOptions: {
                tabBarLabel: I18n.t("user"),
            },
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeBackgroundColor: theme.colors.bottombarBg,
            inactiveBackgroundColor: theme.colors.bottombarBg,
            inactiveTintColor: theme.colors.inactive,
            activeTintColor: theme.colors.active,
        },
        tabBarComponent: props => {
            return (
                <TabBarComponent
                    {...props}
                    onTabPress={props.onTabPress}
                    style={{
                        borderTopColor: theme.colors.borderTopColor,
                        backgroundColor: theme.colors.primary,
                        height: 58,
                    }}
                />
            );
        },
        initialRouteName :  'User'
    }

)


export default createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: Auth,
        Main: Main
    },
        {
            initialRouteName: 'Main'
        }
    )
)