import {TypeHelper} from './TypeHelper';
import {Converter} from './Converter';
import {UndefinedOrNullOr} from '../types';

export class StorageHelper {
  //region Setter
  public static set(key: string, value: number): void;
  public static set(key: string, value: string): void;
  public static set(key: string, value: boolean): void;
  public static set(key: string, value: Date): void;
  public static set(key: string, value: UndefinedOrNullOr<any>): void;
  public static set(key: string, value: any): void {
    if (value == null) {
      this.remove(key);
      return;
    } else if (TypeHelper.isNumber(value) || TypeHelper.isBoolean(value)) {
      value = Converter.toString(value);
    } else if (TypeHelper.isDate(value)) {
      value = Converter.toString(value.getTime());
    }

    localStorage.setItem(key, value);
  }

  public static setObject(key: string, value: any): void {
    if (value == null) {
      this.set(key, value);
      return;
    }
    this.set(key, JSON.stringify(value));
  }

  //endregion

  //region Getter
  public static getString(key: string): string | undefined {
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
   * Check if an specific entry exists
   * @param {string} key
   * @return boolean Returns <code>true</code> if an entry exists, <code>false</code> if not
   */
  public static exists(key: string): boolean {
    return localStorage.getItem(key) != null;
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
