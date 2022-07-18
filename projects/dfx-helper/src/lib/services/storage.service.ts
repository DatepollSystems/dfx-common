import {UndefinedOrNullOr} from '../types';
import {StorageHelper} from '../helper/storage-helper';

export class StorageService {
  //region Setter

  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: null | undefined | unknown, ttl?: number): StorageService;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: UndefinedOrNullOr<number>, ttl?: number): StorageService;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: UndefinedOrNullOr<boolean>, ttl?: number): StorageService;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: UndefinedOrNullOr<Date>, ttl?: number): StorageService;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: UndefinedOrNullOr<Object>, ttl?: number): StorageService;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: UndefinedOrNullOr<string>, ttl?: number): StorageService;
  /**
   * @param {string} key key for storage item
   * @param {unknown} value
   * @param {number | undefined} ttl Time to live in seconds (no guarantee it is going to be deleted on time)
   */
  public set(key: string, value: unknown, ttl?: number): StorageService {
    StorageHelper.set(key, value, ttl);
    return this;
  }

  //endregion

  //region Getter
  public static getString(key: string): string | undefined {
    return StorageHelper.getString(key);
  }

  public static getNumber(key: string): number | undefined {
    return StorageHelper.getNumber(key);
  }

  public static getBoolean(key: string): boolean | undefined {
    return StorageHelper.getBoolean(key);
  }

  public static getDate(key: string): Date | undefined {
    return StorageHelper.getDate(key);
  }

  public static getObject(key: string): any | undefined {
    return StorageHelper.getObject(key);
  }

  //endregion

  /**
   * Check if a specific entry exists
   * @param {string} key
   * @return boolean Returns <code>true</code> if an entry exists, <code>false</code> if not
   */
  public static exists(key: string): boolean {
    return StorageHelper.exists(key);
  }

  /**
   * Removes an entry
   * @param {string} key Key to remove
   */
  public static remove(key: string): StorageService {
    StorageHelper.remove(key);
    return this;
  }

  /**
   * Removes all entries
   */
  public static removeAll(): StorageService {
    StorageHelper.removeAll();
    return this;
  }

  /**
   * Get the length of the storage
   */
  public static size(): number {
    return StorageHelper.size();
  }

  /**
   * Checks if local storage is empty
   * @return {boolean} Returns <code>true</code> if local storage is empty, <code>false</code> if not
   */
  public static isEmpty(): boolean {
    return StorageHelper.isEmpty();
  }

  /**
   * Checks if local storage has entries
   * @return {boolean} Returns <code>true</code> if local storage has entries, <code>false</code> if not
   */
  public static hasEntries(): boolean {
    return StorageHelper.hasEntries();
  }

  /**
   * Checks if local storage is full
   * @return {boolean} Returns <code>true</code> if local storage is full, <code>false</code> if not
   */
  public static isFull(): boolean {
    return StorageHelper.isFull();
  }

  /**
   * Checks if local storage is not full
   * @return {boolean} Returns <code>true</code> if local storage is not full, <code>false</code> if not
   */
  public static isNotFull(): boolean {
    return StorageHelper.isNotFull();
  }

  /**
   * <b>SHOULD NEVER BE USED IN PRODUCTION</b><br/>
   * <b>ONLY FOR TESTING PURPOSE</b><br/>
   * Fills the complete local storage up (with garbage)
   * @deprecated
   */
  public static fillUp(): StorageService {
    StorageService.fillUp();
    return this;
  }
}
