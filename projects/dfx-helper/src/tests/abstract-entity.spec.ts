import {AEntityWithNumberID} from '../lib/entities/abstract-entity';
import {AEntityWithNumberIDAndName} from '../lib/entities/abstract-entity-with-name';

describe('AbstractEntity', () => {
  it('hashCode', () => {
    let test = new TestEntity(2);
    expect(test.hashCode()).toBe(2);
    test = new TestEntity(333333);
    expect(test.hashCode()).toBe(333333);
  });
  it('toString', () => {
    let test = new TestEntity(2);
    expect(test.toString()).toBe('id: "2";');
    test = new TestEntityWithName(2, 'Huber');
    expect(test.toString()).toBe('id: "2"; name: "Huber";');
  });
  it('equals', () => {
    const test = new TestEntity(2);
    const test1 = new TestEntity(2);
    const test2 = new TestEntity(22);
    const test3 = new TestEntityWithName(2, 'Test');
    const test4 = new TestEntity2(2);
    expect(test.equals(test1)).toBeTrue();
    expect(test.equals({id: 2})).toBeFalse();
    expect(test.equals([2])).toBeFalse();
    expect(test.equals(test3)).toBeFalse();
    expect(test.equals(test2)).toBeFalse();
    expect(test.equals(test4)).toBeFalse();
    expect(test.equals(null)).toBeFalse();
    expect(test.equals(2)).toBeFalse();
    expect(test.equals('dasdfasdf')).toBeFalse();
  });
});

class TestEntity extends AEntityWithNumberID {
  constructor(id: number) {
    super(id);
  }
}

class TestEntityWithName extends AEntityWithNumberIDAndName {
  constructor(id: number, name: string) {
    super(id, name);
  }
}

class TestEntity2 extends AEntityWithNumberID {
  constructor(id: number) {
    super(id);
  }
}
