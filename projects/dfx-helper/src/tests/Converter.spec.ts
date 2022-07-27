import {Converter} from '../lib/helper/converter';

describe('Converter', () => {
  it('toNumber', () => {
    expect(Converter.toNumber(null)).toBe(Number.MAX_SAFE_INTEGER);
    expect(Converter.toNumber(undefined)).toBe(Number.MAX_SAFE_INTEGER);
    expect(Converter.toNumber(12)).toBe(12);
  });
  it('toString', () => {
    expect(Converter.toString(null)).toBe('');
    expect(Converter.toString(undefined)).toBe('');
    expect(Converter.toString('irgendwas')).toBe('irgendwas');
  });
  it('toBoolean', () => {
    expect(Converter.toBoolean(true)).toBeTrue();
    expect(Converter.toBoolean(false)).toBeFalse();
  });
  it('stringToBoolean', () => {
    expect(Converter.stringToBoolean('true')).toBeTrue();
    expect(Converter.stringToBoolean('true')).toBeDefined();
    expect(Converter.stringToBoolean('false')).toBeFalse();
    expect(Converter.stringToBoolean('asdfasdfasdf')).toBeFalse();
    expect(Converter.stringToBoolean('dddddd')).toBeFalse();
    expect(Converter.stringToBoolean(null)).toBeFalse();
    expect(Converter.stringToBoolean(undefined)).toBeFalse();
  });
  it('booleanToString', () => {
    expect(Converter.booleanToString(true)).toBeDefined();
    expect(Converter.booleanToString(true)).toBe('true');
    expect(Converter.booleanToString(false)).toBe('false');
  });
  it('numberToString', () => {
    expect(Converter.numberToString(1)).toBe('1');
    expect(Converter.numberToString(1)).toBeDefined();
    expect(Converter.numberToString(120000)).toBe('120000');
    expect(Converter.numberToString(123.12)).toBe('123.12');
    expect(Converter.numberToString(0.000012)).toBe('0.000012');
  });
  it('stringToNumber', () => {
    expect(Converter.stringToNumber('1')).toBe(1);
    expect(Converter.stringToNumber('1')).toBeDefined();
    expect(Converter.stringToNumber('120000')).toBe(120000);
    expect(Converter.stringToNumber('123.12')).toBe(123.12);
    expect(Converter.stringToNumber('0.00000012')).toBe(0.00000012);
  });
  it('numberToBoolean', () => {
    expect(Converter.numberToBoolean(1)).toBeDefined();
    expect(Converter.numberToBoolean(1)).toBeTrue();
    expect(Converter.numberToBoolean(12)).toBeFalse();
    expect(Converter.numberToBoolean(0)).toBeFalse();
    expect(Converter.numberToBoolean(-12)).toBeFalse();
    expect(Converter.numberToBoolean(12.213)).toBeFalse();
    expect(Converter.numberToBoolean(-1)).toBeFalse();
  });
  it('booleanToNumber', () => {
    expect(Converter.booleanToNumber(true)).toBeDefined();
    expect(Converter.booleanToNumber(true)).toBe(1);
    expect(Converter.booleanToNumber(false)).toBe(0);
  });
  it('nullToUndefined', () => {
    let test: string | null = null;
    expect(Converter.nullToUndefined(test)).toBeUndefined();
  });
  it('undefinedToNull', () => {
    let test: string | undefined = undefined;
    expect(Converter.undefinedToNull(test)).toBeNull();
  });
});
