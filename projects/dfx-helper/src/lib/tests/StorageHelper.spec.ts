import {StorageHelper} from '../helper/storage-helper';
import {Thread} from '../helper/thread';

describe('StorageHelper', () => {
  beforeEach(() => {
    StorageHelper.removeAll();
  });
  it('checkExists&Remove&Size&Empty&hasEntries', () => {
    StorageHelper.set('key1', 'This is a test');
    StorageHelper.set('key2', 'werwerwero1234567890ß__....-,,;;;+++#ä#!"§$%&/()=?`~+.:,;·|<>');
    StorageHelper.set('key3', '202012312341234201.12112341234');
    StorageHelper.set('key4', 'true');

    expect(StorageHelper.exists('key1000')).toBeFalse();
    expect(StorageHelper.exists('key1')).toBeTrue();
    expect(StorageHelper.size()).toBe(4);
    StorageHelper.remove('key1');
    expect(StorageHelper.exists('key1')).toBeFalse();
    expect(StorageHelper.size()).toBe(3);
    expect(StorageHelper.hasEntries()).toBeTrue();
    expect(StorageHelper.isEmpty()).toBeFalse();
    StorageHelper.removeAll();
    expect(StorageHelper.isEmpty()).toBeTrue();
    expect(StorageHelper.hasEntries()).toBeFalse();
  });
  it('checkIsEmptyAndIsFull', () => {
    expect(StorageHelper.isEmpty()).toBeTrue();
    expect(StorageHelper.isFull()).toBeFalse();
    expect(StorageHelper.isNotFull()).toBeTrue();
    let i = 1;
    try {
      for (i = 1; i <= 10000; i++) {
        localStorage.setItem('test', new Array(i * 100000).join('a'));
      }
    } catch (error) {
      console.log('test stopped at i: ' + i);
      let j = 1;
      try {
        for (j = 1; j <= 100; j++) {
          localStorage.setItem('test2', new Array(j * 1000).join('a'));
        }
      } catch (error1) {
        console.log('test2 stopped at j: ' + j);
        let k = 1;
        try {
          for (k = 1; k <= 1000; k++) {
            localStorage.setItem('test3', new Array(k).join('a'));
          }
        } catch (error2) {
          console.log('test3 stopped at k: ' + k);
          console.log('total storage: ' + (i * 100000 + j * 1000 + k));
        }
      }
    }
    expect(StorageHelper.isFull()).toBeTrue();
    expect(StorageHelper.isNotFull()).toBeFalse();
  });
  it('set&GetNumber', () => {
    StorageHelper.set('key1', 1);
    StorageHelper.set('key2', 2222222222222222222);
    StorageHelper.set('key3', 2020201.12);

    expect(StorageHelper.getNumber('key1')).toBe(1);
    expect(StorageHelper.getNumber('key2')).toBe(2222222222222222222);
    expect(StorageHelper.getNumber('key3')).toBe(2020201.12);
    expect(StorageHelper.getNumber('key1000')).toBe(undefined);
  });
  it('set&GetString', () => {
    StorageHelper.set('key1', 'This is a test');
    StorageHelper.set('key2', 'werwerwero1234567890ß__....-,,;;;+++#ä#!"§$%&/()=?`~+.:,;·|<>');
    StorageHelper.set('key3', '202012312341234201.12112341234');
    StorageHelper.set('key4', 'true');

    StorageHelper.set('key20', 'test');
    expect(StorageHelper.getString('key20')).toBe('test');
    StorageHelper.set('key20', null);
    expect(StorageHelper.getString('key20')).toBe(undefined);
    expect(StorageHelper.exists('key20')).toBeFalse();

    expect(StorageHelper.getString('key1')).toBe('This is a test');
    expect(StorageHelper.getString('key2')).toBe('werwerwero1234567890ß__....-,,;;;+++#ä#!"§$%&/()=?`~+.:,;·|<>');
    expect(StorageHelper.getString('key3')).toBe('202012312341234201.12112341234');
    expect(StorageHelper.getString('key4')).toBe('true');
    expect(StorageHelper.getString('key1000')).toBe(undefined);
  });
  it('set&GetBoolean', () => {
    StorageHelper.set('key1', true);
    StorageHelper.set('key2', false);

    expect(StorageHelper.getBoolean('key1')).toBeTrue();
    expect(StorageHelper.getBoolean('key2')).toBeFalse();
    expect(StorageHelper.getBoolean('key1000')).toBe(undefined);
  });
  it('set&GetDate', () => {
    const d1 = new Date();
    const d2 = new Date();
    d2.setDate(3);
    StorageHelper.set('key1', d1);
    StorageHelper.set('key2', d2);

    expect(StorageHelper.getDate('key1')).toEqual(d1);
    expect(StorageHelper.getDate('key2')).toEqual(d2);
    expect(StorageHelper.getDate('key1000')).toBe(undefined);
  });
  it('set&GetObjectViaSetObject', () => {
    const o1 = {test: 'wowowoww', bub: 'bib'};
    const o2 = {'12341234': '333333', '--.:dasdf': 'wowowowo'};
    StorageHelper.set('key1', o1);
    StorageHelper.set('key2', o2);
    StorageHelper.set('key3', null);
    StorageHelper.set('key4', undefined);

    expect(StorageHelper.getObject('key1')).toEqual(o1);
    expect(StorageHelper.getObject('key2')).toEqual(o2);
    expect(StorageHelper.getObject('key3')).toBe(undefined);
    expect(StorageHelper.getObject('key4')).toBe(undefined);
    expect(StorageHelper.getObject('key1000')).toBe(undefined);
  });
  it('set&GetObject', () => {
    const o1 = {test: 'wowowoww', bub: 'bib'};
    const o2 = {'12341234': '333333', '--.:dasdf': 'wowowowo'};
    StorageHelper.set('key1', o1);
    StorageHelper.set('key2', o2);
    StorageHelper.set('key3', null);
    StorageHelper.set('key4', undefined);

    expect(StorageHelper.getObject('key1')).toEqual(o1);
    expect(StorageHelper.getObject('key2')).toEqual(o2);
    expect(StorageHelper.getObject('key3')).toBe(undefined);
    expect(StorageHelper.getObject('key4')).toBe(undefined);
    expect(StorageHelper.getObject('key1000')).toBe(undefined);
  });
  it('set&GetUndefinied', () => {
    StorageHelper.set('key1', 'test');
    StorageHelper.set('key2', 1);
    StorageHelper.set('key3', false);
    const o = {bla: 'bli', test: 'tust'};
    StorageHelper.set('key4', o);
    expect(StorageHelper.getString('key1')).toBe('test');
    expect(StorageHelper.getNumber('key2')).toBe(1);
    expect(StorageHelper.getBoolean('key3')).toBeFalse();
    expect(StorageHelper.getObject('key4')).toEqual(o);
    expect(StorageHelper.size()).toBe(4);

    StorageHelper.set('key1', undefined);
    StorageHelper.set('key2', undefined);
    StorageHelper.set('key3', undefined);
    StorageHelper.set('key4', undefined);

    expect(StorageHelper.exists('key1')).toBeFalse();
    expect(StorageHelper.exists('key2')).toBeFalse();
    expect(StorageHelper.exists('key3')).toBeFalse();
    expect(StorageHelper.exists('key4')).toBeFalse();
    expect(StorageHelper.getString('key1')).toBe(undefined);
    expect(StorageHelper.getNumber('key2')).toBe(undefined);
    expect(StorageHelper.getBoolean('key3')).toBe(undefined);
    expect(StorageHelper.getObject('key4')).toBe(undefined);
    expect(StorageHelper.isEmpty()).toBeTrue();

    StorageHelper.set('key1', null);
    StorageHelper.set('key2', null);
    StorageHelper.set('key3', null);
    StorageHelper.set('key4', null);

    expect(StorageHelper.exists('key1')).toBeFalse();
    expect(StorageHelper.exists('key2')).toBeFalse();
    expect(StorageHelper.exists('key3')).toBeFalse();
    expect(StorageHelper.exists('key4')).toBeFalse();
    expect(StorageHelper.getString('key1')).toBe(undefined);
    expect(StorageHelper.getNumber('key2')).toBe(undefined);
    expect(StorageHelper.getBoolean('key3')).toBe(undefined);
    expect(StorageHelper.getObject('key4')).toBe(undefined);
    expect(StorageHelper.isEmpty()).toBeTrue();
  });
  it('set&GetUndefined&Anything', () => {
    const test = (testVar: string | undefined) => {
      StorageHelper.set('key11', testVar);
    };
    test('testtt');
    expect(StorageHelper.getString('key11')).toBe('testtt');

    const test1 = (testVar: number | undefined) => {
      StorageHelper.set('key11', testVar);
    };
    test1(10);
    expect(StorageHelper.getNumber('key11')).toBe(10);

    const test2 = (testVar: boolean | undefined) => {
      StorageHelper.set('key11', testVar);
    };
    test2(false);
    expect(StorageHelper.getBoolean('key11')).toBe(false);
  });
  it('set&GetTTL', async () => {
    StorageHelper.set('key1', 'This is a test', 1);
    StorageHelper.set('key2', 'This is a test', 1);
    StorageHelper.set('key3', 'This is a test', 3);
    expect(StorageHelper.exists('key1')).toBeTrue();
    expect(StorageHelper.exists('key2')).toBeTrue();

    await Thread.sleep(1100);

    expect(StorageHelper.exists('key1')).toBeFalse();
    expect(StorageHelper.getString('key1')).toBeUndefined();
    expect(StorageHelper.getString('key2')).toBeUndefined();
    expect(StorageHelper.exists('key2')).toBeFalse();
    expect(StorageHelper.getString('key3')).toBeDefined();
    expect(StorageHelper.exists('key3')).toBeTrue();
  });
});
