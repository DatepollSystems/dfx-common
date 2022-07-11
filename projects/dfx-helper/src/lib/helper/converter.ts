import {UndefinedOrNullOr} from '../types';

export class Converter {
  public static nullToUndefined<T>(value: T | null): T | undefined {
    if (value === null) {
      return undefined;
    }
    return value;
  }

  public static undefinedToNull<T>(value: T | undefined): T | null {
    if (value === undefined) {
      return null;
    }
    return value;
  }

  //region to boolean
  /**
   * Converts string or number to boolean
   * @param {string|number|boolean} value Value to check
   * @return {boolean} Returns <code>true</code> if value is <code>"1"</code>, <code>1</code> or <code>"true"</code>,
   * <code>false</code> if not
   */
  public static toBoolean(value: UndefinedOrNullOr<number | string | boolean>): boolean {
    if (value == null) {
      return false;
    }
    if (typeof value === 'boolean') {
      return value;
    }
    return typeof value !== 'number' ? value.trim().toLowerCase() === 'true' || value.trim().toLowerCase() === '1' : value === 1;
  }
  /**
   * @deprecated <b>Use <code>toBoolean(value)</code></b>
   *
   * Converts value to boolean
   * @param {string} value
   * @return {boolean} Returns <code>true</code> if trimmed to lower case value equals <code>'true'</code>, else <code>false</code>
   */
  public static stringToBoolean(value: UndefinedOrNullOr<string>): boolean {
    return this.toBoolean(value);
  }

  /**
   * @deprecated <b>Use <code>toBoolean(value)</code></b>
   *
   * Converts value to boolean
   * @param {number} value
   * @return {boolean} Returns <code>true</code> if value is <code>1</code>, else <code>false</code>
   */
  public static numberToBoolean(value: number): boolean {
    return this.toBoolean(value);
  }
  //endregion

  //region to string
  /**
   * Converts number or boolean to string
   * @param {boolean|number} value Value to check
   * @return {string}
   */
  public static toString(value: UndefinedOrNullOr<string | number | boolean>): string {
    if (value == null) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    return typeof value !== 'number' ? (value ? 'true' : 'false') : value.toString();
  }
  /**
   * @deprecated <b>Use <code>toString(value)</code></b>
   *
   * Converts value to string
   * @param {boolean} value
   * @return {string} Returns <code>'true'</code> if the value is <code>true</code>, else <code>'false'</code>
   */
  public static booleanToString(value: UndefinedOrNullOr<boolean>): string {
    return this.toString(value);
  }

  /**
   * @deprecated <b>Use <code>toString(value)</code></b>
   *
   * Converts value to string
   * @param {number} value
   * @return string
   */
  public static numberToString(value: UndefinedOrNullOr<number>): string {
    return this.toString(value);
  }
  //endregion

  //region to Number
  /**
   * Converts string or boolean to number
   * @param {string|boolean} value Value to check
   * @return {number} Returns <code>Number.MAX_SAFE_INTEGER</code> if value is <code>null</code> or <code>undefined</code>
   */
  public static toNumber(value: UndefinedOrNullOr<string | boolean | number>): number {
    if (value == null) {
      return Number.MAX_SAFE_INTEGER;
    }
    if (typeof value === 'number') {
      return value;
    }
    return typeof value !== 'string' ? (value ? 1 : 0) : parseFloat(value);
  }

  /**
   * @deprecated <b>Use <code>toNumber(value)</code></b>
   *
   * Converts value to number
   * @param {string} value
   * @return {number}
   */
  public static stringToNumber(value: string): number {
    return this.toNumber(value);
  }

  /**
   * @deprecated <b>Use <code>toNumber(value)</code></b>
   *
   * Converts value to number
   * @param {boolean} value
   * @return {number} Returns <code>1</code> if the value is <code>true</code>, else <code>0</code>
   */
  public static booleanToNumber(value: boolean): number {
    return this.toNumber(value);
  }
  //endregion
}
