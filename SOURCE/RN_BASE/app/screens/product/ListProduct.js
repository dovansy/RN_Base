import React, { Component } from "react";
import {
    Text,
    View,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Button,
    FlatList,
} from "react-native";
import DaiiChiHeader from "~/components/DaiiChiHeader";
import { requestListProduct } from "~/constants/Api";
import reactotron from "reactotron-react-native";

export default class ListProduct extends Component {
    // constructor(props) {
    //     super(props);
    state = {
        isLoading: true,
        err: null,
        param: this.props.navigation.getParam("param", {}),
        data: {},
    };
    // }

    componentDidMount = async () => {
        try {
            const res = await requestListProduct({
                childID: -1,
                parentID: this.state.param.id,
                page: 1,
            });
            this.setState({
                isLoading: false,
                data: res.data,
            });
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };

    render() {
        return (
            <View>
                <DaiiChiHeader title="Sản phẩm" back />
                {this._renderBody()}
            </View>
        );
    }

    _renderBody() {
        if (this.state.isLoading) return <ActivityIndicator />;
        if (this.state.err)
            return <Text>Đã có lỗi xảy ra, vui lòng thử lại</Text>;
        return (
            <View>
                <ScrollView>{this._listProductBlock()}</ScrollView>
            </View>
        );
    }
    _listProductBlock() {
        return (
            <View style={{ flexDirection: "row" }}>
                {/* <Text>{JSON.stringify(this.state)}</Text> */}
                <Text style={{ backgroundColor: "green", margin: 2 }}>
                
                    {/* {this.param.map((value, index) => {
                        reactotron.log(param)
                        return <Text>{value.name}</Text>;
                    })} */}
                </Text>
                <Text style={{ backgroundColor: "green", margin: 2 }}>
                    {" "}
                    Tat ca
                </Text>
                <Text style={{ backgroundColor: "green", margin: 2 }}>
                    {" "}
                    Tat ca
                </Text>
            </View>
        );
    }

    _productItem(item, index) {
        return (
            <Text style={{ backgroundColor: "red" }}>{item.childName} 111</Text>
        );
    }
}

const styles = StyleSheet.create({});
