export interface IPredicate<T> {
  (item: T): boolean;
}

export interface ICompute<T> {
  (item: T): void;
}

export interface IMap<itemType, listType, mappedType> {
  (item: itemType, index: number, list: listType): mappedType;
}
