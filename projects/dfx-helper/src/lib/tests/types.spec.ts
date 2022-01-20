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

describe('Types KeyValuePair.parseIntoParams', () => {
  it('parse multiple numbers', () => {
    const params = KeyValuePair.parseIntoHttpParams([
      {key: 'uId', value: 1},
      {key: 'miaId', value: 2},
    ]);
    console.log(params);
    expect(params).toBeDefined();
    expect(params?.get('uId')).toBe('1');
    expect(params?.get('miaId')).toBe('2');
  });

  it('parse multiple strings', () => {
    const params = KeyValuePair.parseIntoHttpParams([
      {key: 'uId', value: 'wow'},
      {
        key: 'miaId',
        value: 'lol',
      },
    ]);
    expect(params).toBeDefined();
    expect(params?.get('uId')).toBe('wow');
    expect(params?.get('miaId')).toBe('lol');
  });

  it('parse multiple booleans', () => {
    const params = KeyValuePair.parseIntoHttpParams([
      {key: 'uId', value: false},
      {
        key: 'miaId',
        value: true,
      },
    ]);
    expect(params).toBeDefined();
    expect(params?.get('uId')).toBe('false');
    expect(params?.get('miaId')).toBe('true');
  });
  it('parse multiple types', () => {
    const params = KeyValuePair.parseIntoHttpParams([
      {key: 'uId', value: false},
      {key: 'miaId', value: 'wow'},
      {
        key: 'try',
        value: 1,
      },
    ]);
    expect(params).toBeDefined();
    expect(params?.get('uId')).toBe('false');
    expect(params?.get('miaId')).toBe('wow');
    expect(params?.get('try')).toBe('1');
  });
  it('parse single', () => {
    const params = KeyValuePair.parseIntoHttpParams([{key: 'uId', value: 'ashdkgfkagewrqkhwgqjvad'}]);
    expect(params).toBeDefined();
    expect(params?.get('uId')).toBe('ashdkgfkagewrqkhwgqjvad');
  });
  it('contains duplicates fail', () => {
    expect(function () {
      KeyValuePair.parseIntoHttpParams([
        {key: 'uId', value: 'wow'},
        {
          key: 'uId',
          value: 'lol',
        },
      ]);
    }).toThrow('KeyValuePairs contains duplicates');
  });
  it('parse types with null', () => {
    const params = KeyValuePair.parseIntoHttpParams([
      {key: 'uId', value: null},
      {key: 'miaId', value: 'wow'},
      {
        key: 'try',
        value: 1,
      },
      {key: 'bId', value: undefined},
    ]);
    expect(params).toBeDefined();
    expect(params?.get('uId')).toBeNull();
    expect(params?.get('bId')).toBeNull();
    expect(params?.get('miaId')).toBe('wow');
    expect(params?.get('try')).toBe('1');
  });
  it('parse undefined or null key value pair', () => {
    expect(KeyValuePair.parseIntoHttpParams(null)).toBeUndefined();
    expect(KeyValuePair.parseIntoHttpParams(undefined)).toBeUndefined();
    expect(KeyValuePair.parseIntoHttpParams([])).toBeUndefined();
  });
  it('parse empty array', () => {
    expect(KeyValuePair.parseIntoHttpParams([])).toBeUndefined();
  });
});
