import {Component} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {DfxTranslateModule} from '../lib/dfx-translate.module';
import {TranslateService} from '../lib/translate.service';

@Component({
  template: ' <div>{{ translateKey | tr }}</div> ',
})
class TestTranslateDirectiveComponent {
  translateKey?: string;
}

describe('TranslateConfig2', () => {
  let translateService: TranslateService;

  beforeEach(() => {
    void TestBed.configureTestingModule({
      declarations: [TestTranslateDirectiveComponent],
      imports: [HttpClientModule, DfxTranslateModule.boot({languagesWithAutoTranslation: ['de'], assetsPath: 'assets/i18n/'})],
    }).compileComponents();

    localStorage.setItem('language', 'en');
    translateService = TestBed.inject(TranslateService);
  });

  it('should store changed language as cookie 2', async () => {
    expect(localStorage.getItem('language')).toBe('en');
    expect(translateService.getSelectedLanguage()).toBe('en');
  });

  it('should fail on loading language', async () => {
    await translateService.use('de');
    expect(translateService.translations).toEqual({});
  });
});
