import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import PhoneInput from "react-native-phone-number-input"
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from "react-native-toast-notifications";
import { useDispatch } from 'react-redux';
import { getCurrentLanguage } from '../../global/helper';

import InputField from '../../components/InputField';
import Button from '../../components/Button'
import StepIndicator from '../../components/StepIndicator'
import PinCodeInput from '../../components/PinCodeInput';

import useCheckCode from '../../hooks/useCheckCode';
import useCheckUser from '../../hooks/useCheckUser';
import useForgotPassword from '../../hooks/useForgotPassword';

import GlobalStyle from '../../global/styles'
import Colors from '../../global/colors'
import i18n from '../../lang'

const ForgotPassword = ({navigation}) => {
    const [step, setStep] = useState(0)
    const offsetX = useSharedValue(0);
    const Toast = useToast();
    const dispatch = useDispatch();

    const [phoneNumber, setPhoneNumber] = useState('')
    const [lock, setLock] = useState(true)
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const phoneInput = useRef()

    const [checkCodeResponse, checkCode] = useCheckCode();
    const [checkResponse, checkUser] = useCheckUser();
    const [forgotResponse, forgotPassword] = useForgotPassword();
    const [loading, setLoading] = useState(false);
    const [signing, setSigning] = useState(false);

    const onIconClick = () => setLock(e => !e)

    const onSendCode = () => {
        if(phoneNumber === '') {
            Toast.show(i18n.t('Please Input Phone Number'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
        } else if(!phoneInput.current.isValidNumber(phoneNumber)) {
            Toast.show(i18n.t('Please Input Valid Phone Number'), {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 80,
                animationType: "zoom-in",
            });
        } else {
            setLoading(true);
            let phone = phoneNumber.replace(/[^0-9]/g, ''); setPhoneNumber(phone);
            checkUser('user@example.com', phone, getCurrentLanguage());
        }
    }

    useEffect(() => {
        if(checkResponse !== null) {
            setLoading(false);
            if(!checkResponse.userExists) {
                Toast.show(i18n.t('User Not Exists'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
            } 
            // else if(checkResponse.success === false) {
            //     Toast.show(checkResponse.message, { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
            // } 
            else {
                if(step === 0) {
                    offsetX.value = withSpring(offsetX.value - GlobalStyle.SCREEN_WIDTH);
                    setStep(1)
                }
            }
        }
    }, [checkResponse])

    const onReSendCode = () => {
        checkUser('user@example.com', phoneNumber, getCurrentLanguage());
    }

    const onPinComplete = (pin) => {
        if(pin !== String(checkResponse.code).substring(0, 4)) {
            Toast.show(i18n.t('Invalid Code!'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
        } else {
            offsetX.value = withSpring(offsetX.value - GlobalStyle.SCREEN_WIDTH);
            setStep(2)
        }
    }

    const onForgotPassword = () => {
        if(password === '') {
            Toast.show(i18n.t('Please Input Password'), {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 80,
                animationType: "zoom-in",
            });
        } else if(password1 === '') {
            Toast.show(i18n.t('Please Input Password One More Time'), {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 80,
                animationType: "zoom-in",
            });
        } else if(password.length < 8) {
            Toast.show(i18n.t('Password Length Must Be Greater Than 8.'), {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 80,
                animationType: "zoom-in",
            });
        } else if(password !== password1) {
            Toast.show(i18n.t('Please confirm your password.'), {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 80,
                animationType: "zoom-in",
            });
        } else {
            setLoading(true);
            var data = {
                "phone": phoneNumber,
                "newPass": password,
                "newPassConfirm": password1
            }
            forgotPassword(data, getCurrentLanguage)
        }
    }

    useEffect(() => {
        if(step === 2) {
            setLoading(false);
            if(forgotResponse === null) {
                Toast.show(i18n.t('Please Check Your Network Status'), {
                    type: "danger",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });
            } else if(forgotResponse.success !== true) {
                Toast.show(forgotResponse.message, {
                    type: "danger",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });
            } else {
                Toast.show(i18n.t('Success'), {
                    type: "success",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });
                navigation.replace('SignIn')
            }
        }
    }, [forgotResponse])

    return (
        <View style={[Styles.container]}>

            <View style={[GlobalStyle.padding(20, 20, 20, 20)]}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Ionicons name="arrow-back-outline" size={30} color={Colors.dark2} />
                </TouchableOpacity>
                <Text style={[GlobalStyle.margin(20, 0, 20, 0), GlobalStyle.h3, {color: Colors.dark2}]}>{i18n.t('Forgot Password?')}</Text>
            </View>

            <StepIndicator stepCount={3} step={step} />
            <Animated.View style={[GlobalStyle.flex('row', 'flex-start', 'flex-start'), {position: 'relative', left: offsetX}]}>
                <View style={{width: GlobalStyle.SCREEN_WIDTH, padding: 20}}>
                    <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.margin(20, 0, 0, 0)]}>{i18n.t('Change your password here')}</Text>

                    <PhoneInput
                        ref={phoneInput}
                        defaultCode="RU"
                        layout="first"
                        onChangeFormattedText={(text) => setPhoneNumber(text)}
                        renderDropdownImage={<Entypo name="chevron-small-down" size={16} color="black" />}
                        placeholder={i18n.t('Phone Number')}
                        textInputStyle={[GlobalStyle.h6]}
                        codeTextStyle={[GlobalStyle.h6]}
                        containerStyle={[GlobalStyle.borderStyle, {overflow: 'hidden'}, GlobalStyle.width(100), GlobalStyle.margin(20, 0, 0, 0)]}
                        textContainerStyle={[GlobalStyle.padding(10, 0, 5, 0)]}
                        flagButtonStyle={[{backgroundColor: Colors.disableBg}]}
                    />

                    <Button loading={loading} onPress={onSendCode} text={i18n.t('Send code')} textColor={Colors.green} Style={[GlobalStyle.margin(20, 0, 0, 0)]} bgColor='white' Icon={null} />
                </View>
                <View style={{width: GlobalStyle.SCREEN_WIDTH, padding: 20}}>
                    {step === 1 && (
                        <>
                            <PinCodeInput onSendCode={onReSendCode} onComplete={onPinComplete} />
                        </>
                    )}
                </View>
                <View style={{width: GlobalStyle.SCREEN_WIDTH, padding: 20}}>
                    {step === 2 && (
                    <>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.margin(20, 0, 0, 0)]}>{i18n.t('New password')}</Text>
                        <InputField lock={lock} onIconClick={onIconClick} placeholder={i18n.t('Password')} icon={<Feather name={lock ? 'eye' : 'eye-off'} size={20} color={Colors.gray} />} onChange={(e) => setPassword(e)} />
                        <InputField lock={lock} onIconClick={onIconClick} placeholder={i18n.t('Password')} icon={<Feather name={lock ? 'eye' : 'eye-off'} size={20} color={Colors.gray} />} onChange={(e) => setPassword1(e)} />

                        <Text style={[GlobalStyle.margin(20, 0, 0, 0), GlobalStyle.h6, GlobalStyle.grayScaleLable, GlobalStyle.width(100)]}>{i18n.t('Password entry rules:')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('Minimum of 8 characters')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('1 capital letter')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('1 lowercase letter')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('Minimum 1 digit')}</Text>

                        <Button text="Next" loading={loading} onPress={onForgotPassword} Style={[GlobalStyle.margin(20, 0, 0, 0)]} textColor="#fff" bgColor={Colors.green} Icon={<AntDesign name="arrowright" size={18} color='white' />} />
                    </>
                    )}
                </View>
            </Animated.View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default ForgotPassword