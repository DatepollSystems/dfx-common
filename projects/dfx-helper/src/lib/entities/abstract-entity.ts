import {StringOrNumber} from '../types';
import {IEntity, IEntityWithNumberID, IEntityWithStringID} from './entity.interface';

export abstract class AEntity<idType extends StringOrNumber> implements IEntity<idType> {
  // protected hidden: string[] = [];

  protected constructor(public id: idType, public originalJsonDto?: any) {
  }

  public toString(): string {
    let string = '';
    for (const entry of Object.entries(this)) {
      // let print = entry[0] !== 'hidden' && entry[0] !== 'originalJsonDto';
      //
      // if (print) {
      //   for (const hide of this.hidden) {
      //     if (hide === entry[0]) {
      //       print = false;
      //       break;
      //     }
      //   }
      // }

      if (entry[0] !== 'originalJsonDto') {
        if (string.length != 0) {
          string += ' ';
        }
        string += entry[0] + ': "' + entry[1] + '";';
      }
    }
    return string;
  }

  public hashCode(): idType {
    return this.id;
  }

  public equals(object: any): boolean {
    if (object == null
      || typeof (object) !== 'object'
      || !(object instanceof AEntity)
      || this.constructor.name !== object.constructor.name)
      return false;

    return this.hashCode() === object.hashCode();
  }
}

export abstract class AEntityWithNumberID extends AEntity<number> implements IEntityWithNumberID {
  protected constructor(id: number, originalJsonDto?: any) {
    super(id, originalJsonDto);
  }
}

export abstract class AEntityWithStringID extends AEntity<string> implements IEntityWithStringID {
  protected constructor(id: string, originalJsonDto?: any) {
    super(id, originalJsonDto);
  }
}
