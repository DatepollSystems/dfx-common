import {InjectionToken} from '@angular/core';

export interface TranslateConfig {
  defaultLanguage?: string;
  assetsPath?: string;
  useLocalStorage?: boolean;
  languagesWithAutoTranslation?: string[];
}

export const TRANSLATE_CONFIG = new InjectionToken('TRANSLATE_CONFIG');
