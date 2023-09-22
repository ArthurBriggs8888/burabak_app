import {View, Text, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity} from 'react-native'
import Icon1 from '../assets/ic_subscription.png'
import Icon2 from '../assets/ic_contact.png'
import bg from '../assets/drawer_bg.png'
import Link from './Link'

import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang';

const DrawerContent = ({navigation}) => {
    return (
        <View style={{height: '100%'}}>
            <View style={[Styles.blockContainer]} >
                <Image source={bg} style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}} resizeMode='stretch' />
                <View style={{position: 'absolute', bottom: '30%', paddingLeft: 20}}>
                    <Text style={[GlobalStyle.h6, GlobalStyle.menuLabel]}>{i18n.t('welcome to Burabak')}</Text>
                </View>
                <TouchableOpacity style={{position: 'absolute', bottom: '10%', paddingLeft: 20}}>
                    <Text style={[GlobalStyle.h7, GlobalStyle.menuLabel, Styles.joinButton]}>{i18n.t('Sign Up')}</Text>
                </TouchableOpacity>
            </View>

            <View style={[GlobalStyle.padding(20,20,20,20)]}>
                <View style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(20,0,0,0)]}>
                    <Image source={Icon1} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    <Link navigation={navigation} textStyle={[GlobalStyle.h6, GlobalStyle.menuLabel, GlobalStyle.margin(0,0,0,20)]} text={i18n.t('User Agreement')} to='UserAgreement' replace={false} />
                </View>

                <View style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(20,0,0,0)]}>
                    <Image source={Icon1} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    <Link navigation={navigation} textStyle={[GlobalStyle.h6, GlobalStyle.menuLabel, GlobalStyle.margin(0,0,0,20)]} text={i18n.t('Privacy Policy')} to='PrivacyPolicy' replace={false} />
                </View>

                <View style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(20,0,0,0)]}>
                    <Image source={Icon1} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    <Link navigation={navigation} textStyle={[GlobalStyle.h6, GlobalStyle.menuLabel, GlobalStyle.margin(0,0,0,20)]} text={i18n.t('FAQ')} to='FAQ' replace={false} />
                </View>

                <View style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(20,0,0,0)]}>
                    <Image source={Icon2} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    <Link navigation={navigation} textStyle={[GlobalStyle.h6, GlobalStyle.menuLabel, GlobalStyle.margin(0,0,0,20)]} text={i18n.t('Support')} to='Support' replace={false} />
                </View>

                <View style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(20,0,0,0)]}>
                    <Image source={Icon2} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    <Link navigation={navigation} textStyle={[GlobalStyle.h6, GlobalStyle.menuLabel, GlobalStyle.margin(0,0,0,20)]} text={i18n.t('Contact us')} to='Contact us' replace={false} />
                </View>
            </View>   

            
            <View style={[GlobalStyle.flex('row', 'flex-start', 'flex-end'), Styles.footer]}>
                <Text style={[GlobalStyle.h7, GlobalStyle.menuLabel, GlobalStyle.margin(0,10,0,0)]}>Burabak.</Text> 
                <Text style={[GlobalStyle.h7, GlobalStyle.menuLabel]}>Version 1.3</Text> 
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    blockContainer: {
        position: 'relative',
        width: '100%', 
        height: GlobalStyle.SCREEN_HEIGHT / 2.5
    },
    joinButton: {
        borderWidth: 1.5, 
        borderColor: Colors.text, 
        borderRadius: 100, 
        borderStyle: 'solid',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 0,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20
    }
})

export default DrawerContent