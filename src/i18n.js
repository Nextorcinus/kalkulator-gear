import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import id from "./locales/id.json";
import es from "./locales/es.json";
import de from "./locales/de.json";
import ko from "./locales/ko.json";
import jp from "./locales/jp.json";
import zh from "./locales/zh.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
    es: { translation: es },
    de: { translation: de },
    ko: { translation: ko },
    jp: { translation: jp },
    zh: { translation: zh },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
