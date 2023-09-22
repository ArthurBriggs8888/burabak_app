import {View, Text, StyleSheet, Image} from 'react-native'
import CountryFlag from 'react-native-country-flag';
import { AntDesign } from '@expo/vector-icons';
import Stars from 'react-native-stars'

import FillStar from '../assets/fill_star.png'
import EmptyStar from '../assets/empty_star.png'
import Avatar from '../assets/sample_avatar.png'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang';

const ExecutorItem = ({name, rating, country, progress, service, detail}) => {
    return (
        <View style={[Styles.item, GlobalStyle.BoxShadow]}>
            <View style={[GlobalStyle.flex('row', 'flex-start', 'center'), GlobalStyle.margin(0,0,5,0)]}>
                <Image source={Avatar} style={[Styles.avatar]} />
                <View style={[GlobalStyle.padding(0,0,0,10)]}>
                    <View style={[GlobalStyle.flex('row', 'flex-start', 'center')]}>
                        <Text style={[GlobalStyle.h6, {color: Colors.dark2}]}>{name}</Text>
                        <View style={[Styles.status, {backgroundColor: Colors.green}]}></View>
                    </View>

                    <View style={[GlobalStyle.flex('row', 'flex-start', 'center')]}>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel]}>{service}</Text>
                        <View style={{position: 'relative', marginLeft: 10}}>
                            <Image source={EmptyStar} style={[Styles.star]} />
                            <View style={{width: 25 / 100 * progress, overflow: 'hidden', position: 'absolute'}}>
                                <Image source={FillStar} style={[Styles.star]} />
                            </View>
                        </View>
                        <Text style={[GlobalStyle.h6, {color: Colors.dark2}, GlobalStyle.margin(0, 0, 0, 5)]}>{rating}</Text>
                        {country.map((item, index, array) => 
                            <View style={[Styles.flag]} key={index}>
                                <CountryFlag isoCode={item} size={23} />
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={[GlobalStyle.flex('row', 'space-between', 'center'), GlobalStyle.padding(0,10,0,10)]}>
                <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel]}>{detail}</Text>
                <AntDesign name="arrowright" size={24} color={Colors.dark2} />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    item: {
        width: GlobalStyle.SCREEN_WIDTH * 0.85,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 20
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 20
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginLeft: 10
    },
    flag: {
        borderRadius: 100,
        borderWidth: 1.2,
        borderColor: Colors.border,
        width: 23,
        height: 23,
        marginLeft: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    star: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    }
})

export default ExecutorItem