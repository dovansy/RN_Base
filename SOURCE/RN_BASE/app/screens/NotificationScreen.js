import React, { Component } from 'react'
import {
    Text, View, Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import R from '@R'
import DaiiChiHeader from '~/components/DaiiChiHeader'
import reactotron from 'reactotron-react-native'
import { requestNotification } from '../constants/Api'

export default class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            err: null,
            data: {},
        }
    }

    componentDidMount() {
        // lay du lieu
        this._getData()
    }

    _getData = async () => {
        try {
            response = await requestNotification("deviceid")
            reactotron.log(response)
            this.setState({
                isLoading: false,
                data: response.data
            })
        } catch (error) {
            this.setState({
                isLoading: false,
                err: error
            })
        }
    }

    render() {
        return (
            <View>
                <DaiiChiHeader
                    title="Thông báo"
                />
                {this._renderBody()}
            </View>
        )
    }
    _renderBody() {
        if (this.state.isLoading)
            return (<ActivityIndicator />)
        if (this.state.err)
            return (<Text>Đã có lỗi xảy ra, vui lòng thử lại</Text>)
        return (<View>
            <ScrollView>
                {this._NotifyBlock()}
            </ScrollView>
        </View>)
    }

    _NotifyBlock(data) {
        if (data = [])
            return (<Text style={{
                marginTop: 5,
                fontFamily: 'roboto',
                fontSize: 14,
                color: 'gray',
                textAlign: 'center'
            }}>Không có thông báo</Text>)
        return (
            <View style={{ backgroundColor: 'red', flex: 1, height: 71, }}>
                {this.state.data.data}
            </View>

        )
    }
}
const styles = StyleSheet.create({
})