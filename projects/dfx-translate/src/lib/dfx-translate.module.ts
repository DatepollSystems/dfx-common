import {APP_INITIALIZER, ModuleWithProviders, NgModule} from '@angular/core';

import {TranslatePipe} from './translate.pipe';
import {TranslateService} from "./translate.service";
import {TRANSLATE_CONFIG, TranslateConfig} from "./translate.config";

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
  providers: []
})
export class DfxTranslateModule {
  static boot(configuration: TranslateConfig): ModuleWithProviders<DfxTranslateModule> {
    return DfxTranslateModule.setup(configuration);
  };

  static config(configuration: TranslateConfig): ModuleWithProviders<DfxTranslateModule> {
    console.log('dfx-translate | DEPRECATED API USAGE; Please use DfxTranslateModule.setup(...)')
    return DfxTranslateModule.setup(configuration);
  };

  static setup(configuration: TranslateConfig): ModuleWithProviders<DfxTranslateModule> {
    console.log(configuration);
    return {
      ngModule: DfxTranslateModule,
      providers: [
        {
          provide: TRANSLATE_CONFIG,
          useValue: configuration
        },
        {
          provide: APP_INITIALIZER,
          useFactory: setupTranslateFactory,
          deps: [TranslateService],
          multi: true
        },
      ]
    };
  }
}

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use();
}
