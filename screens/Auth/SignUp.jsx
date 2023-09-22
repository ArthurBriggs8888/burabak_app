import {View, Text, StyleSheet} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import PhoneInput from "react-native-phone-number-input"
import { Entypo, Feather, AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useDispatch } from 'react-redux'
import { useToast } from "react-native-toast-notifications";
import moment from 'moment';

import { getCurrentLanguage } from '../../global/helper';
import DateInput from '../../components/DateInput';
import InputField from '../../components/InputField';
import Link from '../../components/Link'
import Button from '../../components/Button'
import StepIndicator from '../../components/StepIndicator'
import PinCodeInput from '../../components/PinCodeInput';
import Switch from '../../components/Switch';

import {
    setToken,
    setUser
} from '../../redux/slices/auth';

import useCheckUser from '../../hooks/useCheckUser';
import useRegisterUser from '../../hooks/useRegisterUser';
import useCheckCode from '../../hooks/useCheckCode';
import useLoginUser from '../../hooks/useLoginUser';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';

import GlobalStyle from '../../global/styles'
import Colors from '../../global/colors'
import i18n from '../../lang'

const SignUp = ({navigation}) => {
    const Toast = useToast();
    const dispatch = useDispatch();
    const [step, setStep] = useState(0)
    const offsetX = useSharedValue(0);

    const [date, setDate] = useState(null);
    const [gender, setGender] = useState('man')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [lock, setLock] = useState(true)
    const [password, setPassword] = useState('')
    const phoneInput = useRef()

    const [response, registerUser] = useRegisterUser();
    const [checkCodeResponse, checkCode] = useCheckCode();
    const [checkResponse, checkUser] = useCheckUser();
    const [loginResponse, loginUser] = useLoginUser();
    const [checkUserResponse, getCurrentUser] = useGetCurrentUser();
    const [signing, setSigning] = useState(false);
    const [loading, setLoading] = useState(false);

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
            if(checkResponse.userExists) {
                Toast.show(i18n.t('User Already Exists'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
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

    const onRegister = () => {
        if(name === '') {
            Toast.show(i18n.t('Please Input Full Name'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
        } else if(surname === '') {
            Toast.show(i18n.t('Please Input Sur Name'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
        } else if(password.length < 8) {
            Toast.show(i18n.t('Password Length Must Be Greater Than 8.'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
        } else if(date === null) {
            Toast.show(i18n.t('Please Input Your Birthday'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
        } else {
            var data = {
                "phone": phoneNumber,
                "password": password,
                "name": name,
                "type": "password",
                "gender": gender,
                "birthday": moment(date).format('YYYY/MM/DD')
            }
            registerUser(data, getCurrentLanguage())
            setLoading(true);
        }
    }

    useEffect(() => {
        if(step > 1) {
            setLoading(false);
            if(response === null) {
                Toast.show(i18n.t('Please Check Your Network Status'), { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
            } else if(response.success !== true) {
                Toast.show(response.message, { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
            } else {
                Toast.show(i18n.t('Sign Up Success'), { type: "success", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
                Toast.show(i18n.t('Signing...'), { type: "success", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});

                loginUser({
                    "phone": phoneNumber,
                    "password": password,
                    "type": "password"
                }, getCurrentLanguage());

                setSigning(true);
            }
        }
    }, [response])

    useEffect(() => {
        if(signing) {
            if(loginResponse.success) {
                let token = `Bearer ${loginResponse.token}`;
                dispatch(setToken(token));

                getCurrentUser(token, getCurrentLanguage())
                navigation.replace('Welcome')
            } else {
                Toast.show(loginResponse.message, { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
            }
        }
    }, [loginResponse])

    useEffect(() => {
        if(signing) {
            if(checkUserResponse.success) {
                dispatch(setUser(checkUserResponse.user));
                Toast.show(t('Sign In Success'), { type: "success", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
                setSigning(false);
            } else {
                Toast.show(checkUserResponse.message, { type: "danger", placement: "top", duration: 2000, offset: 80, animationType: "zoom-in"});
            }
        }
    }, [checkUserResponse])

    return (
        <View style={[Styles.container]}>
            <View style={[GlobalStyle.padding(20, 20, 20, 20), GlobalStyle.flex('row', 'space-between', 'flex-end'), GlobalStyle.margin(0, 0, 20, 0)]}>
                <Text style={[GlobalStyle.h3, {color: Colors.dark2}]}>{i18n.t('Sign Up')}</Text>
                <Link navigation={navigation} replace={true} to='SignIn' text={i18n.t('Sign In')} textStyle={[GlobalStyle.h6, GlobalStyle.greenLabel]} />
            </View>

            <StepIndicator stepCount={3} step={step} />
            <Animated.View style={[GlobalStyle.flex('row', 'flex-start', 'flex-start'), {position: 'relative', left: offsetX}]}>
                <View style={{width: GlobalStyle.SCREEN_WIDTH, padding: 20}}>
                    <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.margin(20, 0, 20, 0)]}>{i18n.t('Create an account here')}</Text>

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

                    <Text style={[GlobalStyle.margin(20, 0, 0, 0), GlobalStyle.h7, GlobalStyle.grayLabel, GlobalStyle.width(100), {textAlign: 'center'}]}>By Clicking Send Code, I accept the</Text>
                    <View style={[GlobalStyle.width(100), GlobalStyle.flex('row', 'center', 'center')]}>
                        <Link navigation={navigation} replace={false} to='UserAgreement' text={i18n.t('User Agreement')} textStyle={[GlobalStyle.margin(0, 10, 0, 0), GlobalStyle.underline, GlobalStyle.h7, GlobalStyle.greenLabel]} />
                        <Text style={[GlobalStyle.h7, GlobalStyle.grayLabel]}>and</Text>
                        <Link navigation={navigation} replace={false} to='PrivacyPolicy' text={i18n.t('Privacy Policy')} textStyle={[GlobalStyle.margin(0, 0, 0, 10), GlobalStyle.underline, GlobalStyle.h7, GlobalStyle.greenLabel]} />
                    </View>

                    <Button onPress={onSendCode} loading={loading} text={i18n.t('Send code')} textColor={Colors.green} Style={[GlobalStyle.margin(20, 0, 0, 0)]} bgColor='white' Icon={null} />
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
                        <InputField lock={false} onIconClick={null} placeholder={i18n.t('Full name')} icon={null} onChange={(e) => setName(e)} />
                        <InputField lock={false} onIconClick={null} placeholder={i18n.t('Surname')} icon={null} onChange={(e) => setSurname(e)} />
                        <InputField lock={lock} onIconClick={onIconClick} placeholder={i18n.t('Password')} icon={<Feather name={lock ? 'eye' : 'eye-off'} size={20} color={Colors.gray} />} onChange={(e) => setPassword(e)} />

                        <Text style={[GlobalStyle.margin(20, 0, 0, 0), GlobalStyle.h6, GlobalStyle.grayScaleLable, GlobalStyle.width(100)]}>{i18n.t('Password entry rules:')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('Minimum of 8 characters')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('1 capital letter')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('1 lowercase letter')}</Text>
                        <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel, GlobalStyle.width(100)]}><Entypo name="dot-single" size={GlobalStyle.SCREEN_WIDTH / 25} color={Colors.gray} />{i18n.t('Minimum 1 digit')}</Text>

                        <Switch onSelected={(e) => setGender(e)} />
                        <DateInput onChangeDate={(e) => setDate(e)} />
                        <Button text="Next" onPress={onRegister} textColor="#fff" bgColor={Colors.green} Icon={<AntDesign name="arrowright" size={18} color='white' />} />
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

export default SignUp