import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Feather } from '@expo/vector-icons'
import {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import i18n from '../lang';

const DateInput = ({onChangeDate}) => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState(i18n.t('Date of Birth'))
    const [show, setShow] = useState(false);

    const onPress = () => {
        setShow(true);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        onChangeDate(currentDate)
        console.log(moment(currentDate).format('MM/DD/YYYY'));
        setDateText(moment(currentDate).format('MM/DD/YYYY'))
    };

    return (
        <View style={[Styles.container, GlobalStyle.padding(10,20,10,20), GlobalStyle.margin(10, 0, 30, 0),  GlobalStyle.flex('row', 'space-between', 'center')]}>
            <Text style={[GlobalStyle.h6, Styles.placeholder]}>{dateText}</Text>
            <TouchableOpacity onPress={onPress}>
                <Feather name="calendar" size={24} color={Colors.text} />
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        borderColor: Colors.border,
        backgroundColor: Colors.disableBg,
        borderWidth: 1.5,
        borderStyle: 'solid'
    },
    placeholder: {
        color: Colors.gray
    }
})

export default DateInput