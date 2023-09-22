import { Dimensions } from 'react-native'
import Colors from './colors'
const {width, height} = Dimensions.get('window');

export default {
    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,
    
    flex: (direction, xOption, yOption) => {
        if(direction.indexOf('row') >= 0) {
            return {
                flexDirection: 'row',
                justifyContent: xOption,
                alignItems: yOption
            }
        } else if(direction.indexOf('column') >= 0) {
            return {
                flexDirection: 'column',
                justifyContent: yOption,
                alignItems: xOption
            }
        }
    },

    margin: (top, right, bottom, left) => {
        return {
            marginTop: top,
            marginRight: right,
            marginBottom: bottom,
            marginLeft: left
        }
    },

    padding: (top, right, bottom, left) => {
        return {
            paddingTop: top,
            paddingRight: right,
            paddingBottom: bottom,
            paddingLeft: left
        }
    },
    width: (percent) => {
        return {
            width: `${percent}%`
        }
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    h3:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize: width / 16,
    },
    h4:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize: width / 19,
    },
    h5:{
        fontFamily: 'Poppins_600SemiBold',
        fontSize: width / 22,
    },
    h6:{
        fontFamily: 'Poppins_500Medium',
        fontSize: width / 25,
    },
    h7:{
        fontFamily: 'Poppins_500Medium',
        fontSize: width / 28,
    },
    underline: {
        textDecorationLine: 'underline'
    },
    greenLabel: {
        color: Colors.green
    },
    grayLabel: {
        color: Colors.gray
    },
    grayScaleLable: {
        color: Colors.text1
    },

    hidden: {
        display: 'none'
    },
    borderStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.border,
        borderRadius: 100,
    }
}