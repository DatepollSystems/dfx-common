import {AEntity} from '../entities/abstract-entity';
import {UndefinedOrNullOr} from '../types';

export class ArrayHelper {
  public static isIterable(obj: any): boolean {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  public static isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  /**
   * Returns <code>true</code> if the array contains duplicates, <code>false</code> if not
   * @param {any[]} array
   * @return boolean
   */
  public static containsDuplicates(array: any[]): boolean {
    return array.length !== new Set(array).size;
  }

  public static containsEntity<T extends AEntity<number | string>>(array: T[], value: UndefinedOrNullOr<T>): boolean {
    if (!value) {
      return false;
    }
    for (const entity of array) {
      if (entity.hashCode() === value.hashCode()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Adds object to array if the object is absent
   * @param {T[]} array
   * @param {T|undefined} value
   * @return {T[]}
   */
  public static addIfAbsent<T>(array: T[], value: UndefinedOrNullOr<T>): T[] {
    if (value && !array.includes(value)) {
      array.push(value);
    }
    return array;
  }

  /**
   * Adds entity to array if the entity is absent
   * @param {T[]} array
   * @param {T|undefined} value
   * @return {T[]}
   */
  public static addEntityIfAbsent<T extends AEntity<number | string>>(array: T[], value: UndefinedOrNullOr<T>): T[] {
    if (value) {
      if (!this.containsEntity(array, value)) {
        array.push(value);
      }
    }
    return array;
  }

  /**
   * Adds object to array if the object is absent
   * @param {T[]} array
   * @param {T|undefined} value
   * @return {T[]}
   */
  public static addIfPresent<T>(array: T[], value: UndefinedOrNullOr<T>): T[] {
    if (value && array.includes(value)) {
      array.push(value);
    }
    return array;
  }

  /**
   * Removes object from array if the object is present
   * @param {T[]} array
   * @param {T|undefined} value
   * @return {T[]}
   */
  public static removeIfPresent<T>(array: T[], value: UndefinedOrNullOr<T>): T[] {
    if (value && array.includes(value)) {
      array.splice(array.indexOf(value), 1);
    }
    return array;
  }

  /**
   * Removes entity from array if the entity is present
   * @param {T[]} array
   * @param {T|undefined} value
   * @return {T[]}
   */
  public static removeEntityIfPresent<T extends AEntity<number | string>>(array: T[], value: UndefinedOrNullOr<T>): T[] {
    if (this.containsEntity(array, value) && value) {
      array.splice(array.indexOf(value), 1);
    }
    return array;
  }

  /**
   * Removes entities from array if the entities are present
   * @param {T[]} array
   * @param {T[]} values
   * @return {T[]}
   */
  public static removeEntitiesIfPresent<T extends AEntity<number | string>>(array: T[], values: T[]): T[] {
    const toRemove = [];
    for (const entity of array) {
      for (const value of values) {
        if (entity.hashCode() == value.hashCode()) {
          toRemove.push(entity);
        }
      }
    }
    for (const entity of toRemove) {
      array.splice(array.indexOf(entity), 1);
    }
    return array;
  }

  /**
   * Calls computeFunction with object if object is absent
   * @param {T[]} array
   * @param {T|undefined} value
   * @param {(value: T)} computeFunction
   */
  public static computeIfAbsent<T>(array: T[], value: UndefinedOrNullOr<T>, computeFunction: (value: T) => void): void {
    if (value && !array.includes(value)) {
      computeFunction(value);
    }
  }

  /**
   * Calls computeFunction with object if object is present
   * @param {T[]} array
   * @param {T|undefined} value
   * @param {(value: T)} computeFunction
   */
  public static computeIfPresent<T>(array: T[], value: UndefinedOrNullOr<T>, computeFunction: (value: T) => void): void {
    if (value && array.includes(value)) {
      computeFunction(value);
    }
  }
}
