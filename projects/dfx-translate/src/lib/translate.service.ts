import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {TRANSLATE_CONFIG, TranslateConfig} from './translate.config';

export type translationFileType = {[key: string]: string};

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  translations: translationFileType = {};
  autoGeneratedTranslations: translationFileType = {};

  selectedTranslation = '';

  defaultLanguage = 'en';
  useLocalStorage = true;
  languagesWithAutoTranslation: string[] = [];

  constructor(private httpClient: HttpClient, @Inject(TRANSLATE_CONFIG) private config: TranslateConfig) {
    this.defaultLanguage = config?.defaultLanguage ?? this.defaultLanguage;
    this.useLocalStorage = config?.useLocalStorage ?? this.useLocalStorage;
    this.languagesWithAutoTranslation = config?.languagesWithAutoTranslation ?? this.languagesWithAutoTranslation;
  }

  translate(key?: string | null): string {
    if (!key) {
      return 'undefined';
    }
    let translation = this.translations[key];
    if (translation) {
      return translation;
    }

    translation = this.autoGeneratedTranslations[key];
    if (translation) {
      return translation;
    }

    return key;
  }

  use(pickedLanguage?: string): Promise<{}> {
    let lang = '';
    if (!pickedLanguage) {
      const language = this.useLocalStorage ? localStorage.getItem('language') : undefined;
      if (language) {
        lang = language;
        console.log('Language cookie found! Using "' + lang + '"');
      } else {
        lang = this.defaultLanguage;
        console.log('No language cookie found! Using "' + this.defaultLanguage + '" as default');
      }
    } else {
      lang = pickedLanguage;
      console.log('Language changed to "' + lang + '"');
    }

    this.selectedTranslation = lang;
    if (this.useLocalStorage) {
      localStorage.setItem('language', lang);
    }

    return new Promise<{}>((resolve) => {
      const langPath = `assets/i18n/${lang || this.defaultLanguage}.json`;
      this.httpClient.get<{}>(langPath).subscribe({
        next: (translation?: translationFileType) => {
          this.translations = translation ?? {};
          resolve(this.translations);
        },
        error: () => {
          this.translations = {};
          resolve(this.translations);
        },
      });

      // Only fetch auto generated translation if there is one
      if (this.languagesWithAutoTranslation.includes(lang)) {
        const autoLangPath = `assets/i18n/${lang}_auto.json`;
        this.httpClient.get<{}>(autoLangPath).subscribe({
          next: (translation?: translationFileType) => {
            this.autoGeneratedTranslations = translation ?? {};
            resolve(this.autoGeneratedTranslations);
          },
          error: () => {
            this.autoGeneratedTranslations = {};
            resolve(this.autoGeneratedTranslations);
          },
        });
      }
    });
  }
}
