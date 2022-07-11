import {InjectionToken} from '@angular/core';

export interface TranslateConfig {
  defaultLanguage?: string;
  useLocalStorage?: boolean;
  languagesWithAutoTranslation?: string[];
}

export const TRANSLATE_CONFIG = new InjectionToken('TRANSLATE_CONFIG');
