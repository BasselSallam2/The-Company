import i18next from "i18next";
import { LanguageDetector } from "i18next-http-middleware";

import en from "@public/locales/en.json" with { type: "json" };
import ar from "@public/locales/ar.json" with { type: "json" };

i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: "ar",
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    detection: {
      order: ["header"],
    },
    interpolation: { escapeValue: false },
  });

export default i18next;
