import {IList} from './list.interface';
import {ACommonList} from './list.abstract';
import {IEntity} from '../entities/entity.interface';
import {ManyOrUndefinedOrNullOr, StringOrNumber, UndefinedOrNullOr} from '../types';
import {List} from './list';
import {listOf} from './list.functions';

export type IEntityList<T extends IEntity<StringOrNumber>> = IList<T>;

export class EntityList<T extends IEntity<StringOrNumber>> extends ACommonList<EntityList<T>, T> implements IEntityList<T> {
  constructor(items?: ManyOrUndefinedOrNullOr<T>) {
    super(items);
  }

  public create(list?: EntityList<T>): EntityList<T> {
    return new EntityList<T>(list);
  }

  public createSimpleList<U>(): List<U> {
    return listOf<U>();
  }

  public override containsAny(item: UndefinedOrNullOr<T>): boolean {
    if (!item) {
      return false;
    }
    for (const entity of this) {
      if (entity.hashCode() === item.hashCode()) {
        return true;
      }
    }
    return false;
  }

  public override containsNone(item: UndefinedOrNullOr<T>): boolean {
    if (!item) {
      return false;
    }
    for (const entity of this) {
      if (entity.hashCode() === item.hashCode()) {
        return false;
      }
    }
    return true;
  }

  public override indexOf(searchElement: T, fromIndex: number = 0): number {
    for (let i = fromIndex; i < this.size(); i++) {
      if (this[i].hashCode() === searchElement.hashCode()) {
        return i;
      }
    }
    return -1;
  }
}
