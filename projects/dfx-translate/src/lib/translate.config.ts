import {InjectionToken} from "@angular/core";

export interface TranslateConfig {
  defaultLanguage?: string | null;
  useLocalStorage?: boolean | null;
  languagesWithAutoTranslation?: string[]|null;
}

export const TRANSLATE_CONFIG = new InjectionToken(
  'TRANSLATE_CONFIG'
);
