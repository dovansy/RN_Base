import React, { Component } from 'react';
import {
    View, Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import DaiiChiHeader from '../components/DaiiChiHeader';
import R from '@R'
import { requestHomeData } from '../constants/Api';
import reactotron from 'reactotron-react-native';


export default class HomeScreen extends Component {
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
            response = await requestHomeData("deviceid")
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
                    title="Xin chào,"
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
                {this._funcBlock()}
                {this._productBlock()}
                {this._newsBlock()}
            </ScrollView>
        </View>)
    }

    _funcBlock() {
        return (
            <View style={styles.block_point}>
                <View style={styles.content_block_point}>
                    <View style={styles.content_block_point_1}>
                        <View style={styles.txt_score}>
                            <Text style={styles.txt_point}>Điểm tích lũy</Text>
                        </View>
                        <View style={styles.number_point}>
                            <Image style={styles.img_point} source={R.images.ic_coin} />
                            <Text style={styles.txt_number_point}>{this.state.data.customerInfo.point}</Text>
                            <Image style={styles.img_point} source={R.images.ic_path} />
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    {/* block 1 function point */}
                    <View style={styles.block_func_point_row}>
                        <TouchableOpacity>
                            {this._getFuncPoint("Tích điểm", R.images.ic_cal_point)}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this._getFuncPoint("Sử dụng điểm", R.images.ic_use_point)}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this._getFuncPoint("Tiện ích", R.images.ic_utilities)}
                        </TouchableOpacity>
                    </View>
                    {/* block 2 function point */}
                    <View style={styles.block_func_point_row}>
                        <TouchableOpacity>
                            {this._getFuncPoint("Hỏi - đáp", R.images.ic_q_and_a)}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this._getFuncPoint("Đặt hàng", R.images.ic_order)}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {this._getFuncPoint("Bảo hành", R.images.ic_warranty)}
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
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

    _productBlock() {
        return (<View style={{
            marginTop: 20,
            marginLeft: 18,
            width: "100%",
            height: 270,
            backgroundColor: 'white',
        }}>
            <View
                style={{
                    paddingRight: 38,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: "Roboto"
                }}>Sản phẩm</Text>
                <Text style={{
                    paddingTop: 2,
                    fontSize: 12,
                    color: 'red',
                    fontFamily: "Roboto"
                }}>Tất cả</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    paddingRight: 20,
                }}>
                <ScrollView
                    horizontal={true}>
                    {this.state.data.listProduct.map(product => {
                        return this._productItem(product)
                    })}
                </ScrollView>
            </View>
        </View>)
    }
    
    _productItem(product) {
        return (<View style={styles.block_item}>
            <Image
                style={styles.img_item_product}
                source={{
                    uri: product.image
                }}
            />
            <Text style={{
                paddingVertical: 6,
                paddingHorizontal: 7,
            }}>{product.name}</Text>
            <View style={styles.img_item_price}>
                <Image
                    style={styles.img_price}
                    source={R.images.ic_price}
                />
                <Text style={{
                    color: 'red',
                }}>{product.price} đ</Text>
            </View>
        </View>)
    }


    _newsBlock() {
        return (<View>
            <View style={{
                marginTop: 5,
                marginLeft: 18
            }}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: "Roboto",
                }}>Tin Tức</Text>
            </View>

            {this.state.data.listNews.map(news => {
                return this._listNews(news)
            })}
            <View style={{
                height: 165
            }}>
            </View>
        </View>)
    }
    _listNews(news) {
        return (
            <View style={styles.block_news}>
                <View style={{
                    flexDirection: 'row'
                }} >
                    <Image style={styles.img_news}
                        source={{
                            uri: news.urlImage
                        }} />
                    <View style={{
                        flexDirection: 'column',
                        paddingHorizontal: 13,
                    }}>
                        <View style={{
                            width: 239,
                            height: 41
                        }}>
                            <Text>
                                {news.title}
                            </Text>
                        </View>
                        <Text>
                            {news.date}
                        </Text>
                    </View>

                </View>
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
    },
    // block item
    block_item: {
        width: 150,
        height: 210,
        marginTop: 8,
        marginRight: 10,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    img_item_product: {
        width: 150,
        height: 120,
        resizeMode: 'contain'
    },
    img_item_price: {
        color: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    img_price: {
        width: 14,
        height: 14,
        margin: 12
    },
    // block newspaper
    block_news: {
        width: 343,
        height: 91,
        marginTop: 13,
        marginLeft: 18,
        marginRight: 14
    },
    img_news:{
        width: 91,
        height: 91,
        borderRadius: 10,
        resizeMode: 'cover'
    },
})