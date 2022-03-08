import {TypeHelper} from './TypeHelper';
import {Converter} from './Converter';
import {UndefinedOrNullOr} from '../types';

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
  public static set(key: string, value: number, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: boolean, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: Date, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: Object, ttl?: number): void;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public static set(key: string, value: string, ttl?: number): void;
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
    if (val == null) {
      return undefined;
    }
    return val;
  }

  public static getNumber(key: string): number | undefined {
    const val = this.getString(key);
    if (val == null) {
      return undefined;
    }
    return Converter.toNumber(val);
  }

  public static getBoolean(key: string): boolean | undefined {
    const val = this.getString(key);
    if (val == null) {
      return undefined;
    }
    return Converter.toBoolean(val);
  }

  public static getDate(key: string): Date | undefined {
    const val = this.getString(key);
    if (val == null) {
      return undefined;
    }
    return new Date(Converter.toNumber(val));
  }

  public static getObject(key: string): any | undefined {
    const val = this.getString(key);
    if (val == undefined) {
      return undefined;
    }
    return JSON.parse(val);
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
   * @param {string} key
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
   * Get the count / size of all entries
   */
  public static size(): number {
    return localStorage.length;
  }

  /**
   * Checks if entries exists
   * @return boolean Returns <code>true</code> if local storage is empty, <code>false</code> if not
   */
  public static isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * Checks if entries exists
   * @return boolean Returns <code>false</code> if local storage is empty, <code>true</code> if not
   */
  public static hasEntries(): boolean {
    return !this.isEmpty();
  }
}
