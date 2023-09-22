import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './en'
import ar from './ar'
import az from './az'
import ge from './ge'
import ru from './ru'
import tr from './tr'

const translations = {
    en: en,
    ar: ar,
    az: az,
    ge: ge,
    ru: ru,
    tr: tr
};

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default i18n;