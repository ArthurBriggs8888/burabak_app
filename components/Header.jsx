import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, TextInput} from 'react-native'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';

import ic_search from '../assets/ic_search.png'
import ic_exit from '../assets/ic_exit.png'
import ic_filter from '../assets/ic_filter.png'
import Notification from '../assets/ic_notification.png'
import BG from '../assets/drawer_bg.png'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang';
import { useState } from 'react';
import { useEffect } from 'react';

const Header = ({navigation}) => {
    const [status, setStatus] = useState(true)
    const leftX = useSharedValue(14)

    useEffect(() => {
        if(status) {
            leftX.value = withSpring(12)
        } else {
            leftX.value = withSpring(72)
        }
    }, [status])

    return (
        <ImageBackground source={BG} style={[Styles.container]} >
            <View style={[GlobalStyle.flex('row', 'space-between', 'center'), GlobalStyle.BoxShadow]}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Entypo name="menu" size={30} color={Colors.dark2} />
                </TouchableOpacity>
                <View style={[Styles.switchContainer, GlobalStyle.flex('row', 'space-around', 'center')]}>
                    <Animated.View style={[Styles.selecter, {left: leftX}]}></Animated.View>
                    <TouchableOpacity onPress={() => setStatus(true)}>
                        <Text style={[GlobalStyle.h5, GlobalStyle.grayScaleLable, Styles.text, status && Styles.active]}>{i18n.t('Map')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStatus(false)}>
                        <Text style={[GlobalStyle.h5, GlobalStyle.grayScaleLable, Styles.text, !status && Styles.active]}>{i18n.t('List')}</Text>
                    </TouchableOpacity>                    
                </View>
                <View style={[Styles.alarm]}>
                    <Image source={Notification} style={[Styles.alarmIcon]} tintColor={Colors.dark2} />
                    <View style={[Styles.badge]}></View>
                </View>
            </View>
            <View style={[Styles.inputContainer, GlobalStyle.BoxShadow, GlobalStyle.flex('row', 'space-between', 'center')]}>
                <View style={[GlobalStyle.flex('row', 'flex-start', 'center')]}>
                    <Image source={ic_search} style={[Styles.icon]} tintColor={Colors.dark2} />
                    <TextInput style={[GlobalStyle.h7, Styles.textInput,]} placeholder={i18n.t('What are you looking for?')} />
                </View>
                <TouchableOpacity>
                    <Image source={ic_filter} style={[Styles.icon]} tintColor={Colors.dark2} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingTop: GlobalStyle.STATUS_BAR_HEIGHT,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 40,
    },
    alarm: {
        position: 'relative'
    }, 
    alarmIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    badge: {
        position: 'absolute',
        width: 10,
        height: 10,
        top: 0, right: 0,
        backgroundColor: 'red',
        borderRadius: 100
    },

    switchContainer: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 100,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderColor: Colors.border,
        backgroundColor: Colors.disableBg,
        position: 'relative',
        width: 140
    },
    active: {
        color: 'white'
    },
    text: {
    },
    selecter: {
        borderRadius: 100,
        backgroundColor: Colors.green,
        position: 'absolute',
        width: '50%',
        height: '100%'
    },
    inputContainer: {
        zIndex: 9999,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 100,
        position: 'absolute',
        bottom: '-70%',
        left: 20
    },
    textInput: {
        width: '70%',
        marginHorizontal: 10,

    }
})

export default Header