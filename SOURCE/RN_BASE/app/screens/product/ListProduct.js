import React, { Component } from 'react'
import {
    Text, View,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import DaiiChiHeader from '~/components/DaiiChiHeader'

export default class ListProduct extends Component {
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
            response = await requestProduct("deviceid")
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
                    title= "Sản phẩm"
                    back
                />
                {this._renderBody()}
            </View>
        )
    }

    _renderBody() {
        if (this.state.isLoading)
            return (<ActivityIndicator />)
        // if (this.state.err)
        //     return (<Text>Đã có lỗi xảy ra, vui lòng thử lại</Text>)
        return (<View>
            <ScrollView>
                {this._listProductBlock()}
            </ScrollView>
        </View>)
    }
    _listProductBlock(){
        return (
            <View>
                <Text>asd</Text>
            </View>
        )
    }
}
