import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native'
import BG from '../../assets/bg.jpg'
import WelcomePrize from '../../assets/welcome.png'
import Button from '../../components/Button'

import GlobalStyle from '../../global/styles'
import Colors from '../../global/colors'
import i18n from '../../lang'

const Welcome = ({}) => {
    return (
        <ImageBackground source={BG} style={[GlobalStyle.container, Styles.container]}>
            <Text style={[GlobalStyle.h3, Styles.text]}>{i18n.t('Congratulations')}</Text>
            <View style={[GlobalStyle.padding(0,GlobalStyle.SCREEN_WIDTH / 10,0,0)]}>
                <Text style={[GlobalStyle.h5, Styles.text, GlobalStyle.margin(20,0,30,0)]}>{i18n.t('You have successfully Registered Burabak')}</Text>
                <Text style={[GlobalStyle.h5, Styles.text]}>{i18n.t('Now you can use the services')}</Text>
                <Text style={[GlobalStyle.h5, Styles.text]}>{i18n.t('You can switch in your panel as a Service provider')}</Text>
            </View>
            <Image source={WelcomePrize} style={[Styles.image]} />
            <Button text={i18n.t('Contınue as Customer')} textColor="#fff" bgColor={Colors.customerBtn} Icon={null} />
            <Button text={i18n.t('Contınue as Executer')} Style={[GlobalStyle.margin(15,0,0,0)]} textColor={Colors.customerBtn} bgColor={Colors.executorBtn} Icon={null} />
        </ImageBackground>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingTop: GlobalStyle.SCREEN_HEIGHT / 10
    },
    text: {
        color: 'white'
    },
    image: {
        width: '100%',
        height: GlobalStyle.SCREEN_HEIGHT / 2.5
    }
})

export default Welcome