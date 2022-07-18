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

describe('TranslateService', () => {
  let translateService: TranslateService;

  beforeEach(() => {
    localStorage.clear();

    void TestBed.configureTestingModule({
      declarations: [TestTranslateDirectiveComponent],
      imports: [DfxTranslateModule.boot({languagesWithAutoTranslation: ['de', 'es']})],
      providers: [{provide: HttpClient, useValue: serviceStub}],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  it('should use default values', () => {
    expect(translateService.defaultLanguage).toBe('en');
    expect(translateService.selectedTranslation).toBe('en');
    expect(translateService.useLocalStorage).toBeTrue();
    expect(translateService.languagesWithAutoTranslation.length).toBe(2);
  });

  it('should language be defined', () => {
    expect(translateService.translations).not.toEqual({});
  });

  it('should autotranslated language be undefined', () => {
    expect(translateService.autoGeneratedTranslations).toEqual({});
  });

  it('should translate null & undefined', () => {
    expect(translateService.translate(null)).toBe('undefined');
    expect(translateService.translate(undefined)).toBe('undefined');
  });

  it('should translate not existing', () => {
    expect(translateService.translate('keyasdfasdf')).toBe('keyasdfasdf');
  });

  it('should translate', () => {
    expect(translateService.translate('testkey1')).toBe('testanswer1');
    expect(translateService.translate('testkey2')).toBe('testanswer2');
  });

  it('should translate not auto', () => {
    expect(translateService.translate('testkey3')).toBe('testanswer3');
    expect(translateService.translate('testkey4')).toBe('testanswer4');
  });

  it('should translate auto', async () => {
    await translateService.use('de');
    expect(translateService.translate('testkey3')).toBe('testanswer3_DE_auto');
    expect(translateService.translate('testkey4')).toBe('testanswer4_DE_auto');
  });

  it('should translate changed language', async () => {
    await translateService.use('de');
    expect(translateService.translate('testkey1')).toBe('testanswer1_DE');
    expect(translateService.translate('testkey2')).toBe('testanswer2_DE');
  });

  it('change language to local storage one', async () => {
    await translateService.use();
    expect(translateService.defaultLanguage).toBe('en');
    expect(localStorage.getItem('language')).toBe('en');
  });

  it('set error language', async () => {
    await translateService.use('es');
    expect(translateService.selectedTranslation).toBe('es');
    expect(localStorage.getItem('language')).toBe('es');
  });
});
