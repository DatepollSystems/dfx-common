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
export type IHasNumberID = IHasID<number>;

/**
 * @since 3.2.5
 */
export type IHasStringID = IHasID<string>;
