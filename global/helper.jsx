import { Platform, NativeModules } from "react-native"

export const getCurrentLanguage = () => {
    const locale = 
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale
            : NativeModules.I18nManager.localeIdentifier

    return locale.substring(0, 2);
}

export const isUserAuthorized = (Auth) => {
    return !(Auth.user === null || Auth.user.payload === null || Auth.user.payload === undefined || Auth.user.payload === '');
}