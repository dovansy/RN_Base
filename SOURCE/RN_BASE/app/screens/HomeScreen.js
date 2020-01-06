import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import R from '@R'
import DaiiChiHeader from '~/components/DaiiChiHeader';
import axios from 'axios'
// import { styles } from '~/constants/Theme';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            err: false,
            data: {}
        };
    }

    componentDidMount() {
        this._getData()
    }

    _getData() {
        console.log("Bat dau lay du lieu tu api")
        axios.get("http://winds.hopto.org:8521/api/Service/GetHomeScreen?deviceID=ahi", {
            headers: {
                token: "65FD62931DE65C0F2F0EC18B28F78456"
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                isLoading: false,
                dataCustomer: res.data.data.customerInfo,
                dataProduct: res.data.data.listProduct
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                isLoading: false,
                err: err
            })
        })
    }

    render() {
        return (
            <View>
                <DaiiChiHeader title='Xin chao,' />
                {/* <Text>{this.state.data.customerName}</Text> */}
                {this._renderBody()}
            </View>
        );
    }
    _renderBody() {
        if (this.state.isLoading)
            return (<ActivityIndicator />)
        if (this.state.err)
            return (<Text>Đã có lỗi xảy ra</Text>)
        return (
            <SafeAreaView >
                <ScrollView >
                    {/* block content function home screen */}
                    <View style={styles.block_point}>
                        <View style={styles.content_block_point}>
                            <View style={styles.content_block_point_1}>
                                <View style={styles.txt_score}>
                                    <Text style={styles.txt_point}>Điểm tích lũy</Text>
                                </View>
                                <View style={styles.number_point}>
                                    <Image style={styles.img_point} source={R.images.ic_coin} />
                                    <Text style={styles.txt_number_point}>{this.state.dataCustomer.point}</Text>
                                    <Image style={styles.img_point} source={R.images.ic_path} />
                                </View>

                            </View>
                            <View style={styles.line}></View>
                            {/* block 1 function point */}
                            <View style={styles.block_func_point_row}>
                                {this._getFuncPoint("Tích điểm", R.images.ic_cal_point)}
                                {this._getFuncPoint("Sử dụng điểm", R.images.ic_use_point)}
                                {this._getFuncPoint("Tiện ích", R.images.ic_utilities)}
                            </View>
                            {/* block 2 function point */}
                            <View style={styles.block_func_point_row}>
                                {this._getFuncPoint("Hỏi - đáp", R.images.ic_q_and_a)}
                                {this._getFuncPoint("Đặt hàng", R.images.ic_order)}
                                {this._getFuncPoint("Bảo hành", R.images.ic_warranty)}
                            </View>
                        </View>
                    </View>
                    {/* block content product */}
                    <View style={{ marginTop: 7, backgroundColor: '#FFFFFF', height: 269 }}>
                        <Text style={styles.block_product}>SẢN PHẨM</Text>
                        <ScrollView horizontal={true}>
                            <View style={styles.list_product}>
                                <Image style={{ width: 100, height: 100 }} source={{ uri:this.state.dataProduct.image }}></Image>
                                <Text style={styles.txt_name_product}>{this.state.dataProduct.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 13.5, height: 13.5 }} source={R.images.ic_price} />
                                    <Text style={styles.txt_price_product}>{this.state.dataProduct.price} đ</Text>
                                </View>
                            </View>
                            <View style={styles.list_product}>

                            </View>
                            <View style={styles.list_product}>

                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    _getFuncPoint(title, imgPath) {
        return (
            <View>
                <View style={styles.block_func_point}>
                    <Image style={styles.img_func_point} source={imgPath} />
                    <Text style={styles.txt_title_func}>{title}</Text>
                </View>
            </View>
        )
    }
    _getProduct(img, name, price) {
        return (
            <View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    block_point: {
        width: '93.5%',
        height: 185,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 13,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    // view line
    line: {
        width: '95.5%',
        height: 0.5,
        backgroundColor: '#8B8B8B'
    },
    // view block function
    txt_point: {
        fontFamily: 'Roboto',
        fontSize: 16,
        marginLeft: 8,
    },
    content_block_point: {
        alignItems: 'center',
        marginTop: 8,
        flexDirection: 'column',

    },
    content_block_point_1: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
    },
    txt_score: {
        flex: 1
    },
    number_point: {
        paddingRight: 8,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    txt_number_point: {
        marginLeft: 8,
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#EA4335'
    },
    img_point: {
        width: 15.5,
        height: 15.5
    },
    img_func_point: {
        width: 36,
        height: 36,
        marginTop: 13.5,
        marginHorizontal: 44
    },
    block_func_point: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    block_func_point_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt_title_func: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#020202',
        marginTop: 2
    },
    // block product
    block_product: {
        fontSize: 16,
        fontFamily: 'Roboto',
        marginTop: 13,
        marginLeft: 18,
        color: '#000000'
    },
    list_product: {
        marginLeft: 18,
        marginTop: 8,
        borderColor: '#707070',
        borderWidth: 0.5,
        borderRadius: 10,
        width: 150,
        height: 210,
        marginRight: 10,
        flexDirection: 'column'
    },
    txt_name_product: {
        fontFamily: 'Roboto',
        fontSize: 15,
        color: '#000000'
    },
    txt_price_product: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: '#F70029'
    }
})