import React, { Component } from 'react'
import { Text, View, StyleSheet,TextInput } from 'react-native'
import DaiiChiHeader from '~/components/DaiiChiHeader'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class UpdateUserInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DaiiChiHeader
                    title='Cập Nhật Tài Khoản'
                    back
                />
                <TextInput
                placeholder = 'Họ và Tên' 
                style = {styles.txt_input}>
                    
                </TextInput>
                <TextInput
                placeholder = 'Số điện thoại' 
                style = {styles.txt_input}>
                    
                </TextInput>
                <TouchableOpacity>
                    <Text>Cập Nhật</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    txt_input_name: {
        height: 50,
        width: '90%',
        backgroundColor: 'gray'
    }
})
