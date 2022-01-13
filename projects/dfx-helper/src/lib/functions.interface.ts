export interface IPredicate<T> {
  (item: T): boolean;
}

export interface ICompute<T> {
  (item: T): void;
}
