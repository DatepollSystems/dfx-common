import {Generator, RandomStringOptions} from '../lib/helper/generator';
import {StringHelper} from '../lib/helper/string-helper';
import {ArrayHelper} from '../lib/helper/array-helper';

describe('Generator', () => {
  it('randomness string', () => {
    const test = [];
    for (let i = 0; i < 10000; i++) {
      test.push(Generator.string(10));
    }
    expect(ArrayHelper.containsDuplicates(test)).toBeFalse();
  });
  it('randomness string with special characters', () => {
    const test = [];
    for (let i = 0; i < 10000; i++) {
      test.push(Generator.string(10, {containsNumbers: true, containsSpecialCharacters: true}));
    }
    expect(ArrayHelper.containsDuplicates(test)).toBeFalse();
  });
  it('randomness string without numbers, with special characters', () => {
    const test = [];
    for (let i = 0; i < 10000; i++) {
      test.push(Generator.string(10, {containsNumbers: false, containsSpecialCharacters: true}));
    }
    expect(ArrayHelper.containsDuplicates(test)).toBeFalse();
  });
  it('expect default randomString to have letters and no numbers', () => {
    for (let i = 0; i < 100; i++) {
      let val = Generator.string(70);
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeTrue();
      val = Generator.stringByOptions(70);
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeTrue();
    }
  });
  it('expect random string to have letters and no numbers', () => {
    for (let i = 0; i < 100; i++) {
      const val = Generator.string(70, {containsNumbers: false});
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeFalse();
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeFalse();
    }
  });
  it('expect random string to have letters and no numbers but special characters', () => {
    for (let i = 0; i < 100; i++) {
      let val = Generator.string(70, {containsNumbers: false, containsSpecialCharacters: true});
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeFalse();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();

      val = Generator.stringByOptions(70, RandomStringOptions.SPECIAL_CHARACTERS);
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeFalse();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();
    }
  });
  it('expect random string to have no letters but numbers and special characters', () => {
    for (let i = 0; i < 100; i++) {
      let val = Generator.string(80, {
        containsNumbers: true,
        containsSpecialCharacters: true,
        containsLetters: false,
      });
      expect(StringHelper.hasNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();

      val = Generator.stringByOptions(
        70,
        RandomStringOptions.NUMBERS,
        RandomStringOptions.SPECIAL_CHARACTERS,
        RandomStringOptions.REMOVE_LETTERS
      );
      expect(StringHelper.hasNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();

      val = Generator.stringByOptions(
        70,
        RandomStringOptions.NUMBERS,
        RandomStringOptions.SPECIAL_CHARACTERS,
        RandomStringOptions.REMOVE_LOWERCASE_LETTERS,
        RandomStringOptions.REMOVE_UPPERCASE_LETTERS
      );
      expect(StringHelper.hasNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();
    }
  });
  it('expect random string to have letters, no numbers and no special characters with config', () => {
    for (let i = 0; i < 100; i++) {
      const val = Generator.string(70, {
        containsNumbers: false,
        containsSpecialCharacters: false,
        containsLetters: true,
      });
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasOnlyLettersInString(val)).toBeTrue();
    }
  });
  it('expect random string to have letters and numbers and special characters', () => {
    for (let i = 0; i < 100; i++) {
      let val = Generator.string(70, {containsNumbers: true, containsSpecialCharacters: true, specialCharactersSet: undefined});
      expect(StringHelper.hasNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();

      val = Generator.stringByOptions(70, RandomStringOptions.NUMBERS, RandomStringOptions.SPECIAL_CHARACTERS);
      expect(StringHelper.hasNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();
    }
  });
  it('expect random string to have no letters and no numbers but special characters with special special character set', () => {
    for (let i = 0; i < 100; i++) {
      const val = Generator.string(2, {
        containsNumbers: false,
        containsLetters: false,
        specialCharactersSet: ':',
        containsSpecialCharacters: true,
      });
      expect(StringHelper.hasNoNumbersInString(val)).toBeTrue();
      expect(StringHelper.hasNotOnlyLettersInString(val)).toBeTrue();
      expect(val.length).toBe(2);
      expect(val.includes(':')).toBeTrue();
    }
  });
  it('randomness number', () => {
    const test = [];
    for (let i = 0; i < 1000; i++) {
      test.push(Generator.randomNumber(1, 10000000000000));
      test.push(Generator.randomNumber(1, 10000000000000));
    }
    expect(ArrayHelper.containsDuplicates(test)).toBeFalse();
  });
});
