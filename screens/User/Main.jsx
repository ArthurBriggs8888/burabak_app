import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

import map from '../../assets/map.png'

import Executors from '../../components/Executors';
import Header from '../../components/Header'
import GlobalStyle from '../../global/styles'
import Colors from '../../global/colors'
import BottomTab from '../../components/BottomTab'
import i18n from '../../lang'

const Main = ({navigation}) => {
    return (
        <View style={[Styles.container]}>
            <Header navigation={navigation} />
            <View style={{flex: 1}}>
                <Image source={map} style={{width: '100%', height: '100%'}} />

                <View style={[Styles.SignUpAlert, GlobalStyle.flex('row', 'center', 'center')]}>
                    <Text style={[GlobalStyle.h6, {color: 'white', textAlign: 'center'}, GlobalStyle.margin(0,20,0,0)]}>{i18n.t('Sign Up to Unleash all Possibilities')}</Text>
                    <TouchableOpacity>
                        <AntDesign name="arrowright" size={24} color='white' />
                    </TouchableOpacity>
                </View>

                <Executors />
            </View>
            <BottomTab navigation={navigation} />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    SignUpAlert: {
        position: 'absolute',
        marginLeft: '15%',
        backgroundColor: Colors.orange,
        width: '70%',
        borderRadius: 100,
        marginTop: 60,
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})

export default Main