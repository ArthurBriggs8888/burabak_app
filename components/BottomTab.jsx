import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import ic_main from '../assets/ic_main.png'
import ic_about from '../assets/ic_about.png'
import ic_about_active from '../assets/ic_about_active.png'

import ic_advert from '../assets/ic_advert.png'
import ic_advert_active from '../assets/ic_advert_active.png'

import ic_customer from '../assets/ic_customer.png'
import ic_customer_active from '../assets/ic_customer_active.png'

import ic_order from '../assets/ic_order.png'
import ic_order_active from '../assets/ic_order_active.png'

import ic_chat from '../assets/ic_chat.png'
import ic_chat_active from '../assets/ic_chat_active.png'

import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang'

const BottomTab = ({navigation, registered}) => {
    return (
        <View style={[Styles.container, GlobalStyle.BoxShadow, GlobalStyle.flex('row', 'space-around', 'flex-end')]}>
            <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center'), {flexGrow: 0.2}]}>
                <Image source={ic_about} style={[Styles.icon]} />
                <Text style={[GlobalStyle.h8, GlobalStyle.grayLabel]}>{i18n.t('About')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center'), {flexGrow: 0.2}]}>
                <Image source={ic_advert} style={[Styles.icon]} />
                <Text style={[GlobalStyle.h8, GlobalStyle.grayLabel]}>{i18n.t('Advert')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center'), {flexGrow: 0.2}]}>
                <View style={[Styles.mainIconContainer]}> 
                    <Image source={ic_main} style={[Styles.mainIcon]} />
                </View>
                <Text style={[GlobalStyle.h8, GlobalStyle.text]}>{i18n.t('Main')}</Text>
            </TouchableOpacity>

            { registered ? (
                <>
                    <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center')]}>
                        <Image source={ic_about} style={[Styles.icon]} />
                        <Text style={[GlobalStyle.h8, GlobalStyle.grayLabel]}>{i18n.t('Orders')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center')]}>
                        <Image source={ic_about} style={[Styles.icon]} />
                        <Text style={[GlobalStyle.h8, GlobalStyle.grayLabel]}>{i18n.t('Chat')}</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center')]}>
                        <Image source={ic_customer} style={[Styles.icon]} />
                        <Text style={[GlobalStyle.h8, GlobalStyle.grayLabel]}>{i18n.t('Customer')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[GlobalStyle.flex('column', 'center', 'center')]}>
                        <Image source={ic_customer} style={[Styles.icon, {transform: [{'scaleX': -1}] }]} />
                        <Text style={[GlobalStyle.h8, GlobalStyle.grayLabel]}>{i18n.t('Executor')}</Text>
                    </TouchableOpacity>
                </>
            ) }
            
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: GlobalStyle.SCREEN_WIDTH - 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginBottom: 3
    },
    mainIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    mainIconContainer: {
        padding: 5,
        backgroundColor: Colors.forground,
        borderRadius: 10,
        marginBottom: 3
    }
})

export default BottomTab