import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {DfxTranslateModule} from '../lib/dfx-translate.module';
import {TranslateService} from '../lib/translate.service';
import {serviceStub} from './helper';

@Component({
  template: ' <div>{{ translateKey | tr }}</div> ',
})
class TestTranslateDirectiveComponent {
  translateKey?: string;
}

describe('TranslateConfigChanged', () => {
  let translateService: TranslateService;

  beforeEach(() => {
    localStorage.clear();

    void TestBed.configureTestingModule({
      declarations: [TestTranslateDirectiveComponent],
      imports: [
        DfxTranslateModule.boot({
          defaultLanguage: 'de',
        }),
      ],
      providers: [{provide: HttpClient, useValue: serviceStub}],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  it('should use default values', () => {
    expect(translateService.defaultLanguage).toBe('de');
    expect(translateService.getSelectedLanguage()).toBe('de');
    expect(translateService.useLocalStorage).toBeTrue();
    expect(translateService.languagesWithAutoTranslation.length).toBe(0);
  });

  it('should language be defined', () => {
    expect(translateService.translations).not.toEqual({});
  });

  it('should not store default language as cookie', () => {
    expect(localStorage.getItem('language')).toBeNull();
    expect(translateService.getSelectedLanguage()).toBe('de');
  });

  it('should store changed language as cookie', async () => {
    expect(localStorage.getItem('language')).toBeNull();
    await translateService.use('en');
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('should change language via spy', async () => {
    const spy = spyOn(translateService, 'use');
    await translateService.use('en');
    expect(spy).toHaveBeenCalledWith('en');
  });

  it('should change language', async () => {
    await translateService.use('de');
    expect(translateService.getSelectedLanguage()).toBe('de');
  });
});
