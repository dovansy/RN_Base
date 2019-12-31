import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DaiiChiHeader from '~/components/DaiiChiHeader';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <DaiiChiHeader title='Trang chủ' />
            </View>
        );
    }
}
