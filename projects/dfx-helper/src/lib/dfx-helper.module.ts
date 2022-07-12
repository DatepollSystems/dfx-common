import {ModuleWithProviders, NgModule} from '@angular/core';

import {HELPER_CONFIG, HelperConfig} from './helper.config';
import {LoggerFactory} from './helper/logger';

@NgModule()
export class DfxHelperModule {
  static boot(configuration?: HelperConfig): ModuleWithProviders<DfxHelperModule> {
    return DfxHelperModule.setup(configuration);
  }

  static setup(configuration?: HelperConfig): ModuleWithProviders<DfxHelperModule> {
    if (configuration == null) {
      configuration = {} as HelperConfig;
    }
    LoggerFactory.getLogger('DfxHelperModule').log('setup', 'Configuration file', configuration);
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
