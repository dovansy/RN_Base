import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Header } from 'react-native-elements'
import R from '~/assets/R';
import NavigationUtil from '~/navigation/NavigationUtil';

class DaiiChiHeader extends Component {
    render() {
        return (
            <Header
            // status bar
                statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
                placement='left'
                containerStyle={styles.Header}
                leftComponent={this.props.back &&
                    <TouchableOpacity
                        onPress={() => {
                            NavigationUtil.goBack()
                        }}
                    >
                        <Image style={{
                            width: 24,
                            height: 17
                        }} source={R.images.ic_back} />
                    </TouchableOpacity>
                }
                centerComponent={<Text style={styles.txt_title_header}>{this.props.title}</Text>}
            />
        )
    }
}

export default DaiiChiHeader;

const styles = StyleSheet.create({
    //header
    Header: {
        backgroundColor: '#12A74E',
    },
    txt_title_header: {
        fontSize: 18,
        color: 'white',
    },
})