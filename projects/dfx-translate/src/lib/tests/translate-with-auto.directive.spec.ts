import {Component, DebugElement} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';

import {DfxTranslateModule} from '../dfx-translate.module';
import {TranslateService} from '../translate.service';

const TRANSLATIONS_EN = {
  testkey1: 'testanswer1',
  testkey2: 'testanswer2',
  testkey3: 'testanswer3',
  testkey4: 'testanswer4',
};

const TRANSLATIONS_DE = {
  testkey1: 'testanswer1_DE',
  testkey2: 'testanswer2_DE',
};

const TRANSLATIONS_DE_AUTO = {
  testkey3: 'testanswer3_DE_auto',
  testkey4: 'testanswer4_DE_auto',
};

@Component({
  template: ` <div>{{ translateKey | tr }}</div> `,
})
class TestTranslateDirectiveComponent {
  translateKey?: string;
}

describe('TranslateDirectiveWithAuto', () => {
  let component: TestTranslateDirectiveComponent;
  let fixture: ComponentFixture<TestTranslateDirectiveComponent>;
  let de: DebugElement;
  let translateService: TranslateService;

  let serviceStub: any;

  beforeEach(() => {
    localStorage.clear();

    serviceStub = {
      get: (path: string) => {
        return of(
          path === 'assets/i18n/en.json' ? TRANSLATIONS_EN : path === 'assets/i18n/de.json' ? TRANSLATIONS_DE : TRANSLATIONS_DE_AUTO
        );
      },
    };

    void TestBed.configureTestingModule({
      declarations: [TestTranslateDirectiveComponent],
      imports: [
        DfxTranslateModule.boot({
          useLocalStorage: false,
          languagesWithAutoTranslation: ['de'],
        }),
      ],
      providers: [{provide: HttpClient, useValue: serviceStub as HttpClient}],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);

    fixture = TestBed.createComponent(TestTranslateDirectiveComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should use configured values', () => {
    expect(translateService.defaultLanguage).toBe('en');
    expect(translateService.selectedTranslation).toBe('en');
    expect(translateService.languagesWithAutoTranslation.length).toBe(1);
    expect(translateService.useLocalStorage).toBeFalse();
    expect(localStorage.getItem('language')).toBeNull();
  });

  it('should autotranslated language be defined', async () => {
    expect(translateService.autoGeneratedTranslations).toEqual({});
    await translateService.use('de');
    expect(translateService.autoGeneratedTranslations).not.toEqual({});
  });

  it('should return undefined with auto generated', () => {
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('undefined');
  });

  it('should return key with auto generated', () => {
    component.translateKey = 'key';
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('key');
  });

  it('should return value', () => {
    component.translateKey = 'testkey1';
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer1');
  });

  it('should return other value', () => {
    component.translateKey = 'testkey2';
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer2');
  });

  it('should return autogenerated value', () => {
    component.translateKey = 'testkey4';
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer4');
  });

  it('should return value after selecting other language', async () => {
    component.translateKey = 'testkey1';
    await translateService.use('de');
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer1_DE');
  });

  it('should return autogenerated value after selecting other language', async () => {
    component.translateKey = 'testkey4';
    await translateService.use('de');
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer4_DE_auto');
  });

  it('should return other value after selecting other language', async () => {
    component.translateKey = 'testkey2';
    await translateService.use('de');
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer2_DE');
  });
});
