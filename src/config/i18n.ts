import i18next from "i18next";
import { LanguageDetector } from "i18next-http-middleware";
import backend from "i18next-fs-backend";
import path from "path";
import fs from "fs";

const root = process.cwd();

const en = JSON.parse(
  fs.readFileSync(path.join(root, "translation/en.json"), "utf-8")
);
const ar = JSON.parse(
  fs.readFileSync(path.join(root, "translation/ar.json"), "utf-8")
);

i18next
  .use(LanguageDetector)
  .use(backend)
  .init({
    fallbackLng: "ar",
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    detection: {
      order: ["header"], 
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export { i18next };
