import {StringHelper} from '../helper/StringHelper';

describe('StringHelper', () => {
  it('isUrl', () => {
    expect(StringHelper.isUrl('http://ab.at')).toBeTrue();
    expect(StringHelper.isUrl('https://datepoll.org')).toBeTrue();
    expect(StringHelper.isUrl('datepollsystems.org')).toBeTrue();
    expect(StringHelper.isUrl('datepollsystemsorg')).toBeFalse();
    expect(StringHelper.isUrl(':datepollsy.stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('httpdatepollsy.stemsorg')).toBeTrue();
    expect(StringHelper.isUrl('httpsdatepollsy.stemsorg')).toBeTrue();
    expect(StringHelper.isUrl('httpsdatepollsy:stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('httpdatepollsy:stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('/httpdatepollsy.stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('/httpsdatepollsy.stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('/httpsdatepollsy:stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('/httpdatepollsy:stemsorg')).toBeFalse();
    expect(StringHelper.isUrl('/httpdatepollsy.stemsorg:')).toBeFalse();
    expect(StringHelper.isUrl('/httpsdatepollsy.stemsorg:')).toBeFalse();
    expect(StringHelper.isUrl('/httpsdatepollsy:stemsorg:')).toBeFalse();
    expect(StringHelper.isUrl('/httpdatepollsy:stemsorg:')).toBeFalse();
    expect(StringHelper.isUrl('http://a.at')).toBeTrue();
  });
  it('isEmail', () => {
    expect(StringHelper.isEmail('test@test.at')).toBeTrue();
    expect(StringHelper.isEmail('keineemail')).toBeFalse();
    expect(StringHelper.isEmail('test.at')).toBeFalse();
    expect(StringHelper.isEmail('test@testt')).toBeFalse();
    expect(StringHelper.isEmail('test@.at')).toBeFalse();
  });
  it('isNoUrl', () => {
    expect(StringHelper.isNoUrl('http://ab.at')).toBeFalse();
    expect(StringHelper.isNoUrl('https://datepoll.org')).toBeFalse();
    expect(StringHelper.isNoUrl('datepollsystems.org')).toBeFalse();
    expect(StringHelper.isNoUrl('httpdatepollsy.stemsorg')).toBeFalse();
    expect(StringHelper.isNoUrl('httpsdatepollsy.stemsorg')).toBeFalse();
    expect(StringHelper.isNoUrl('http://a.at')).toBeFalse();
    expect(StringHelper.isNoUrl('datepollsystemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl(':datepollsy.stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('httpsdatepollsy:stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('httpdatepollsy:stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpdatepollsy.stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpsdatepollsy.stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpsdatepollsy:stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpdatepollsy:stemsorg')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpdatepollsy.stemsorg:')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpsdatepollsy.stemsorg:')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpsdatepollsy:stemsorg:')).toBeTrue();
    expect(StringHelper.isNoUrl('/httpdatepollsy:stemsorg:')).toBeTrue();
  });
  it('isNoEmail', () => {
    expect(StringHelper.isNoEmail('test@test.at')).toBeFalse();
    expect(StringHelper.isNoEmail('keineemail')).toBeTrue();
    expect(StringHelper.isNoEmail('test.at')).toBeTrue();
    expect(StringHelper.isNoEmail('test@testt')).toBeTrue();
    expect(StringHelper.isNoEmail('test@.at')).toBeTrue();
  });
  it('hasNumbersInString', () => {
    expect(StringHelper.hasNumbersInString('true')).toBeFalse();
    expect(StringHelper.hasNumbersInString('false')).toBeFalse();
    expect(StringHelper.hasNumbersInString('lajhsdlkfqwejröqjkafkjöaskdjfvövjaölwekjörqqwer!"§$!"§$%§$%&"$§"§!"§$&/%&/$(&/(=&/(%$&/§$')).toBeFalse();
    expect(StringHelper.hasNumbersInString('asdf0000')).toBeTrue();
    expect(StringHelper.hasNumbersInString('001212asdfasd2342')).toBeTrue();
    expect(StringHelper.hasNumbersInString('123')).toBeTrue();
    expect(StringHelper.hasNumbersInString('-12')).toBeTrue();
    expect(StringHelper.hasNumbersInString('0.00000002323')).toBeTrue();
    expect(StringHelper.hasNumbersInString('121212.00000002323')).toBeTrue();
    expect(StringHelper.hasNumbersInString('00000.0000')).toBeTrue();
  });
  it('hasNoNumbersInString', () => {
    expect(StringHelper.hasNoNumbersInString('true')).toBeTrue();
    expect(StringHelper.hasNoNumbersInString('false')).toBeTrue();
    expect(StringHelper.hasNoNumbersInString('lajhsdlkfqwejröqjkafkjöaskdjfvövjaölwekjörqqwer!"§$!"§$%§$%&"$§"§!"§$&/%&/$(&/(=&/(%$&/§$')).toBeTrue();
    expect(StringHelper.hasNoNumbersInString('asdf0000')).toBeFalse();
    expect(StringHelper.hasNoNumbersInString('001212asdfasd2342')).toBeFalse();
    expect(StringHelper.hasNoNumbersInString('123')).toBeFalse();
    expect(StringHelper.hasNoNumbersInString('-12')).toBeFalse();
    expect(StringHelper.hasNoNumbersInString('0.00000002323')).toBeFalse();
    expect(StringHelper.hasNoNumbersInString('121212.00000002323')).toBeFalse();
    expect(StringHelper.hasNoNumbersInString('00000.0000')).toBeFalse();
  });
  it('hasOnlyLettersInString', () => {
    expect(StringHelper.hasOnlyLettersInString('true')).toBeTrue();
    expect(StringHelper.hasOnlyLettersInString('false')).toBeTrue();
    expect(StringHelper.hasOnlyLettersInString('false.')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('false-')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('false+')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('false#')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('lajhsdlkfqwejröqjkafkjöaskdjfvövjaölwekjörqqwer!"§$!"§$%§$%&"$§"§!"§$&/%&/$(&/(=&/(%$&/§$--..')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('asdf0000')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('001212asdfasd2342')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('123')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('-12')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('0.00000002323')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('121212.00000002323')).toBeFalse();
    expect(StringHelper.hasOnlyLettersInString('00000.0000')).toBeFalse();
  });
  it('hasNotOnlyLettersInString', () => {
    expect(StringHelper.hasNotOnlyLettersInString('true')).toBeFalse();
    expect(StringHelper.hasNotOnlyLettersInString('false')).toBeFalse();
    expect(StringHelper.hasNotOnlyLettersInString('false.')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('false-')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('false+')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('false#')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('lajhsdlkfqwejröqjkafkjöaskdjfvövjaölwekjörqqwer!"§$!"§$%§$%&"$§"§!"§$&/%&/$(&/(=&/(%$&/§$--..')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('asdf0000')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('001212asdfasd2342')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('123')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('-12')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('0.00000002323')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('121212.00000002323')).toBeTrue();
    expect(StringHelper.hasNotOnlyLettersInString('00000.0000')).toBeTrue();
  });
  it('cutString', () => {
    expect(StringHelper.cutString('DasIstEinTest', 5)).toBe('DasIs...');
    expect(StringHelper.cutString('DasIstEinTest', 20)).toBe('DasIstEinTest');
    expect(StringHelper.cutString('DasIstEinTest')).toBe('DasIstEinT...');
    expect(StringHelper.cutString('DasIstEinTest', 5, null)).toBe('DasIs');
    expect(StringHelper.cutString('DasIstEinTest', 5, '..')).toBe('DasIs..');
  });
  it('getImploded', () => {
    const test = ['Apple', 'Bannana', 'Rasberry', 'Pie', 'Ananas', 'Lannanas'];
    expect(StringHelper.getImploded(test)).toBe('Apple, Bannana, Rasberry, Pie, Ananas, Lannanas, ');
    expect(StringHelper.getImploded(test, undefined, undefined)).toBe('Apple, Bannana, Rasberry, Pie, Ananas, Lannanas, ');
    expect(StringHelper.getImploded(test, undefined, undefined, null)).toBe('Apple, Bannana, Rasberry, Pie, Ananas, Lannanas, ');

    expect(StringHelper.getImploded(test, 40)).toBe('Apple, Bannana, Rasberry, Pie, Ananas, L...');
    expect(StringHelper.getImploded(test, 40, undefined, null)).toBe('Apple, Bannana, Rasberry, Pie, Ananas, L');

    expect(StringHelper.getImploded(test, 15, undefined, null)).toBe('Apple, Bannana,');
    expect(StringHelper.getImploded(test, 15, undefined, 'BBB')).toBe('Apple, Bannana,BBB');
    expect(StringHelper.getImploded(test, 15)).toBe('Apple, Bannana,...');

    expect(StringHelper.getImploded(test, undefined, ';')).toBe('Apple; Bannana; Rasberry; Pie; Ananas; Lannanas; ');
  });
});
