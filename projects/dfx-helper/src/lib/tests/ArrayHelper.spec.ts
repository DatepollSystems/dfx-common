import {ArrayHelper} from '../helper/ArrayHelper';
import {AEntity} from '../entities/abstract-entity';

describe('ArrayHelper', () => {
  it('isArray', () => {
    expect(ArrayHelper.isArray(['abc', 'abc', 'abc', 'bcc', 'cdf', 'xyz'])).toBeTrue();
    expect(ArrayHelper.isArray(new Set<string>(['abc', 'bcc', 'cdf', 'xyz']))).toBeFalse();
    const map = new Map<number, string>();
    map.set(0, 'test2');
    map.set(1, 'test3');
    expect(ArrayHelper.isArray(map)).toBeFalse();
    expect(ArrayHelper.isArray([1, 2, 3, 1])).toBeTrue();
  });
  it('isIterable', () => {
    expect(ArrayHelper.isIterable(['abc', 'abc', 'abc', 'bcc', 'cdf', 'xyz'])).toBeTrue();
    expect(ArrayHelper.isIterable(new Set<string>(['abc', 'bcc', 'cdf', 'xyz']))).toBeTrue();
    const map = new Map<number, string>();
    map.set(0, 'test2');
    map.set(1, 'test3');
    expect(ArrayHelper.isIterable(map)).toBeTrue();
    expect(ArrayHelper.isIterable([1, 2, 3, 1])).toBeTrue();
    expect(ArrayHelper.isIterable(null)).toBeFalse();
    expect(ArrayHelper.isIterable(undefined)).toBeFalse();
  });
  it('containsDuplicates', () => {
    expect(ArrayHelper.containsDuplicates(['abc', 'abc', 'abc', 'bcc', 'cdf', 'xyz'])).toBeTrue();
    expect(ArrayHelper.containsDuplicates(['abc', 'bcc', 'cdf', 'xyz'])).toBeFalse();
    expect(ArrayHelper.containsDuplicates([1, 2, 3, 4, 5, 7])).toBeFalse();
    expect(ArrayHelper.containsDuplicates([1, 2, 3, 1])).toBeTrue();
  });
  it('containsEntity', () => {
    const entity = new TestEntity(0);
    expect(ArrayHelper.containsEntity([entity, new TestEntity(1), new TestEntity(2)], entity)).toBeTrue();
    expect(ArrayHelper.containsEntity([new TestEntity(1), new TestEntity(2)], entity)).toBeFalse();
    expect(ArrayHelper.containsEntity([new TestEntity(1), new TestEntity(2)], undefined)).toBeFalse();
  });
  it('addIfAbsent', () => {
    expect(ArrayHelper.addIfAbsent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'hjk')).toEqual(['abc', 'bcc', 'cdf', 'xyz', 'hjk']);
    expect(ArrayHelper.addIfAbsent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'abc')).toEqual(['abc', 'bcc', 'cdf', 'xyz']);
    expect(ArrayHelper.addIfAbsent<number>([1, 2, 3, 4, 5, 7], 200)).toEqual([1, 2, 3, 4, 5, 7, 200]);
    expect(ArrayHelper.addIfAbsent<number>([1, 2, 3, 4, 5, 200], 200)).toEqual([1, 2, 3, 4, 5, 200]);
  });
  it('addEntityIfAbsent', () => {
    const entity = new TestEntity(0);
    expect(ArrayHelper.addEntityIfAbsent([entity, new TestEntity(1), new TestEntity(2), new TestEntity(3)], entity).length).toBe(4);
    expect(ArrayHelper.addEntityIfAbsent([new TestEntity(1), new TestEntity(2)], entity).length).toBe(3);
    expect(ArrayHelper.addEntityIfAbsent([new TestEntity(1), new TestEntity(2)], null).length).toBe(2);
    expect(ArrayHelper.addEntityIfAbsent([new TestEntity(1), new TestEntity(2)], undefined).length).toBe(2);
  });
  it('addIfPresent', () => {
    expect(ArrayHelper.addIfPresent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'hjk')).toEqual(['abc', 'bcc', 'cdf', 'xyz']);
    expect(ArrayHelper.addIfPresent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'abc')).toEqual(['abc', 'bcc', 'cdf', 'xyz', 'abc']);
    expect(ArrayHelper.addIfPresent<number>([1, 2, 3, 4, 5, 7], 200)).toEqual([1, 2, 3, 4, 5, 7]);
    expect(ArrayHelper.addIfPresent<number>([1, 2, 3, 4, 5, 200], 200)).toEqual([1, 2, 3, 4, 5, 200, 200]);
  });
  it('removeIfPresent', () => {
    expect(ArrayHelper.removeIfPresent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'hjk')).toEqual(['abc', 'bcc', 'cdf', 'xyz']);
    expect(ArrayHelper.removeIfPresent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'abc')).toEqual(['bcc', 'cdf', 'xyz']);
    expect(ArrayHelper.removeIfPresent<number>([1, 2, 3, 4, 5, 7], 200)).toEqual([1, 2, 3, 4, 5, 7]);
    expect(ArrayHelper.removeIfPresent<number>([1, 2, 3, 4, 5, 200], 200)).toEqual([1, 2, 3, 4, 5]);
  });
  it('removeEntityIfPresent', () => {
    const entity = new TestEntity(0);
    expect(ArrayHelper.removeEntityIfPresent([entity, new TestEntity(1), new TestEntity(2), new TestEntity(3)], entity).length).toBe(3);
    expect(ArrayHelper.removeEntityIfPresent([new TestEntity(1), new TestEntity(2)], entity).length).toBe(2);
  });
  it('removeEntitiesIfPresent', () => {
    const entity = new TestEntity(0);
    const entity2 = new TestEntity(100);
    expect(ArrayHelper.removeEntitiesIfPresent([entity, entity2, new TestEntity(1), new TestEntity(2), new TestEntity(3)], [entity, entity2]).length).toBe(3);
    expect(ArrayHelper.removeEntitiesIfPresent([entity, entity2, new TestEntity(1), new TestEntity(2)], [entity]).length).toBe(3);
    expect(ArrayHelper.removeEntitiesIfPresent([entity, new TestEntity(1), new TestEntity(2)], [entity, entity2]).length).toBe(2);
    expect(ArrayHelper.removeEntitiesIfPresent([new TestEntity(1), new TestEntity(2)], [entity, entity2]).length).toBe(2);
  });
  it('computeIfAbsent', () => {
    ArrayHelper.computeIfAbsent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'hjk', value => {
      expect(value).toEqual('hjk');
    });
    ArrayHelper.computeIfAbsent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'xyz', value => {
      // Should never be executed
      expect(value).toEqual('abc');
    });
  });
  it('computeIfPresent', () => {
    ArrayHelper.computeIfPresent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'hjk', value => {
      // Should never be executed
      expect(value).toEqual('asdfasdfasdfasdf');
    });
    ArrayHelper.computeIfPresent<string>(['abc', 'bcc', 'cdf', 'xyz'], 'xyz', value => {
      expect(value).toEqual('xyz');
    });
  });
});

class TestEntity extends AEntity<number> {
  constructor(id: number) {
    super(id);
  }
}
