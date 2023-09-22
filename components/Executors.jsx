import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ExecutorItem from './ExecutorItem'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'

const Executors = ({}) => {
    return (
        <View style={[Styles.container]}>
            <TouchableOpacity style={[Styles.target, GlobalStyle.flex('row', 'center', 'center')]}>
                <MaterialCommunityIcons name="target" size={25} color="white" />
            </TouchableOpacity>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal contentContainerStyle={[GlobalStyle.padding(0,10,50,20)]}>
                <ExecutorItem name='Muer Mesiabak' rating='4.0' progress={80} country={['ru', 'tr']} service='Designer' detail='Ammazinf WEB designer' />
                <ExecutorItem name='Muer Mesiabak' rating='4.0' progress={80} country={['ru', 'tr']} service='Designer' detail='Ammazinf WEB designer' />
                <ExecutorItem name='Muer Mesiabak' rating='4.0' progress={80} country={['ru', 'tr']} service='Designer' detail='Ammazinf WEB designer' />
            </ScrollView>
            
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50
    },
    target: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: Colors.dark2,
        marginBottom: 10,
        right: 0,
    }
})

export default Executors