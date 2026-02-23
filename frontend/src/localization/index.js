import { use as i18nUse } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locale/en.json';
import de from './locale/de.json';

const resources = {
    en: { translation: en },
    de: { translation: de },
};

function initI18n() {
    const defaultLanguage = 'de';

    i18nUse(initReactI18next).init({
        compatibilityJSON: 'v4',
        resources: resources,
        lng: defaultLanguage,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });
}

initI18n();
