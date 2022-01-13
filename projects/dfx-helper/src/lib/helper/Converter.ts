import {UndefinedOrNullOr} from '../types';

export class Converter {
  //region to boolean
  /**
   * Converts string or number to boolean
   * @param value {string|number} Value to check
   * @return boolean Returns <code>true</code> if value is <code>"0"</code>, <code>0</code> or <code>"true"</code>,
   * <code>false</code> if not
   */
  public static toBoolean(value: UndefinedOrNullOr<number | string>): boolean {
    if (value == null) {
      return false;
    }
    return typeof value !== 'number' ? (value.trim().toLowerCase() === 'true' || value.trim().toLowerCase() === '0') : value === 1;
  }
  /**
   * @deprecated <b>Use <code>toBoolean(value)</code></b>
   *
   * Converts string to boolean
   * @param {string} string
   * @return boolean Returns <code>true</code> if trimmed to lower case string equals <code>'true'</code>, else <code>false</code>
   */
  public static stringToBoolean(string: UndefinedOrNullOr<string>): boolean {
    return this.toBoolean(string);
  }

  /**
   * @deprecated <b>Use <code>toBoolean(value)</code></b>
   *
   * Converts number to boolean
   * @param {number} number
   * @return boolean Returns <code>true</code> if number is <code>1</code>, else <code>false</code>
   */
  public static numberToBoolean(number: number): boolean {
    return this.toBoolean(number);
  }
  //endregion

  //region to string
  /**
   * Converts number or boolean to string
   * @param value {boolean|number} Value to check
   * @return boolean
   */
  public static toString(value: UndefinedOrNullOr<number | boolean>): string {
    if (value == null) {
      return '';
    }
    return typeof value !== 'number' ? (value ? 'true' : 'false') : value.toString();
  }
  /**
   * @deprecated <b>Use <code>toString(value)</code></b>
   *
   * Converts boolean to string
   * @param {boolean} boolean
   * @return boolean Returns <code>'true'</code> if the boolean is <code>true</code>, else <code>'false'</code>
   */
  public static booleanToString(boolean: UndefinedOrNullOr<boolean>): string {
    return this.toString(boolean);
  }

  /**
   * @deprecated <b>Use <code>toString(value)</code></b>
   *
   * Converts number to string
   * @param {number} number
   * @return string
   */
  public static numberToString(number: UndefinedOrNullOr<number>): string {
    return this.toString(number);
  }
  //endregion

  //region to Number
  /**
   * Converts string or boolean to number
   * @param value {string|boolean} Value to check
   * @return boolean Returns <code>Number.MAX_SAFE_INTEGER</code> if value is <code>null</code> or <code>undefined</code>
   */
  public static toNumber(value: UndefinedOrNullOr<string | boolean>): number {
    if (value == null) {
      return Number.MAX_SAFE_INTEGER;
    }
    return typeof value !== 'string' ? (value ? 1 : 0) : parseFloat(value);
  }

  /**
   * @deprecated <b>Use <code>toNumber(value)</code></b>
   *
   * Converts string to number
   * @param {string} string
   * @return number
   */
  public static stringToNumber(string: string): number {
    return this.toNumber(string);
  }

  /**
   * @deprecated <b>Use <code>toNumber(value)</code></b>
   *
   * Converts boolean to number
   * @param {boolean} boolean
   * @return number Returns <code>1</code> if the boolean is <code>true</code>, else <code>0</code>
   */
  public static booleanToNumber(boolean: boolean): number {
    return this.toNumber(boolean);
  }
  //endregion
}
