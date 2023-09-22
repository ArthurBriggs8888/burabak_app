import {View, StyleSheet, Text} from 'react-native'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import { useEffect, useState } from 'react'

const StepIndicator = ({stepCount, step}) => {
    const [stepContainer, setStepContainer] = useState();

    useEffect(() => {
        setStepContainer(steps(step))
    }, [step])

    const steps = (_step) => {
        const _steps = []
        for(let i = 0 ; i < stepCount ; i++) {
            _steps.push(
                <View key={i} style={[GlobalStyle.flex('row', 'center', 'center'), Styles.step, i === _step && Styles.active]}>
                    <Text style={[Styles.text, i === _step && Styles.activeText ]}>{i + 1}</Text>
                </View>
            );
            if(i < stepCount - 1) {
                _steps.push(<View key={i + 100} style={[Styles.seperator]}></View>)
            }
        }
        return _steps
    }

    return (
        <View style={[GlobalStyle.flex('row', 'space-around', 'center'), Styles.steps, GlobalStyle.width(100)]}>
            {stepContainer}
        </View>
    )
}

const Styles = StyleSheet.create({
    steps: {
        paddingLeft: 20,
        paddingRight: 20
    },
    step: {
        borderRadius: 100,
        elevation: 10,
        backgroundColor: 'white',
        width: 40,
        height: 40,
    },
    active: {
        elevation: 0,
        backgroundColor: Colors.green
    },
    text: {
        fontSize: 15,
        fontFamily: 'Poppins_600SemiBold',
        color: Colors.text
    },
    activeText: {
        color: 'white'
    },
    seperator: {
        width: GlobalStyle.SCREEN_WIDTH / 6,
        height: 2,
        backgroundColor: Colors.seperator
    }
})

export default StepIndicator