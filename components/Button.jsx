import {View, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'

const Button = ({loading, onPress, text, textColor, Icon, bgColor, Style}) => {
    const Styles = StyleSheet.create({
        button: {
            borderRadius: 100,
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderColor: Colors.green
        }
    })
    return (
        <TouchableOpacity onPress={onPress} style={[Styles.button, GlobalStyle.padding(10, 0, 10, 0), GlobalStyle.width(100), GlobalStyle.flex('row', 'center', 'center'), {backgroundColor: bgColor}, Style]}>
            <Text style={[GlobalStyle.h6, {color: textColor}, GlobalStyle.margin(0, 20, 0, 0)]}>{text}</Text>
            { Icon && (Icon) }
            { loading && (
                <ActivityIndicator color={textColor} style={{position: 'absolute', right: 20}} />
            ) }
        </TouchableOpacity>
    )
}

export default Button