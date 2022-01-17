import {KeyValuePair} from '../key-value-pair';

describe('Types KeyValuePair.parseIntoUrl', () => {
  it('parse multiple numbers', () => {
    expect(
      KeyValuePair.parse('/home/config/{uId}/{miaId}', [
        {key: 'uId', value: 1},
        {
          key: 'miaId',
          value: 2,
        },
      ])
    ).toBe('/home/config/1/2');
  });
  it('parse multiple strings', () => {
    expect(
      KeyValuePair.parse('/home/config/{uId}/{miaId}', [
        {key: 'uId', value: 'wow'},
        {
          key: 'miaId',
          value: 'lol',
        },
      ])
    ).toBe('/home/config/wow/lol');
  });
  it('parse multiple booleans', () => {
    expect(
      KeyValuePair.parse('/home/config/{uId}/{miaId}', [
        {key: 'uId', value: false},
        {
          key: 'miaId',
          value: true,
        },
      ])
    ).toBe('/home/config/false/true');
  });
  it('parse multiple types', () => {
    expect(
      KeyValuePair.parse('/home/config/{uId}/{miaId}/{try}', [
        {key: 'uId', value: false},
        {key: 'miaId', value: 'wow'},
        {
          key: 'try',
          value: 1,
        },
      ])
    ).toBe('/home/config/false/wow/1');
  });
  it('parse multiple directly behind', () => {
    expect(
      KeyValuePair.parse('/home/config/{uId}{miaId}{try}', [
        {key: 'uId', value: false},
        {key: 'miaId', value: 'wow'},
        {
          key: 'try',
          value: 1,
        },
      ])
    ).toBe('/home/config/falsewow1');
  });
  it('parse single', () => {
    expect(KeyValuePair.parse('/home/config/{uId}', [{key: 'uId', value: 'ashdkgfkagewrqkhwgqjvad'}])).toBe(
      '/home/config/ashdkgfkagewrqkhwgqjvad'
    );
  });
  it('contains duplicates fail', () => {
    expect(function () {
      KeyValuePair.parse('/home/config/{uId}/{miaId}', [
        {key: 'uId', value: 'wow'},
        {
          key: 'uId',
          value: 'lol',
        },
      ]);
    }).toThrow('KeyValuePairs contains duplicates');
  });
  it('parse null url', () => {
    expect(KeyValuePair.parse(null, [{key: 'uId', value: 'ashdkgfkagewrqkhwgqjvad'}])).toBeUndefined();
  });
  it('parse undefined url', () => {
    expect(KeyValuePair.parse(undefined, [{key: 'uId', value: 'ashdkgfkagewrqkhwgqjvad'}])).toBeUndefined();
  });
  it('parse undefined keypairs', () => {
    expect(KeyValuePair.parse('/home/config/uId', undefined)).toBe('/home/config/uId');
  });
  it('KeyValuePairs does not match all keys in url', () => {
    expect(function () {
      KeyValuePair.parse('/home/config/{uId}/{miaId}', undefined);
    }).toThrow('KeyValuePairs does not match all keys in url');
    expect(function () {
      KeyValuePair.parse('/home/config/{uId}/{miaId}', [{key: 'uId', value: 'wow'}]);
    }).toThrow('KeyValuePairs does not match all keys in url');
  });
  it('disabled KeyValuePairs does not match all keys in url', () => {
    expect(function () {
      KeyValuePair.parse('/home/config/{uId}/{miaId}', undefined, true);
    }).not.toThrow('KeyValuePairs does not match all keys in url');
    expect(function () {
      KeyValuePair.parse('/home/config/{uId}/{miaId}', [{key: 'uId', value: 'wow'}], true);
    }).not.toThrow('KeyValuePairs does not match all keys in url');
  });
  it('Url does not match all KeyValuePairs', () => {
    expect(function () {
      KeyValuePair.parse('/home/config/{uId}', [
        {key: 'uId', value: 'wow'},
        {
          key: 'test',
          value: 'lol',
        },
      ]);
    }).toThrow('Url does not match all KeyValuePairs');

    expect(function () {
      KeyValuePair.parse('/home/config/{uId}/{test}', [
        {key: 'uId', value: 'wow'},
        {key: 'test', value: 'lol'},
        {
          key: 'aiasdfkasd',
          value: 'lol',
        },
      ]);
    }).toThrow('Url does not match all KeyValuePairs');
  });
  it('disable Url does not match all KeyValuePairs', () => {
    expect(function () {
      KeyValuePair.parse(
        '/home/config/{uId}',
        [
          {key: 'uId', value: 'wow'},
          {
            key: 'test',
            value: 'lol',
          },
        ],
        true
      );
    }).not.toThrow('Url does not match all KeyValuePairs');

    expect(function () {
      KeyValuePair.parse(
        '/home/config/{uId}/{test}',
        [
          {key: 'uId', value: 'wow'},
          {key: 'test', value: 'lol'},
          {
            key: 'aiasdfkasd',
            value: 'lol',
          },
        ],
        true
      );
    }).not.toThrow('Url does not match all KeyValuePairs');
  });
});
