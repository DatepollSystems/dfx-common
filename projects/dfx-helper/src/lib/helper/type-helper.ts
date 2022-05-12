export class TypeHelper {
  /**
   * Checks if object is <code>Date</code>
   * @param {any} obj
   * @return boolean Returns <code>true</code> if object is <code>Date</code>, <code>false</code> if not
   */
  public static isDate(obj: any): boolean {
    return obj instanceof Date;
  }

  /**
   * Checks if object is <code>boolean</code>
   * @param {any} obj
   * @return boolean Returns <code>true</code> if object is <code>boolean</code>, <code>false</code> if not
   */
  public static isBoolean(obj: any): boolean {
    return obj === true || obj === false || typeof obj == 'boolean';
  }

  /**
   * Checks if object is <code>string</code>
   * @param {any} obj
   * @return boolean Returns <code>true</code> if object is <code>string</code>, <code>false</code> if not
   */
  public static isString(obj: any): boolean {
    return typeof obj == 'string';
  }

  /**
   * Checks if object is <code>number</code>
   * @param {any} obj
   * @return boolean Returns <code>true</code> if object is <code>number</code>, <code>false</code> if not
   */
  public static isNumber(obj: any): boolean {
    return typeof obj == 'number';
  }

  /**
   * Checks if object is <code>object</code>
   * @param {any} obj
   * @return boolean Returns <code>true</code> if object is <code>object</code>, <code>false</code> if not
   */
  public static isObject(obj: any): boolean {
    return typeof obj == 'object';
  }

  /**
   * Checks if object is <code>numeric</code>
   * @param {any} obj
   * @return boolean Returns <code>true</code> if object is <code>numeric</code>, else <code>false</code>
   */
  public static isNumeric(obj: any): boolean {
    if (typeof obj == 'number') {
      return true;
    }
    // only process strings
    if (typeof obj != 'string') {
      return false;
    }
    return (
      !isNaN(parseInt(obj, 10)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(obj))
    );
  }
}
