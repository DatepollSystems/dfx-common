import {UndefinedOr, UndefinedOrNullOr} from '../types';

export class StringHelper {
  private static urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  private static emailRegex = new RegExp(
    /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
  );
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
  public static isEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  /**
   * Returns <code>false</code> if the given string is an email, <code>true</code> if not
   * @param {string} email
   * @return boolean
   */
  public static isNoEmail(email: string): boolean {
    return !this.emailRegex.test(email);
  }

  /**
   * Returns <code>true</code> if the given text contains no numbers, <code>false</code> if not
   * @param {string} text
   * @return boolean
   */
  public static hasNoNumbersInString(text: string): boolean {
    return !this.hasNumbersInStringRegex.test(text);
  }

  /**
   * Returns <code>true</code> if the given text contains numbers, <code>false</code> if not
   * @param {string} text
   * @return boolean
   */
  public static hasNumbersInString(text: string): boolean {
    return this.hasNumbersInStringRegex.test(text);
  }

  /**
   * Returns <code>true</code> if the given text contains only a-zA-Z, <code>false</code> if it also contains special characters or numbers
   * @param {string} text
   * @return boolean
   */
  public static hasOnlyLettersInString(text: string): boolean {
    return this.hasOnlyLettersInStringRegex.test(text);
  }

  /**
   * Returns <code>true</code> if the given text contains not only a-zA-Z, <code>false</code> if it contains only a-zA-Z
   * @param {string} text
   * @return boolean
   */
  public static hasNotOnlyLettersInString(text: string): boolean {
    return !this.hasOnlyLettersInStringRegex.test(text);
  }

  public static stripWhitespace(text: string): string {
    return text.replace(/^\s+/, '').replace(/\s+$/, '');
  }

  /**
   * Returns the whole text if the length does not exceed the maxLength, else the text will be sliced and a suffix will be added
   * @param {string} text The text to check for slicing
   * @param {number} maxLength Maximal length of the text
   * @param {string|null} suffix Suffix to add if text length exceeds the <code>maxLength</code>, default <code>'...'</code>; Set to <code>null</code> to disable suffix.
   * @return string
   */
  public static cutString(text: string, maxLength: number = 10, suffix: UndefinedOrNullOr<string> = '...'): string {
    if (text.length < maxLength) {
      return text;
    }
    if (!suffix) {
      suffix = '';
    }
    return text.slice(0, maxLength) + suffix;
  }

  /**
   * Returns an imploded string containing all strings from the array, seperated via the separator.
   * @param {string[]} strings String to implode
   * @param {string} separator Separator for all strings, default <code>','</code>
   * @param {number|null} maxLength Maximal length of all strings, default <code>undefined</code>; If undefined there is no maximal length
   * @param {string|null} suffix A suffix which is added if the imploded string exceeds the maximal length, default <code>'...'</code>; Set to <code>null</code> to disable suffix.
   * @return string
   */
  public static getImploded(
    strings: string[],
    maxLength?: number,
    separator: UndefinedOrNullOr<string> = ',',
    suffix: UndefinedOrNullOr<string> = '...'
  ): string {
    let toReturn = '';
    for (const text of strings) {
      toReturn += text + separator + ' ';
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
