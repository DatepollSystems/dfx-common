import {TypeHelper} from '../helper/type-helper';

describe('TypeHelper', () => {
  it('isBoolean', () => {
    expect(TypeHelper.isBoolean('true')).toBeFalse();
    expect(TypeHelper.isBoolean('false')).toBeFalse();
    expect(TypeHelper.isDate(1)).toBeFalse();
    expect(TypeHelper.isDate('test')).toBeFalse();
    expect(TypeHelper.isDate(['test', 'test'])).toBeFalse();
    expect(TypeHelper.isBoolean(true)).toBeTrue();
    expect(TypeHelper.isBoolean(false)).toBeTrue();
    const test = true;
    const test1 = false;
    expect(TypeHelper.isBoolean(test)).toBeTrue();
    expect(TypeHelper.isBoolean(test1)).toBeTrue();
  });
  it('isDate', () => {
    expect(TypeHelper.isDate('2020-12-12')).toBeFalse();
    expect(TypeHelper.isDate('12:12')).toBeFalse();
    expect(TypeHelper.isDate(1)).toBeFalse();
    expect(TypeHelper.isDate('test')).toBeFalse();
    expect(TypeHelper.isDate(true)).toBeFalse();
    expect(TypeHelper.isDate(['test', 'test'])).toBeFalse();
    expect(TypeHelper.isDate(new Date())).toBeTrue();
    expect(TypeHelper.isDate(new Date('2020-12-12'))).toBeTrue();
    const test = new Date('2019-12-12');
    expect(TypeHelper.isDate(test)).toBeTrue();
  });
  it('isNumeric', () => {
    expect(TypeHelper.isNumeric('true')).toBeFalse();
    expect(TypeHelper.isNumeric('false')).toBeFalse();
    expect(TypeHelper.isNumeric('asdf0000')).toBeFalse();
    expect(TypeHelper.isNumeric('001212asdfasd2342')).toBeTrue();
    expect(TypeHelper.isNumeric('123')).toBeTrue();
    expect(TypeHelper.isNumeric('-12')).toBeTrue();
    expect(TypeHelper.isNumeric('0.00000002323')).toBeTrue();
    expect(TypeHelper.isNumeric('121212.00000002323')).toBeTrue();
    expect(TypeHelper.isNumeric('00000.0000')).toBeTrue();
    expect(TypeHelper.isNumeric(2048)).toBeTrue();
    expect(TypeHelper.isNumeric(true)).toBeFalse();
  });
  it('isString', () => {
    expect(TypeHelper.isString('true')).toBeTrue();
    expect(TypeHelper.isString('false')).toBeTrue();
    expect(TypeHelper.isString('asdf0000')).toBeTrue();
    expect(TypeHelper.isString('001212asdfasd2342')).toBeTrue();
    expect(TypeHelper.isString('123')).toBeTrue();
    expect(TypeHelper.isString('-12')).toBeTrue();
    expect(TypeHelper.isString('0.00000002323')).toBeTrue();
    expect(TypeHelper.isString('121212.00000002323')).toBeTrue();
    expect(TypeHelper.isString('00000.0000')).toBeTrue();
  });
  it('isNumber', () => {
    expect(TypeHelper.isNumber('true')).toBeFalse();
    expect(TypeHelper.isNumber('false')).toBeFalse();
    expect(TypeHelper.isNumber('asdf0000')).toBeFalse();
    expect(TypeHelper.isNumber('001212asdfasd2342')).toBeFalse();
    expect(TypeHelper.isNumber('123')).toBeFalse();
    expect(TypeHelper.isNumber('-12')).toBeFalse();
    expect(TypeHelper.isNumber('0.00000002323')).toBeFalse();
    expect(TypeHelper.isNumber('121212.00000002323')).toBeFalse();
    expect(TypeHelper.isNumber('00000.0000')).toBeFalse();
    expect(TypeHelper.isNumber(0)).toBeTrue();
    expect(TypeHelper.isNumber(1000.1)).toBeTrue();
    expect(TypeHelper.isNumber(-1)).toBeTrue();
    expect(TypeHelper.isNumber(Number.MAX_SAFE_INTEGER)).toBeTrue();
    expect(TypeHelper.isNumber(Number.MAX_SAFE_INTEGER + 1)).toBeTrue();
  });
});
