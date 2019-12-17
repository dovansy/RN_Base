import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import reactotron from 'reactotron-react-native';
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


export default class UserScreen extends Component {

    async componentDidMount() {


    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={() => {
                        // RNIap.requestPurchase("wind.android.tier1")
                        // RNIap.requestPurchase("winds.vn.rnbase.tier3", false)
                        //     .then(res => {
                        //         reactotron.log(res)
                        //     })
                        //     .catch(err => {
                        //         reactotron.log(err)
                        //     })

                        // Open Image Library:
                        ImagePicker.launchImageLibrary(options, (response) => {
                            reactotron.log(response.uri)
                            // Same code as in above section!
                            // let data = new FormData();
                            // data.append('customer_id', 34017);
                            // data.append('fileImage', {
                            //     name: `images_hello1`,
                            //     type: 'image/jpg',
                            //     uri: response.uri
                            // });
                            // data.append('catagory_id', 1);

                            url = 'https://dashboard.365dep.vn/api/v2/app/upload_image'
                            const data = new FormData();
                            data.append('customer_id', "34017"); // you can append anyone.
                            data.append('catagory_id', "1"); // you can append anyone.
                            data.append('fileImage', {
                                uri: response.uri.replace("file://",""),
                                type: 'image/jpg', // or photo.type
                                name: 'testPhotoName'
                            });
                            fetch(url, {
                                method: 'post',
                                headers :{
                                    'x-api-key': 'qWnUiio9_xxRpExYzqSyzCqn3Gz3ZjP6jN_pxKUX',
                                    "Accept": "*/*",
                                    "Content-Type": "multipart/form-data; boundary=--------------------------166940290369456718026014",
                                    "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
                                },
                                body: data
                            }).then(res => {
                                reactotron.log(res)
                            });

                        });
                    }}>
                    {/* <Text>{JSON.stringify(this.state)}</Text> */}
                    <Text>Choose image</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
