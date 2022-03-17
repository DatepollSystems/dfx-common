import {ModuleWithProviders, NgModule} from '@angular/core';

import {HELPER_CONFIG, HelperConfig} from './helper.config';

@NgModule()
export class DfxHelperModule {
  static boot(configuration?: HelperConfig): ModuleWithProviders<DfxHelperModule> {
    return DfxHelperModule.setup(configuration);
  }

  static setup(configuration?: HelperConfig): ModuleWithProviders<DfxHelperModule> {
    console.log(configuration);
    return {
      ngModule: DfxHelperModule,
      providers: [
        {
          provide: HELPER_CONFIG,
          useValue: configuration,
        },
      ],
    };
  }
}
