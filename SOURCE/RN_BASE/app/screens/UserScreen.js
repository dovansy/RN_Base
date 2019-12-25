import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import R from '@R'

export default class UserScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                {/* Block User info */}
                <View style={styles.user_info}>
                    <Image style={styles.profile_ficture}
                        source={R.images.ic_canhan} />
                    <View style={styles.block_thongtin}>
                        <View style={styles.text_block_name}>
                            <Text style={styles.text_hoten}>Nguyễn Thị Thu Phương </Text>
                            <Text style={styles.text_daily}> Đại lý</Text>
                        </View>
                        <Text style={styles.text_chinhsua}> Chỉnh sửa thông tin</Text>
                    </View>
                </View>
                {/* Block Content User 1 */}
                <View style={styles.content_block_1} >
                    {this._getFuncBlock("Đơn Hàng", R.images.ic_hoadon)}
                    {this._getFuncBlock("Cửa Hàng", R.images.ic_cuahang)}
                    {this._getFuncBlock("Lịch Sử Giao Dịch", R.images.ic_lichsu)}
                    {this._getFuncBlock("Trở Thành Đại Lý", R.images.ic_daily)}
                    {this._getFuncBlock("Thông Tin Bảo Hành", R.images.ic_baohanh)}
                    {this._getFuncBlock("Thông Tin DaiiChi", R.images.ic_infoApp)}
                    {this._getFuncBlock("Đăng Xuất", R.images.ic_dangxuat, true)}
                </View>
                {/* Block Content User 2 */}
                <View>

                </View>
            </View>
        )
    }

    // ham tra ve 1 view ( function block)
    // ham _ chi su dung trong component ban than, khong dung ra ngoai, local
    _getFuncBlock(title, imagePath, isLast = false) {
        return (
            <View>
                <View style={styles.content_block_func}>
                    <Image style={styles.img_func} source={imagePath} />
                    <Text style={styles.txt_func}> {title}</Text>
                    <Image style={styles.path} source={require('../assets/images/ic_path.png')} />
                </View>
                {!isLast && <View style={styles.line}></View>}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    // user info
    user_info: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    profile_ficture: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginLeft: 25,
        marginVertical: 12,
        marginRight: 11
    },
    block_thongtin: {
        flex: 1,
        justifyContent: 'center',
    },
    text_block_name: {
        width: '100%',
        flexDirection: 'row',
    },
    text_hoten: {
        flex: 1,
        fontSize: 18,
        color: '#000000',
        marginBottom: 5,
        fontFamily: 'Roboto-Medium'
    },
    text_daily: {
        textAlignVertical: "center",
        textAlign: 'center',
        backgroundColor: '#EA4335',
        marginRight: 10,
        paddingHorizontal: 9,
        paddingVertical: 3,
        fontSize: 17,
        borderRadius: 10,
        overflow: 'hidden',
        color: 'white',
        fontFamily: 'Roboto-Regular'
    },
    text_chinhsua: {
        fontSize: 14,
        color: '#707070',
        fontFamily: 'Roboto-Regular'
    },
    //content
    content_block_1: {
        flexDirection: 'column',
        marginBottom: 9,
        marginTop: 5,
        backgroundColor: 'white'
    },
    content_block_func: {
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 27,
        marginVertical: 12,
        alignItems: 'center'
    },
    img_func: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    },
    txt_func: {
        marginLeft: 17,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        flex: 1
    },
    path: {
        width: 10,
        height: 18
    },
    line: {
        height: 0.5,
        marginLeft: 30,
        marginRight: 27,
        backgroundColor: '#8B8B8B'
    }
});
