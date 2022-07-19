import {IList} from './list.interface';
import {ACommonList} from './list.abstract';
import {ManyOrUndefinedOrNullOr} from '../types';
import {listOf} from './list.functions';

export type IArrayList<T> = IList<T>;

export class List<T> extends ACommonList<List<T>, T> implements IArrayList<T> {
  constructor(items?: ManyOrUndefinedOrNullOr<T>) {
    super(items);
  }

  public create(list?: List<T>): List<T> {
    return new List<T>(list);
  }

  public createSimpleList<U>(): List<U> {
    return listOf<U>();
  }
}
