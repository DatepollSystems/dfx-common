import {TypeHelper} from './type-helper';
import {Converter} from './converter';
import {UndefinedOrNullOr} from '../types';
import {Generator, RandomStringOptions} from './generator';

export class StorageHelper {
  private static ttlSuffix = '_ttl';

  //region Setter

  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: null | undefined, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: UndefinedOrNullOr<number>, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: UndefinedOrNullOr<boolean>, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: UndefinedOrNullOr<Date>, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: UndefinedOrNullOr<Object>, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: UndefinedOrNullOr<string>, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: unknown, ttl?: number): void {
    if (value == null) {
      this.remove(key);
      return;
    } else if (TypeHelper.isNumber(value) || TypeHelper.isBoolean(value)) {
      value = Converter.toString(value as number | boolean);
    } else if (TypeHelper.isDate(value)) {
      value = Converter.toString((value as Date).getTime());
    } else if (TypeHelper.isObject(value)) {
      value = JSON.stringify(value);
    }

    if (ttl) {
      let deathTime = new Date();
      deathTime.setSeconds(deathTime.getSeconds() + ttl);
      this.set(key + this.ttlSuffix, deathTime);
    }

    localStorage.setItem(key, value as string);
  }

  /**
   * @deprecated Use <code>StorageHelper.set()</code>
   */
  public static setObject(key: string, value: UndefinedOrNullOr<Object>): void {
    this.set(key, value as Object);
  }

  //endregion

  //region Getter
  public static getString(key: string): string | undefined {
    const ttl = localStorage.getItem(key + this.ttlSuffix);
    if (ttl) {
      if (new Date().getTime() > new Date(Converter.toNumber(ttl)).getTime()) {
        localStorage.removeItem(key + this.ttlSuffix);
        localStorage.removeItem(key);
        return undefined;
      }
    }

    const val = localStorage.getItem(key);
    if (val === null) {
      return undefined;
    }
    return val;
  }

  public static getNumber(key: string): number | undefined {
    const val = this.getString(key);
    return val ? Converter.toNumber(val) : undefined;
  }

  public static getBoolean(key: string): boolean | undefined {
    const val = this.getString(key);
    return val ? Converter.toBoolean(val) : undefined;
  }

  public static getDate(key: string): Date | undefined {
    const val = this.getString(key);
    return val ? new Date(Converter.toNumber(val)) : undefined;
  }

  public static getObject(key: string): any | undefined {
    const val = this.getString(key);
    return val ? JSON.parse(val) : undefined;
  }

  //endregion

  /**
   * Check if a specific entry exists
   * @param {string} key
   * @return boolean Returns <code>true</code> if an entry exists, <code>false</code> if not
   */
  public static exists(key: string): boolean {
    return this.getString(key) != undefined;
  }

  /**
   * Removes an entry
   * @param {string} key Key to remove
   */
  public static remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Removes all entries
   */
  public static removeAll(): void {
    localStorage.clear();
  }

  /**
   * Get the length of the storage
   */
  public static size(): number {
    return localStorage.length;
  }

  /**
   * Checks if local storage is empty
   * @return {boolean} Returns <code>true</code> if local storage is empty, <code>false</code> if not
   */
  public static isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Checks if local storage has entries
   * @return {boolean} Returns <code>true</code> if local storage has entries, <code>false</code> if not
   */
  public static hasEntries(): boolean {
    return !this.isEmpty();
  }

  /**
   * Checks if local storage is full
   * @return {boolean} Returns <code>true</code> if local storage is full, <code>false</code> if not
   */
  public static isFull(): boolean {
    const key = Generator.stringByOptions(6, RandomStringOptions.NUMBERS, RandomStringOptions.SPECIAL_CHARACTERS);
    try {
      localStorage.setItem(key, '0');
    } catch (e) {
      return true;
    }
    this.remove(key);
    return false;
  }

  /**
   * Checks if local storage is not full
   * @return {boolean} Returns <code>true</code> if local storage is not full, <code>false</code> if not
   */
  public static isNotFull(): boolean {
    return !this.isFull();
  }
}
