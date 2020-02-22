import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import HomeScreen from '@screen/HomeScreen';
import UserScreen from '@screen/UserScreen';
import ProductScreen from '@screen/product/ProductScreen';
import { SCREEN_ROUTER } from '@constant'
import R from '@R';
import * as theme from "@theme";

import {
    Image
} from "react-native";
import UpdateUserInfo from '~/screens/user/UpdateUserInfo';
import PointScreen from '~/screens/PointScreen';
import NotificationScreen from '~/screens/NotificationScreen';
const TabBarComponent = props => <BottomTabBar {...props} />;

const Auth = createStackNavigator({
    [SCREEN_ROUTER.LOGIN]: LoginScreen,
    [SCREEN_ROUTER.REGISTER]: RegisterScreen,
    [SCREEN_ROUTER.FORGOT_PASS]: ForgotPasswordScreen
})


const tabbarIcons = {
    [SCREEN_ROUTER.HOME]: R.images.ic_home,
    [SCREEN_ROUTER.PRODUCT]: R.images.ic_sanpham,
    [SCREEN_ROUTER.POINT]: R.images.ic_dungdiem,
    [SCREEN_ROUTER.NOTIFICATION]: R.images.ic_thongbao,
    [SCREEN_ROUTER.USER]: R.images.ic_user,
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    const iconSource = tabbarIcons[routeName] || R.images.ic_home;
    const iconSize = focused ? 25 : 22;
    return (
        <Image
            source={iconSource}
            fadeDuration={0}
            style={{ tintColor: tintColor, width: iconSize, height: iconSize }}
        />
    );
};




const bottomBar = createBottomTabNavigator(
    {
        [SCREEN_ROUTER.HOME]: {
            screen: HomeScreen,
            title: R.strings.home,
            navigationOptions: {
                tabBarLabel: R.strings.home,
            },
        },
        [SCREEN_ROUTER.PRODUCT]: {
            screen: ProductScreen,
            title: R.strings.product,
            navigationOptions: {
                tabBarLabel: R.strings.product,
            },
        },
        [SCREEN_ROUTER.POINT] : {
            screen: PointScreen,
            title: R.strings.point,
            navigationOptions: {
                tabBarLabel: R.strings.point,
            },
        },
        [SCREEN_ROUTER.NOTIFICATION] :{
            screen: NotificationScreen,
            title: R.strings.notification,
            navigationOptions: {
                tabBarLabel: R.strings.notification,
            },
        },
        [SCREEN_ROUTER.USER]: {
            screen: UserScreen,
            title: R.strings.user,
            navigationOptions: {
            tabBarLabel: R.strings.user,

            }
        }
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

        initialRouteName: 'Home'
    }

)

const Main = createStackNavigator({
    bottomBar: bottomBar,
    [SCREEN_ROUTER.UPDATE_USER_INFO] : UpdateUserInfo

}, {
    defaultNavigationOptions: {
        header: null,
    },
})




export default createAppContainer(
    createSwitchNavigator({
        [SCREEN_ROUTER.AUTH_LOADING]: AuthLoadingScreen,
        [SCREEN_ROUTER.AUTH]: Auth,
        [SCREEN_ROUTER.MAIN]: Main
    },
        {
            initialRouteName: SCREEN_ROUTER.AUTH_LOADING
        }
    )
)
