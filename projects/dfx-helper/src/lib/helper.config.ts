import {InjectionToken} from '@angular/core';

export interface HelperConfig {
  isMobileBreakpoint?: number | null;
}

export const HELPER_CONFIG = new InjectionToken('HELPER_CONFIG');
