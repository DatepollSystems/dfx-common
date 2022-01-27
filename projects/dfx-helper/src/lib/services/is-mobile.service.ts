import {Inject, Injectable, NgZone} from '@angular/core';
import {Subject} from 'rxjs';
import {HELPER_CONFIG, HelperConfig} from '../helper.config';

@Injectable({
  providedIn: 'root',
})
export class IsMobileService {
  private _isMobile = true;
  public isMobileChange: Subject<boolean> = new Subject<boolean>();

  // noinspection TypeScriptFieldCanBeMadeReadonly
  private defaultIsMobileBreakpoint = 992;

  constructor(@Inject(HELPER_CONFIG) private config: HelperConfig, private ngZone: NgZone) {
    this.defaultIsMobileBreakpoint = config?.isMobileBreakpoint != null ? config.isMobileBreakpoint : this.defaultIsMobileBreakpoint;

    if (window.screen.width > this.defaultIsMobileBreakpoint) {
      this.setIsMobile(false);
    }

    window.onresize = () => {
      this.ngZone.run(() => {
        if (window.screen.width > this.defaultIsMobileBreakpoint) {
          this.setIsMobile(false);
        } else {
          this.setIsMobile(true);
        }
      });
    };
  }

  public getIsMobile(): boolean {
    return this._isMobile;
  }

  private setIsMobile(isMobile: boolean) {
    this._isMobile = isMobile;
    this.isMobileChange.next(this._isMobile);
  }
}
