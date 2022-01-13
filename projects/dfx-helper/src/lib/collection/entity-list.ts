import {IList} from './list.interface';
import {List} from './list';
import {StringOrNumber, UndefinedOrNullOr} from '../types';
import {IEntity} from '../entities/entity.interface';

export class EntityList<T extends IEntity<StringOrNumber>> extends List<T> implements IList<T> {
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

  public override clone(): IList<T> {
    return new EntityList<T>(this);
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
