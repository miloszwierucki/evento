import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import translationEN from "./en/translation.json";
import translationPL from "./pl/translation.json";

const resources = {
  en: {
    translation: { ...translationEN },
  },
  pl: {
    translation: { ...translationPL },
  },
};

i18n.use(initReactI18next).init({
  defaultNS: "translation",
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
