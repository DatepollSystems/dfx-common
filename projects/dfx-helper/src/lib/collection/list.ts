import {IList} from './list.interface';
import {ICompute, IPredicate} from '../functions.interface';
import {ManyOrUndefinedOrNullOr, UndefinedOrNullOr} from '../types';

export class List<T> extends Array<T> implements IList<T> {
  constructor(items?: ManyOrUndefinedOrNullOr<T>) {
    super();
    if (items) {
      this.add(items);
    }
  }

  public getItems(): T[] {
    return this;
  }

  public clone(): IList<T> {
    return new List<T>(this);
  }

  public removeAll(): void {
    this.splice(0, this.length);
  }

  public size(): number {
    return this.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public hasEntries(): boolean {
    return !this.isEmpty();
  }

  public set(items: ManyOrUndefinedOrNullOr<T>): IList<T> {
    this.removeAll();
    return this.add(items);
  }

  public add(items: ManyOrUndefinedOrNullOr<T>): IList<T> {
    if (Array.isArray(items)) {
      items.forEach((item) => this.push(item));
    } else if (items) {
      this.push(items);
    }
    return this;
  }

  public addIf(items: ManyOrUndefinedOrNullOr<T>, filterFn: IPredicate<T>): IList<T> {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item && filterFn(item)) {
          this.add(item);
        }
      });
    } else {
      if (items && filterFn(items)) {
        this.add(items);
      }
    }
    return this;
  }

  public addIfAbsent(items: ManyOrUndefinedOrNullOr<T>): IList<T> {
    return this.addIf(items, (item) => this.containsNone(item));
  }

  public remove(items: ManyOrUndefinedOrNullOr<T>): IList<T> {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item) {
          const itemIndex = this.indexOf(item);
          if (itemIndex !== -1) {
            this.splice(itemIndex, 1);
          }
        }
      });
    } else if (items) {
      const itemIndex = this.indexOf(items);
      if (itemIndex !== -1) {
        this.splice(itemIndex, 1);
      }
    }
    return this;
  }

  public removeIf(items: ManyOrUndefinedOrNullOr<T>, filterFn: IPredicate<T>): IList<T> {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item && filterFn(item)) {
          const itemIndex = this.indexOf(item);
          if (itemIndex !== -1) {
            this.splice(itemIndex, 1);
          }
        }
      });
    } else if (items && filterFn(items)) {
      const itemIndex = this.indexOf(items);
      if (itemIndex !== -1) {
        this.splice(itemIndex, 1);
      }
    }
    return this;
  }

  public removeIfPresent(items: ManyOrUndefinedOrNullOr<T>): IList<T> {
    return this.removeIf(items, (item) => {
      return this.containsAny(item);
    });
  }

  public containsDuplicates(): boolean {
    return this.length !== new Set(this).size;
  }

  public containsAny(item: UndefinedOrNullOr<T>): boolean {
    if (!item) {
      return false;
    }
    return this.includes(item);
  }

  public containsNone(item: UndefinedOrNullOr<T>): boolean {
    if (!item) {
      return false;
    }
    return !this.includes(item);
  }

  public forEachIf(callbackFn: ICompute<T>, filterFn: IPredicate<T>): IList<T> {
    for (const item of this) {
      if (item && filterFn(item)) {
        callbackFn(item);
      }
    }
    return this;
  }

  public computeIfPresent(items: ManyOrUndefinedOrNullOr<T>, callbackFn: ICompute<T>): IList<T> {
    return this.computeIf(items, callbackFn, (item) => this.containsAny(item));
  }

  public computeIfAbsent(items: ManyOrUndefinedOrNullOr<T>, callbackFn: ICompute<T>): IList<T> {
    return this.computeIf(items, callbackFn, (item) => this.containsNone(item));
  }

  private computeIf(items: ManyOrUndefinedOrNullOr<T>, callbackFn: ICompute<T>, filterFn: IPredicate<T>): IList<T> {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item && filterFn(item)) {
          callbackFn(item);
        }
      });
    } else if (items && filterFn(items)) {
      callbackFn(items);
    }
    return this;
  }

  public shuffle(): IList<T> {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
  }
}

export function listOf<T>(...items: T[]): List<T> {
  return new List<T>(items);
}
