import React, { Component } from 'react'
import {
    Text, View,
    ActivityIndicator,
    ScrollView, Image
} from 'react-native'
import DaiiChiHeader from '../components/DaiiChiHeader'
import { requestListGifts } from '../constants/Api'
import reactotron from 'reactotron-react-native'
import R from '@R'

export default class PointScreen extends Component {
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
            response = await requestListGifts("deviceid")
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
                    title="Dùng điểm"
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
                <Text>abc</Text>
            </ScrollView>
        </View>)
    }
}
