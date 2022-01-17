import {Converter} from './helper/Converter';
import {ArrayHelper} from './helper/ArrayHelper';
import {LoggerFactory} from './helper/Logger';

export class KeyValuePair {
  private static logger = LoggerFactory.getLogger('KeyValuePair');

  constructor(public readonly key: string, public readonly value: string | boolean | number | undefined | null) {}

  public static parse(
    url: string | undefined | null,
    keyValuePairs: KeyValuePair[] | undefined,
    disableParsingMatchingCheck = false
  ): string | undefined {
    if (url === undefined || url === null) {
      return undefined;
    }
    if (keyValuePairs) {
      if (
        ArrayHelper.containsDuplicates(
          keyValuePairs.map((keyValuePair) => {
            return keyValuePair.key;
          })
        )
      ) {
        this.logger.error('parse', 'KeyValuePairs contains duplicates', keyValuePairs);
        throw 'KeyValuePairs contains duplicates';
      }

      for (const keyValuePair of keyValuePairs) {
        const key = '{' + keyValuePair.key + '}';
        if (!disableParsingMatchingCheck && !url.includes(key)) {
          this.logger.error('parse', 'Url does not match all KeyValuePairs; URL: "' + url + '"', keyValuePairs);
          throw 'Url does not match all KeyValuePairs';
        }
        if (keyValuePair.value !== undefined && keyValuePair.value !== null) {
          url = url.replace(key, Converter.toString(keyValuePair.value));
        }
      }
    }

    if (!disableParsingMatchingCheck && (url.includes('{') || url.includes('}'))) {
      this.logger.error('parse', 'KeyValuePairs does not match all keys in url; URL: "' + url + '"', keyValuePairs);
      throw 'KeyValuePairs does not match all keys in url';
    }

    return url;
  }
}
