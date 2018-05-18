/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    Dimensions
} from 'react-native';

const deviceHeight = Dimensions
    .get("window")
    .height;
const deviceWidth = Dimensions
    .get("window")
    .width;

var MARGIN_TOP = Platform.OS === "ios"
    ? 20
    : 0;

// 请求动态访问的接口地址
var getUrl = "https://www.baidu.com";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {url: ''};
        this.getRequest(getUrl);
    }

    getRequest(url) {
        /*网络请求的配置*/
        var opts = {
            method: "GET"
        };

        fetch(url, opts)
            .then((response) => {
                return response.text();
            })
            .then((responseText) => {
                this.setState(previous => {
                    // return {url: responseText};
                    // 测试的话写死
                    return {url: getUrl};
                });
            })
            .catch((error) => {
                alert(error);
            })
    }


    render() {

        var url = this.state.url;
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.content}
                    source={{
                        uri: url
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    content: {
        width: deviceWidth,
        height: deviceHeight,
        marginTop: MARGIN_TOP
    }
});
