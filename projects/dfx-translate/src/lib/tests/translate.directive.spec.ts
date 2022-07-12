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
};

const TRANSLATIONS_DE = {
  testkey1: 'testanswer1_DE',
  testkey2: 'testanswer2_DE',
};

@Component({
  template: ` <div>{{ translateKey | tr }}</div> `,
})
class TestTranslateDirectiveComponent {
  translateKey?: string;
}

describe('TranslateDirective', () => {
  let component: TestTranslateDirectiveComponent;
  let fixture: ComponentFixture<TestTranslateDirectiveComponent>;
  let de: DebugElement;
  let translateService: TranslateService;

  let serviceStub: any;

  beforeEach(() => {
    localStorage.clear();

    serviceStub = {
      get: (path: string) => {
        return of(path === 'assets/i18n/en.json' ? TRANSLATIONS_EN : TRANSLATIONS_DE);
      },
    };

    void TestBed.configureTestingModule({
      declarations: [TestTranslateDirectiveComponent],
      imports: [
        DfxTranslateModule.boot({
          useLocalStorage: false,
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
    expect(translateService.languagesWithAutoTranslation.length).toBe(0);
    expect(translateService.useLocalStorage).toBeFalse();
    expect(localStorage.getItem('language')).toBeNull();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined', () => {
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('undefined');
  });

  it('should return key', () => {
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

  it('should return value after selecting other language', async () => {
    component.translateKey = 'testkey1';
    await translateService.use('de');
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer1_DE');
  });

  it('should return other value after selecting other language', async () => {
    component.translateKey = 'testkey2';
    await translateService.use('de');
    fixture.detectChanges();
    expect((de.query(By.css('div')).nativeElement as HTMLElement).innerText).toBe('testanswer2_DE');
  });
});
