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

describe('TranslateConfig', () => {
  let translateService: TranslateService;

  beforeEach(() => {
    localStorage.clear();

    void TestBed.configureTestingModule({
      declarations: [TestTranslateDirectiveComponent],
      imports: [DfxTranslateModule.boot()],
      providers: [{provide: HttpClient, useValue: serviceStub}],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  it('should use default values', () => {
    expect(translateService.defaultLanguage).toBe('en');
    expect(translateService.selectedTranslation).toBe('en');
    expect(translateService.useLocalStorage).toBeTrue();
    expect(translateService.languagesWithAutoTranslation.length).toBe(0);
  });

  it('should language be defined', () => {
    expect(translateService.translations).not.toEqual({});
  });

  it('should autotranslated language be undefined', () => {
    expect(translateService.autoGeneratedTranslations).toEqual({});
  });

  it('should store default language as cookie', () => {
    expect(localStorage.getItem('language')).toBeDefined();
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('should store changed language as cookie', async () => {
    expect(localStorage.getItem('language')).toBeDefined();
    await translateService.use('de');
    expect(localStorage.getItem('language')).toBe('de');
  });

  it('should change language via spy', async () => {
    const spy = spyOn(translateService, 'use');
    await translateService.use('de');
    expect(spy).toHaveBeenCalledWith('de');
  });

  it('should change language', async () => {
    await translateService.use('de');
    expect(translateService.selectedTranslation).toBe('de');
  });
});
