import React, { Component } from 'react'
import {
    Text, View, Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import R from '@R'
//import HeaderProduct from '~/components/HeaderProduct'
import reactotron from 'reactotron-react-native'
import { requestProduct } from '~/constants/Api'
import DaiiChiHeader from '~/components/DaiiChiHeader'

export default class ProductScreen extends Component {
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
                {this._listCategoryBlock()}
            </ScrollView>

        </View>)
    }

    _listCategoryBlock() {
        return (
            <View>
                {this.state.data.map(item => {
                    return this._categoryItem(item)
                })}
            </View>
        )
    }
    _categoryItem(item) {
        return (
            <View style={styles.block_category_main}>
                <ImageBackground source={{
                    uri: item.image
                }} style={styles.image_category} />
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity>
                            <View style={styles.block_name_category}>
                                <Text style={styles.txt_name_category}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.txt_descreption_category}>{item.description}</Text>
                        </View>
                    </View>
                </View>
            </View>)
    }
}

const styles = StyleSheet.create({
    block_name_category: {
        borderColor: 'white',
        borderWidth: 1.5,
        marginTop: 71,
        marginLeft: 24,
        width: 180,
        height: 39,
        paddingVertical: 5
    },
    txt_descreption_category: {
        marginLeft: 24,
        marginTop: 12,
        fontSize: 12,
        fontFamily: 'Roboto',
        color: 'white'
    },
    txt_name_category: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    image_category: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    block_category_main: {
        marginTop: 4,
        marginBottom: 2,
        width: '100%',
        height: 195,
    },
})