export enum RandomStringOptions {
  NUMBERS,
  SPECIAL_CHARACTERS,
  REMOVE_LETTERS,
  REMOVE_UPPERCASE_LETTERS,
  REMOVE_LOWERCASE_LETTERS,
}

export class Generator {
  public static readonly lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  public static readonly upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public static readonly numberLetters = '0123456789';
  public static readonly specialCharacterLetters = '_-#+*~&?!=';

  /**
   * @deprecated Use <code>Generator.randomString()</code>
   * Returns a random string containing 0-9,a-z,A-Z
   * @param {number} length Length of the random string
   * @param {boolean} containsNumbers Include numbers in string, default <code>true</code>
   * @param {boolean} containsSpecialCharacter Include special character in string, default <code>false</code>
   * @return string
   */
  public static generateRandomString(length: number, containsNumbers: boolean = true, containsSpecialCharacter: boolean = false): string {
    return this.randomString(length, {
      containsNumbers: containsNumbers,
      containsSpecialCharacters: containsSpecialCharacter,
    });
  }

  /**
   * Returns a random string containing a-z,A-Z
   * @param {number} length Length of the random string
   * @param {RandomStringOptions} options Possible options of RandomStringOptions enum
   * @return string
   */
  public static randomStringByOptions(length: number, ...options: RandomStringOptions[]) {
    let containsNumbers = false;
    let containsSpecialCharacters = false;
    let containsLetters = true;
    let containsLowerCaseLetters = true;
    let containsUpperCaseLetters = true;
    for (const option of options) {
      switch (option) {
        case RandomStringOptions.NUMBERS:
          containsNumbers = true;
          break;
        case RandomStringOptions.SPECIAL_CHARACTERS:
          containsSpecialCharacters = true;
          break;
        case RandomStringOptions.REMOVE_LETTERS:
          containsLetters = false;
          break;
        case RandomStringOptions.REMOVE_UPPERCASE_LETTERS:
          containsUpperCaseLetters = false;
          break;
        case RandomStringOptions.REMOVE_LOWERCASE_LETTERS:
          containsLowerCaseLetters = false;
          break;
      }
    }
    return this.randomString(length, {
      containsNumbers: containsNumbers,
      containsSpecialCharacters: containsSpecialCharacters,
      containsLetters: containsLetters,
      containsUpperCaseLetters: containsUpperCaseLetters,
      containsLowerCaseLetters: containsLowerCaseLetters,
    });
  }

  /**
   * Returns a random string containing a-z,A-Z
   * @param {number} length Length of the random string
   * @param {{containsNumbers?: boolean, containsSpecialCharacters?: boolean, specialCharactersSet?: string, containsLetters?: boolean, containsLowerCaseLatters?: boolean, containsUpperCaseLetters?: boolean}} options options object
   * @description <code>containsNumbers</code> - default <code>false</code>, used to determine if the random string should contain numbers
   * @description <code>containsSpecialCharacters</code> - default <code>false</code>, used to determine if the random string should contain special characters
   * @description <code>specialCharactersSet</code> - default "<code>_-#+*~&?!=</code>", used to replace the default set
   * @description <code>containsLetters</code> default <code>true</code>, used to determine if the random string should contain letters
   * @description <code>containsLowerCaseLetters</code> default <code>true</code>, used to determine if the random string should contain lowercase letters
   * @description <code>containsUpperCaseLetters</code> default <code>true</code>, used to determine if the random string should contain UPPERCASE letters
   * @return string
   */
  public static randomString(
    length: number,
    options?: {
      containsNumbers?: boolean;
      containsSpecialCharacters?: boolean;
      specialCharactersSet?: string;
      containsLetters?: boolean;
      containsLowerCaseLetters?: boolean;
      containsUpperCaseLetters?: boolean;
    }
  ): string {
    let characters = this.lowerCaseLetters + this.upperCaseLetters;
    if (options?.containsLowerCaseLetters != null && !options.containsLowerCaseLetters) {
      characters.replace(this.lowerCaseLetters, '');
    }
    if (options?.containsUpperCaseLetters != null && !options.containsUpperCaseLetters) {
      characters.replace(this.upperCaseLetters, '');
    }
    if (options?.containsLetters != null && !options.containsLetters) {
      characters = '';
    }
    if (options?.containsNumbers != null && options.containsNumbers) {
      characters += this.numberLetters;
    }
    if (options?.containsSpecialCharacters != null && options.containsSpecialCharacters) {
      if (options.specialCharactersSet != null) {
        characters += options.specialCharactersSet;
      } else {
        characters += this.specialCharacterLetters;
      }
    }
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Returns a random number
   * @param {number} min Minimum number of random number
   * @param {number} max Maximum number of random number
   * @return number
   */
  public static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * @deprecated Use <code>Generator.randomNumber()</code>
   * Returns a random number
   * @param {number} min Minimum number of random number
   * @param {number} max Maximum number of random number
   * @return number
   */
  public static generateRandomNumber(min: number, max: number): number {
    return this.randomNumber(min, max);
  }
}
