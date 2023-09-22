import {View, Text, StyleSheet, ImageBackground} from 'react-native'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

import GlobalStyle from '../global/styles'
import Background from '../assets/bg.jpg'

import { getCurrentLanguage, isUserAuthorized } from '../global/helper';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import {currentState} from '../redux/slices/auth'

import {
    setToken,
    setUser
} from '../redux/slices/auth';

const SplashScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const Auth = useSelector(currentState)
    const [currentUserResponse, getCurrentUser] = useGetCurrentUser();

    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    useEffect(() => {
        if(currentUserResponse !== null) {
            if(!currentUserResponse.success) {
                dispatch(setToken(null))
                dispatch(setUser(null))
                setTimeout(() => {
                    navigation.replace('SignIn')
                }, 2000);
            } else {
                setTimeout(() => {
                    // navigation.replace('SignIn') //testing
                    navigation.replace('Welcome') //check token
                }, 2000)
            }
        }
    }, [currentUserResponse])

    useEffect(() => {
        if(fontsLoaded) {
            if(Auth.user !== null && Auth.user.payload !== null && Auth.user.payload !== undefined && Auth.user.payload !== '') {
                getCurrentUser(Auth.token.payload, getCurrentLanguage())
            }
        }
    }, [fontsLoaded])

    return (
        <ImageBackground style={[GlobalStyle.container]} source={Background}>
            
        </ImageBackground>
    )
}

const Styles = StyleSheet.create({

})

export default SplashScreen