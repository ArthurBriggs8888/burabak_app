import {StyleSheet, View, TextInput, Text} from 'react-native'
import GlobalStyle from '../global/styles'
import Colors from '../global/colors'
import { useState, useRef, useEffect } from 'react'
import Button from './Button'
import i18n from '../lang'
import moment from 'moment'

const PinCodeInput = ({onSendCode, onComplete}) => {
    const [step, setStep] = useState(0);
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')
    const [text4, setText4] = useState('')
    const [label, setLabel] = useState('');
    const [time, setTime] = useState(180);
    const [counting, setCounting] = useState(false);
    const [interval, setIntervalId] = useState(null);

    const _text1 = useRef(), _text2 = useRef(), _text3 = useRef(), _text4 = useRef();

    useEffect(() => {
        startTimer();
        setTimeout(() => {
            _text1.current.focus()
        }, 50)
    }, [])

    useEffect(() => {
        if(step === 4) {
            let pin = `${text1}${text2}${text3}${text4}`
            onComplete(pin)
        }
    }, [step])

    const onChange = (e, index) => {
        let text = e.replace(/[^0-9]/g, '');
        if(text.length > 0) {
            if(index === 1) setText1(text[0]);
            if(index === 2) setText2(text[0]);
            if(index === 3) setText3(text[0]);
            if(index === 4) setText4(text[0]);

            setStep(e => e + 1)
            setTimeout(() => {
                if(index === 1) _text2.current.focus()
                if(index === 2) _text3.current.focus()
                if(index === 3) _text4.current.focus()
            }, 50)
        }
    }

    const toTimeFormat = (time) => {
        let x = time * 1000;
        return moment(x).format('mm:ss');
    }

    const startTimer = () => {
        setCounting(true);
        setTime(10);
        let _interval = setInterval(() => {
            setTime(e => e - 1)
        }, 1000)
        setIntervalId(_interval);
    }

    const onPress = () => {
        setStep(0);
        setText1('')
        setText2('')
        setText3('')
        setText4('')
        setTimeout(() => {
            _text1.current.focus()
        }, 50)
        startTimer();
        onSendCode();
    }

    useEffect(() => {
        if(time < 0) {
            setCounting(false)
            clearInterval(interval)
        }
        setLabel(toTimeFormat(time))
    }, [time])

    return (
        <View>
            <View style={[Styles.container, GlobalStyle.flex('row', 'space-around', 'center')]}>
                <TextInput inputMode='decimal' ref={_text1} value={text1} editable={step === 0 ? counting : false} onChangeText={(e) => onChange(e, 1)} cursorColor={Colors.cursor} style={[Styles.textInput, step === 0 && counting && Styles.active]} />
                <TextInput inputMode='decimal' ref={_text2} value={text2} editable={step === 1 ? counting : false} onChangeText={(e) => onChange(e, 2)} cursorColor={Colors.cursor} style={[Styles.textInput, step === 1 && counting && Styles.active]} />
                <TextInput inputMode='decimal' ref={_text3} value={text3} editable={step === 2 ? counting : false} onChangeText={(e) => onChange(e, 3)} cursorColor={Colors.cursor} style={[Styles.textInput, step === 2 && counting && Styles.active]} />
                <TextInput inputMode='decimal' ref={_text4} value={text4} editable={step === 3 ? counting : false} onChangeText={(e) => onChange(e, 4)} cursorColor={Colors.cursor} style={[Styles.textInput, step === 3 && counting && Styles.active]} />
            </View>

            {counting ? (
                <Text style={[GlobalStyle.margin(20, 0, 0, 0), GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100), {textAlign: 'center'}]}>{i18n.t('Resend in')}{label}</Text>
            ) : (
                <Button onPress={onPress} text={i18n.t('Send code')} textColor={Colors.green} Style={[GlobalStyle.margin(40, 0, 0, 0)]} bgColor='white' Icon={null} />
            )}
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    textInput: {
        borderRadius: 15,
        width: GlobalStyle.SCREEN_WIDTH / 6,
        height: GlobalStyle.SCREEN_WIDTH / 5,
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: Colors.border,
        backgroundColor: Colors.disableBg,
        fontSize: GlobalStyle.SCREEN_WIDTH / 18,
        textAlign: 'center',
        color: Colors.grayScale
    },
    active: {
        borderColor: Colors.green,
        backgroundColor: 'white'
    }
})

export default PinCodeInput