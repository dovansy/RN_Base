import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import DaiiChiHeader from '~/components/DaiiChiHeader'
import R from '@R'

export default class UpdateUserInfo extends Component {
    state = {
        fullName: 'Đỗ Văn Sỹ',
        phoneNumber: '0964781698',
        email: ''
    }
    render() {
        return (
            <View style={styles.container}>
                <DaiiChiHeader
                    title='Cập Nhật Tài Khoản'
                    back
                />
                <View style={styles.content_update_user}>
                    {/* input full name  */}
                    <TextInput
                        value={this.state.fullName}
                        placeholder='Họ và tên'
                        style={styles.txt_input}
                        onChangeText={newText => {
                            this.setState({
                                fullName: newText
                            })
                        }}
                    >
                    </TextInput>
                    {/* input phone number */}
                    <TextInput
                        value={this.state.phoneNumber}
                        placeholder='Số điện thoại'
                        style={styles.txt_input}
                        onChangeText={newText => {
                            this.setState({
                                phoneNumber: newText
                            })
                        }}
                    >
                    </TextInput>
                    {/* text input emmail */}
                    <TextInput
                        value={this.setState.email}
                        placeholder='email'
                        style={styles.txt_input}
                        onChangeText={newText => {
                            this.setState({
                                email: newText
                            })
                        }}
                    >
                    </TextInput>
                    {/* date time view  and sex */}
                    <View style={styles.block_date_picker}>
                        <Text style={styles.txt_date_picker}>
                            Ngày sinh
                        </Text>
                        <TextInput
                            placeholder='dd/mm/yy'
                            style={styles.txt_input}>
                            <Image
                                style={styles.img_date_picker}
                                source={R.images.ic_datepicker} />
                        </TextInput>
                    </View>
                    {/* sex */}
                    <View style={styles.block_date_picker}>
                        <Text style={styles.txt_date_picker}>Giới tính</Text>
                    </View>
                    {/* btn update */}
                    <TouchableOpacity
                        style={styles.btn_update}
                        onPress={() => {
                            this.setState({
                                fullName: '',
                                phoneNumber: '',
                                email: ''
                            })
                        }}
                    >
                        <Text style={styles.txt_update}>Cập Nhật</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EFEFEF'
    },
    content_update_user: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    txt_input: {
        height: 46,
        width: '90%',
        marginBottom: 5,
        marginHorizontal: 20,
        color: '#707070',
        borderColor: '#707070',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    btn_update: {
        height: 46,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12A74E',
        marginHorizontal: 25,
    },
    txt_update: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto'
    },
    block_date_picker: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
    },
    txt_date_picker: {
        fontSize: 16,
        color: '#707070',
    },
    img_date_picker: {
        width: 21,
        height: 21,
        justifyContent: 'flex-end'
    }
})
