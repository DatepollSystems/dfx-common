import {ICommonList} from './list.interface';
import {ACommonList} from './list.abstract';
import {IEntity} from '../entities/entity.interface';
import {ManyOrUndefinedOrNullOr, StringOrNumber, UndefinedOrNullOr} from '../types';

export interface IEntityList<T> extends ICommonList<IEntityList<T>, T> {}

export class EntityList<T extends IEntity<StringOrNumber>> extends ACommonList<EntityList<T>, T> implements IEntityList<T> {
  constructor(items?: ManyOrUndefinedOrNullOr<T>) {
    super(items);
  }

  public override clone(): EntityList<T> {
    return new EntityList<T>(this);
  }

  public override selfAsTypeT(): EntityList<T> {
    return this;
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
