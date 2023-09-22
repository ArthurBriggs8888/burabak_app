import {View, Text, StyleSheet} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import Link from '../../components/Link'
import PhoneInput from "react-native-phone-number-input"
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { useToast } from "react-native-toast-notifications";
import { getCurrentLanguage } from '../../global/helper'

import useLoginUser from '../../hooks/useLoginUser'
import useGetCurrentUser from '../../hooks/useGetCurrentUser';

import InputField from '../../components/InputField'
import Button from '../../components/Button'

import GlobalStyle from '../../global/styles'
import Colors from '../../global/colors'
import i18n from '../../lang'

import {
    setToken,
    setUser
} from '../../redux/slices/auth';

const SignIn = ({navigation}) => {
    const Toast = useToast();
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [lock, setLock] = useState(true)
    const [password, setPassword] = useState('')
    const phoneInput = useRef()

    const [checkUserResponse, getCurrentUser] = useGetCurrentUser();
    const [loginResponse, loginUser] = useLoginUser();
    const [signing, setSigning] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChange = (text) => setPassword(text)
    const onIconClick = () => setLock(e => !e)

    const onNext = () => {
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
        } else if(password === '') {
            Toast.show(i18n.t('Please Input Your Password'), {
                type: "danger",
                placement: "top",
                duration: 2000,
                offset: 80,
                animationType: "zoom-in",
            });
        } else {
            setLoading(true);
            let phone = phoneNumber.replace(/[^0-9]/g, ''); setPhoneNumber(phone);
            loginUser({
                "phone": phone,
                "password": password,
                "type": "password"
            }, getCurrentLanguage());
        }
    }

    useEffect(() => {
        if(loginResponse !== null) {
            setLoading(false);
            if(loginResponse.success) {
                setSigning(true);
                Toast.show(i18n.t('Signing'), {
                    type: "success",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });

                let token = `Bearer ${loginResponse.token}`;
                dispatch(setToken(token));

                getCurrentUser(token, getCurrentLanguage())
            } else {
                Toast.show(loginResponse.message, {
                    type: "danger",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });
            }
        }
    }, [loginResponse])

    useEffect(() => {
        if(signing) {
            if(checkUserResponse.success) {
                dispatch(setUser(checkUserResponse.user));
                Toast.show(i18n.t('Sign In Success'), {
                    type: "success",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });
                setSigning(false);

                navigation.replace('Welcome')
            } else {
                Toast.show(checkUserResponse.message, {
                    type: "danger",
                    placement: "top",
                    duration: 2000,
                    offset: 80,
                    animationType: "zoom-in",
                });
            }
        }
    }, [checkUserResponse])

    return (
        <View style={[GlobalStyle.container, GlobalStyle.flex('column', 'center', 'flex-start')]}>
            <View style={GlobalStyle.width(100)}>
                <View style={[GlobalStyle.flex('row', 'space-between', 'flex-end'), GlobalStyle.margin(0, 0, 20, 0)]}>
                    <Text style={[GlobalStyle.h3, {color: Colors.dark2}]}>{i18n.t('Sign In')}</Text>
                    <Link replace={true} navigation={navigation} to='SignUp' text={i18n.t('Sign Up')} textStyle={[GlobalStyle.h6, GlobalStyle.greenLabel]} />
                </View>

                <Text style={[GlobalStyle.h6, GlobalStyle.grayLabel]}>{i18n.t('Welcome back')}</Text>
            </View>

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

            <InputField lock={lock} onIconClick={onIconClick} placeholder={i18n.t('Password')} icon={<Feather name={lock ? 'eye' : 'eye-off'} size={20} color={Colors.gray} />} onChange={onChange} />

            <Link navigation={navigation} replace={false} to='ForgotPassword' text={i18n.t('Forgot Password?')} textStyle={[GlobalStyle.margin(50, 0, 0, 0), GlobalStyle.h6, GlobalStyle.greenLabel, GlobalStyle.underline]} />
            <Text style={[GlobalStyle.h7, GlobalStyle.grayLabel, GlobalStyle.margin(5, 0, 0, 0)]}>{i18n.t('Remember me')}</Text>

            <Button onPress={onNext} loading={loading} text={i18n.t('Next')} Style={{position: 'absolute', bottom: 20 }} textColor="#fff" bgColor={Colors.green} Icon={<AntDesign name="arrowright" size={18} color='white' />} />
        </View>
    )
}

export default SignIn