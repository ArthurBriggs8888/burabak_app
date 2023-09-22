import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { useState } from 'react';

import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang';
import { useEffect } from 'react';

const Switch = ({onSelected}) => {
    const [current, setCurrent] = useState("man");

    useEffect(() => {
        onSelected(current)
    }, [current])

    return (
        <View style={[GlobalStyle.margin(10, 0, 10, 0), Styles.container, GlobalStyle.width(100), GlobalStyle.flex('row', 'flex-start', 'center')]}>
            <TouchableOpacity onPress={() => setCurrent('man')} style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(0,20,0,0)]}>
                <View style={[Styles.radio, GlobalStyle.flex('row', 'center', 'center')]}>
                    { current === 'man' && (<View style={[Styles.active]}></View>)}
                </View>
                <Text style={[GlobalStyle.h7, GlobalStyle.margin(0,0,0,10), {color: Colors.text2}]}>{i18n.t('Man')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrent('woman')} style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(0,20,0,0)]}>
                <View style={[Styles.radio, GlobalStyle.flex('row', 'center', 'center')]}>
                    { current === 'woman' && (<View style={[Styles.active]}></View>)}
                </View>
                <Text style={[GlobalStyle.h7, GlobalStyle.margin(0,0,0,10), {color: Colors.text2}]}>{i18n.t('Woman')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    active: {
        width: 15,
        height: 15,
        borderRadius: 100,
        backgroundColor: Colors.green
    },
    radio: {
        width: 28,
        height: 28,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.border,
    }
})

export default Switch