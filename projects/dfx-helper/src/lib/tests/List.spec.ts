import {List} from '../collection/list';
import {AEntityWithNumberID} from '../entities/abstract-entity';
import {EntityList} from '../collection/entity-list';

describe('Collection', () => {
  it('getItems', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.getItems().length).toBe(4);
    for (const st of test.getItems()) {
      expect(st).toBeDefined();
    }
    expect(test.size()).toBe(4);
    for (const st of test) {
      expect(st).toBeDefined();
    }
  });
  it('getItself', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    for (const st of test) {
      expect(st).toBeDefined();
    }
  });
  it('size', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    for (let i = 0; i < 1000; i++) {
      test.add('test' + i);
    }
    expect(test.size()).toBe(test.length);
    expect(test.size()).toBe(1004);
  });
  it('removeAll', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    test.removeAll();
    expect(test.size()).toBe(0);
  });
  it('set', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    test.set(['test', 'test2', 'test3']);
    expect(test.size()).toBe(3);
  });
  it('isEmpty', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    const test1 = new List<string>();
    expect(test1.isEmpty()).toBeTrue();
    expect(test.isEmpty()).toBeFalse();
  });
  it('hasEntries', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    const test1 = new List<string>();
    expect(test1.hasEntries()).toBeFalse();
    expect(test.hasEntries()).toBeTrue();
  });
  it('clone', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    const testClone = test.clone();
    const test2 = test;
    test.remove(['test2', 'test4']);
    expect(test.size()).toBe(2);
    expect(test2.size()).toBe(2);
    expect(testClone.size()).toBe(4);
    testClone.remove('test3');
    expect(testClone.size()).toBe(3);
    expect(test.size()).toBe(2);
    expect(test2.size()).toBe(2);
  });
  it('shuffle', () => {
    const tarr = ['test', 'test2', 'test3', 'test4'];
    for (let i = 5; i < 1000; i++) {
      tarr.push('test' + i);
    }
    const test = new List<string>(tarr);
    test.shuffle();
    let check = false;
    for (let i = 0; i < test.length; i++) {
      if (test[i] !== tarr[i]) {
        check = true;
        break;
      }
    }
    expect(check).toBeTrue();
  });
  it('clone&shuffle', () => {
    const tarr = ['test', 'test2', 'test3', 'test4'];
    for (let i = 5; i < 1000; i++) {
      tarr.push('test' + i);
    }
    const test1 = new List<string>(tarr);
    const test = test1.clone().shuffle();
    let check = false;
    for (let i = 0; i < test.length; i++) {
      if (test[i] !== tarr[i]) {
        check = true;
        break;
      }
    }
    expect(check).toBeTrue();

    check = false;
    for (let i = 0; i < test.length; i++) {
      if (test1[i] !== tarr[i]) {
        check = true;
        break;
      }
    }
    expect(check).toBeFalse();
  });
  it('add Item', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    test.add('test5');
    test.add(null);
    test.add(undefined);
    expect(test.size()).toBe(5);
    expect(test[3]).toBe('test4');
    expect(test[4]).toBe('test5');
  });
  it('add Item with duplicates', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    test.add('test5');
    test.add('test5');
    expect(test.size()).toBe(6);
  });
  it('add Items', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    test.add(['test5', 'test6', 'test7']);
    expect(test.size()).toBe(7);
    expect(test[3]).toBe('test4');
    expect(test[4]).toBe('test5');
    expect(test[6]).toBe('test7');
  });
  it('add Items with duplicates', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4']);
    expect(test.size()).toBe(4);
    test.add(['test5', 'test6', 'test7']);
    expect(test.size()).toBe(7);
    test.add(['test5', 'test6', 'test7']);
    expect(test.size()).toBe(10);
  });
  it('remove Item', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    expect(test.size()).toBe(5);
    test.remove('wowowow');
    expect(test.size()).toBe(5);
    test.remove('test2');
    expect(test.size()).toBe(4);
    test.remove('test3');
    test.remove('test4');
    test.remove(undefined);
    test.remove(null);
    expect(test.size()).toBe(2);
    const test2 = new List<any>(['test', 'test2', 'test3', 'test4', 'test5']);
    test2.remove([undefined, null, 'test6']);
    expect(test2.size()).toBe(5);
  });
  it('remove Item with duplicates', () => {
    const test = new List<string>(['test', 'test2', 'test2', 'test4', 'test5']);
    expect(test.size()).toBe(5);
    test.remove('test2');
    expect(test.size()).toBe(4);
  });
  it('remove Items with duplicates', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test4', 'test5']);
    expect(test.size()).toBe(6);
    test.remove(['test3', 'test4']);
    expect(test.size()).toBe(4);
  });
  it('contains duplicates', () => {
    let test = new List<string>(['test', 'test2', 'test3', 'test4', 'test4', 'test5']);
    expect(test.containsDuplicates()).toBeTrue();
    test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    expect(test.containsDuplicates()).toBeFalse();
  });
  it('containsAny', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test4', 'test5']);
    expect(test.containsAny('test4')).toBeTrue();
    expect(test.containsAny('test')).toBeTrue();
    expect(test.containsAny('test1212')).toBeFalse();
    expect(test.containsAny(null)).toBeFalse();
    expect(test.containsAny(undefined)).toBeFalse();
  });
  it('containsNone', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test4', 'test5']);
    expect(test.containsNone('test400')).toBeTrue();
    expect(test.containsNone('test20000')).toBeTrue();
    expect(test.containsNone('test2')).toBeFalse();
    expect(test.containsNone(null)).toBeFalse();
    expect(test.containsNone(undefined)).toBeFalse();
  });
  it('addIf', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    expect(test.size()).toBe(5);
    test.addIf('test6', (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(6);
    test.addIf('test', (item) => {
      expect(item).toBeDefined();
      return false;
    });
    test.addIf(null, (item) => {
      expect(item).toBeDefined();
      return false;
    });
    test.addIf(undefined, (item) => {
      expect(item).toBeDefined();
      return false;
    });
    test.addIf(undefined, (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(6);
    test.addIf(['testttttt', 'testtttttttt'], (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(8);
    const test2 = new List<any>(['test', 'test2', 'test3', 'test4', 'test5']);
    test2.addIf([undefined, null, 'test6'], (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test2.size()).toBe(6);
  });
  it('addIfAbsent', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    expect(test.size()).toBe(5);
    test.addIfAbsent('test6');
    expect(test.size()).toBe(6);
    test.addIfAbsent('test');
    test.addIfAbsent(null);
    test.addIfAbsent(undefined);
    expect(test.size()).toBe(6);
  });
  it('removeIf', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    expect(test.size()).toBe(5);
    test.removeIf('test6', (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(5);
    test.removeIf('test', (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(4);
    test.removeIf('test2', (item) => {
      expect(item).toBeDefined();
      return false;
    });
    expect(test.size()).toBe(4);
    test.removeIf(null, (item) => {
      expect(item).toBeDefined();
      return false;
    });
    test.removeIf(undefined, (item) => {
      expect(item).toBeDefined();
      return false;
    });
    test.removeIf(undefined, (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(4);
    test.removeIf(['test2', 'test3'], (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test.size()).toBe(2);
    const test2 = new List<any>(['test', 'test2', 'test3', 'test4', 'test5']);
    test2.removeIf([undefined, null, 'test5', 'test6'], (item) => {
      expect(item).toBeDefined();
      return true;
    });
    expect(test2.size()).toBe(4);
  });
  it('removeIfPresent', () => {
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    test.removeIfPresent('test6');
    expect(test.size()).toBe(5);
    test.removeIfPresent('test');
    expect(test.size()).toBe(4);
  });
  it('foreachIf', () => {
    let i = 0;
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    test.forEachIf(
      (item) => {
        expect(item).toBeDefined();
        i++;
      },
      (item) => {
        expect(item).toBeDefined();
        return true;
      }
    );
    expect(i).toBe(5);
    i = 0;
    test.forEachIf(
      (item) => {
        expect(item).toBeDefined();
        i++;
      },
      (item) => {
        expect(item).toBeDefined();
        return false;
      }
    );
    expect(i).toBe(0);
  });
  it('computeIfPresent', () => {
    let i = 0;
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    test.computeIfPresent(['test', 'test2'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(2);
    i = 0;
    test.computeIfPresent(['test', 'test2', 'test1000'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(2);
    i = 0;
    test.computeIfPresent(['test100000', 'test222222', 'test1000'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(0);
    i = 0;
    test.computeIfPresent('test1000', (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(0);
    i = 0;
    test.computeIfPresent('test', (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(1);
  });
  it('computeIfAbsent', () => {
    let i = 0;
    const test = new List<string>(['test', 'test2', 'test3', 'test4', 'test5']);
    test.computeIfAbsent(['test', 'test2'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(0);
    i = 0;
    test.computeIfAbsent('test1000', (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(1);
    i = 0;
    test.computeIfAbsent('test', (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(0);
    i = 0;
    test.computeIfAbsent(['test', 'test2', 'test1000'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(1);
    i = 0;
    test.computeIfAbsent(['test100000', 'test222222', 'test1000'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(3);
    i = 0;
    test.computeIfAbsent(['test100000', 'test222222', 'test1000'], (item) => {
      expect(item).toBeDefined();
      i++;
    });
    expect(i).toBe(3);
  });
  it('EntityList containsAny', () => {
    const entity1 = new TestEntity(0);
    const entity2 = new TestEntity(0);
    const entity3 = new TestEntity(1);
    const entity4 = new TestEntity(2);
    const entity5 = new TestEntity2(1);
    const test = new EntityList<TestEntity>([entity1, entity3]);
    expect(test.containsAny(entity1)).toBeTrue();
    expect(test.containsAny(entity2)).toBeTrue();
    expect(test.containsAny(entity3)).toBeTrue();
    expect(test.containsAny(entity5)).toBeTrue();
    expect(test.containsAny(entity4)).toBeFalse();
  });
  it('EntityList remove', () => {
    const entity1 = new TestEntity(0);
    const entity2 = new TestEntity(0);
    const entity3 = new TestEntity(1);
    const entity4 = new TestEntity(2);
    const entity5 = new TestEntity2(1);
    const test = new EntityList<TestEntity>([entity1, entity3]);
    expect(test.remove(entity1).length).toBe(1);
    test.add(entity1);
    expect(test.length).toBe(2);
    expect(test.remove(entity2).length).toBe(1);
    test.add(entity1);
    expect(test.remove(entity4).length).toBe(2);
    expect(test.remove(entity5).length).toBe(1);
  });
  it('EntityList remove list', () => {
    const entity1 = new TestEntity(0);
    const entity2 = new TestEntity(1);
    const entity3 = new TestEntity(2);
    const entity4 = new TestEntity(3);
    const entity5 = new TestEntity(4);
    const entity6 = new TestEntity2(4);
    const test = new EntityList<TestEntity>([entity1, entity2, entity3, entity5]);
    const test2 = new EntityList<TestEntity>([entity1, entity3, entity4, entity6]);
    expect(test.remove(test2).length).toBe(1);
  });
  it('EntityList clone', () => {
    const entity1 = new TestEntity(0);
    const entity2 = new TestEntity(1);
    const entity3 = new TestEntity(2);
    const entity4 = new TestEntity(3);
    const test = new EntityList<TestEntity>([entity1, entity2, entity3, entity4]);
    const testClone = test.clone();
    expect(testClone.length).toBe(4);
    expect(testClone.length).toBe(test.length);
  });
});

class TestEntity extends AEntityWithNumberID {
  constructor(id: number) {
    super(id);
  }
}

class TestEntity2 extends AEntityWithNumberID {
  constructor(id: number) {
    super(id);
  }
}
