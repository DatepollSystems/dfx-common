import {IHasID} from './entities/has-id.interface';
import {IHasName} from './entities/has-name.interface';
import {HttpParams} from '@angular/common/http';

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
