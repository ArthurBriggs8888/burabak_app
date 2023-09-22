import { TouchableOpacity, Text } from "react-native";

const Link = ({to, text, textStyle, navigation, replace}) => {
    return (
        <TouchableOpacity onPress={() => {replace ? navigation.replace(to) : navigation.push(to)}}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Link