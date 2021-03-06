import {Pipe, PipeTransform} from '@angular/core';

import {TranslateService} from './translate.service';

@Pipe({
  name: 'tr',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private translator: TranslateService) {}

  transform(key?: string | null): string {
    if (!key) {
      return 'undefined';
    }
    let translation = this.translator.translations[key];
    if (translation) {
      return translation;
    }

    translation = this.translator.autoGeneratedTranslations[key];
    if (translation) {
      return translation;
    }

    return key;
  }
}
