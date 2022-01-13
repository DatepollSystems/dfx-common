/**
 * @since 3.2.5
 */
export interface IHasID<idType> {
  id: idType;

  hashCode(): idType;
}

/**
 * @since 3.2.5
 */
export interface IHasNumberID extends IHasID<number> {
}

/**
 * @since 3.2.5
 */
export interface IHasStringID extends IHasID<string> {
}
