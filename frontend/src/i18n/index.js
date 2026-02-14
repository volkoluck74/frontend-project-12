import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ruAll from './locales/ru/all.json'

const resources = {
  ru: {
    all: ruAll,
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    debug: true,
    ns: ['all'],
    defaultNS: 'all',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
