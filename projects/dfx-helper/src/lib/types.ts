import {IHasID} from './entities/has-id.interface';
import {IHasName} from './entities/has-name.interface';
import {HttpParams} from '@angular/common/http';
import {Converter} from './helper/Converter';
import {ArrayHelper} from './helper/ArrayHelper';

export type AnyOr<T> = T | any;
export type UndefinedOr<T> = T | undefined;
export type NullOr<T> = T | null;
export type UndefinedOrNullOr<T> = UndefinedOr<NullOr<T>>;
export type NullOrUndefinedOr<T> = UndefinedOrNullOr<T>;
export type ManyOr<T> = T | T[];
export type ManyOrUndefinedOr<T> = UndefinedOr<ManyOr<T>>;
export type ManyOrNullOr<T> = NullOr<ManyOr<T>>;
export type ManyOrUndefinedOrNullOr<T> = UndefinedOrNullOr<ManyOr<T>>;

export type AnyOrUndefined = any | undefined;
export type StringOrNumber = string | number;
export type NumberOrString = StringOrNumber;

export type HasIDAndName<T> = IHasID<T> & IHasName;
export type HasNumberIDAndName = HasIDAndName<number>;
export type HasStringIDAndName = HasIDAndName<string>;

export type Params =
  | HttpParams
  | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };

export type KeyValuePair = {readonly key: string; readonly value: string | boolean | number | undefined | null};

export function parseKeyValuePairs(
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
      throw 'KeyValuePairs contains duplicates';
    }

    for (const keyValuePair of keyValuePairs) {
      const key = '{' + keyValuePair.key + '}';
      if (!disableParsingMatchingCheck && !url.includes(key)) {
        throw 'Url does not match all KeyValuePairs';
      }
      if (keyValuePair.value !== undefined && keyValuePair.value !== null) {
        url = url.replace(key, Converter.toString(keyValuePair.value));
      }
    }
  }

  if (!disableParsingMatchingCheck && (url.includes('{') || url.includes('}'))) {
    throw 'KeyValuePairs does not match all keys in url';
  }

  return url;
}
