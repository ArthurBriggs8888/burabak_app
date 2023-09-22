import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'

const InputField = ({placeholder, lock, icon, onChange, onIconClick}) => {

    return (
        <View style={[ GlobalStyle.width(100), GlobalStyle.borderStyle, GlobalStyle.padding(10, 15, 5, 20), GlobalStyle.margin(20, 0, 0, 0), GlobalStyle.flex('row', 'space-between', 'end')]}>
            <TextInput secureTextEntry={lock} onChangeText={(e) => onChange(e)} style={[GlobalStyle.width(90), GlobalStyle.h6]} placeholder={placeholder}/>
            <TouchableOpacity onPress={onIconClick}>
                { icon }
            </TouchableOpacity>
        </View>
    )
}

export default InputField