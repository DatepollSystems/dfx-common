import {NullOr, UndefinedOr} from '../types';

export class StringHelper {
  private static urlRegex = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i');
  private static emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  private static hasNumbersInStringRegex = new RegExp(/\d/);
  private static hasOnlyLettersInStringRegex = new RegExp(/^[a-zA-Z]+$/);

  /**
   * Returns <code>true</code> if the given string is an url, <code>false</code> if not
   * @param {string} url
   * @return boolean
   */
  public static isUrl(url: string): boolean {
    return this.urlRegex.test(url);
  }

  /**
   * Returns <code>false</code> if the given string is an url, <code>true</code> if not
   * @param {string} url
   * @return boolean
   */
  public static isNoUrl(url: string): boolean {
    return !this.urlRegex.test(url);
  }

  /**
   * Returns <code>true</code> if the given string is an email, <code>false</code> if not
   * @param {string} email
   * @return boolean
   */
  public static isEmail(email: string) {
    return this.emailRegex.test(email);
  }

  /**
   * Returns <code>false</code> if the given string is an email, <code>true</code> if not
   * @param {string} email
   * @return boolean
   */
  public static isNoEmail(email: string) {
    return !this.emailRegex.test(email);
  }

  /**
   * Returns <code>true</code> if the given string contains no numbers, <code>false</code> if not
   * @param {string} string
   * @return boolean
   */
  public static hasNoNumbersInString(string: string): boolean {
    return !this.hasNumbersInStringRegex.test(string);
  }

  /**
   * Returns <code>true</code> if the given string contains numbers, <code>false</code> if not
   * @param {string} string
   * @return boolean
   */
  public static hasNumbersInString(string: string): boolean {
    return this.hasNumbersInStringRegex.test(string);
  }

  /**
   * Returns <code>true</code> if the given string contains only a-zA-Z, <code>false</code> if it also contains special characters or numbers
   * @param {string} string
   * @return boolean
   */
  public static hasOnlyLettersInString(string: string): boolean {
    return this.hasOnlyLettersInStringRegex.test(string);
  }

  /**
   * Returns <code>true</code> if the given string contains not only a-zA-Z, <code>false</code> if it contains only a-zA-Z
   * @param {string} string
   * @return boolean
   */
  public static hasNotOnlyLettersInString(string: string): boolean {
    return !this.hasOnlyLettersInStringRegex.test(string);
  }

  public static stripWhitespace(string: string) {
    return string.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  /**
   * Returns the whole string if the length does not exceed the maxLength, else the string will be sliced and a suffix will be added
   * @param {string} string The string to check for slicing
   * @param {number} maxLength Maximal length of the string
   * @param {string|null} suffix Suffix to add if string length exceeds the <code>maxLength</code>, default <code>'...'</code>; Set to <code>null</code> to disable suffix.
   * @return string
   */
  public static cutString(string: string, maxLength: number = 10, suffix: NullOr<string> = '...'): string {
    if (string.length < maxLength) {
      return string;
    }
    if (!suffix) {
      suffix = '';
    }
    return string.slice(0, maxLength) + suffix;
  }

  /**
   * Returns an imploded string containing all strings from the array, seperated via the separator.
   * @param {string[]} strings String to implode
   * @param {string} separator Separator for all strings, default <code>','</code>
   * @param {number|null} maxLength Maximal length of all strings, default <code>undefined</code>; If undefined there is no maximal length
   * @param {string|null} suffix A suffix which is added if the imploded string exceeds the maximal length, default <code>'...'</code>; Set to <code>null</code> to disable suffix.
   * @return string
   */
  public static getImploded(strings: string[], maxLength: UndefinedOr<number> = undefined, separator: UndefinedOr<string> = ',', suffix: NullOr<string> = '...'): string {
    let toReturn = '';
    for (const string of strings) {
      toReturn += string + separator + ' ';
    }
    if (!suffix) {
      suffix = '';
    }
    if (maxLength != undefined && toReturn.length > maxLength) {
      return toReturn.slice(0, maxLength) + suffix;
    }
    return toReturn;
  }
}
