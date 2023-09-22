import {View, StyleSheet, TouchableOpacity, NativeModules, Platform, ActivityIndicator} from 'react-native'
import WebView from 'react-native-webview'
import { Ionicons } from '@expo/vector-icons'
import useGetFAQ from '../hooks/useGetFAQ'
import { getCurrentLanguage } from '../global/helper'

import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang';
import { useEffect } from 'react';

const FAQ = ({navigation}) => {
    const [FAQ, getFAQ] = useGetFAQ();
    const style = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">

    <style>
        * {
            font-family: 'Poppins', sans-serif;
            color: ${Colors.text2};
        }
        h1 {
            font-size: ${GlobalStyle.SCREEN_WIDTH / 5}
        }
        h2 {
            font-size: ${GlobalStyle.SCREEN_WIDTH / 6.5}
        }
        h3 {
            font-size: ${GlobalStyle.SCREEN_WIDTH / 8}
        }
        p {
            font-size: ${GlobalStyle.SCREEN_WIDTH / 10}
        }

    </style>
    `

    useEffect(() => {
        getFAQ(getCurrentLanguage())
    }, [i18n.locale])

    return (
        <View style={[Styles.container, GlobalStyle.padding(20, 20, 20, 20)]}>
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Ionicons name="arrow-back-outline" size={30} color={Colors.dark2} />
            </TouchableOpacity>
            
            { FAQ !== '' && (<WebView style={[GlobalStyle.margin(20, 0, 0, 0)]} source={{html: `${style}${FAQ}`}} />) }
            { FAQ === '' && <ActivityIndicator size='large' style={{position: 'absolute', left: '50%', top: '50%'}} /> }
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default FAQ