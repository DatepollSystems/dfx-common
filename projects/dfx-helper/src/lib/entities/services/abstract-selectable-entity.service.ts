import {Subject} from 'rxjs';

import {StorageHelper} from '../../helper/StorageHelper';

import {AEntityService} from './abstract-entity.service';
import {AHttpService} from '../../services/abstract-http.service';

import {StringOrNumber, UndefinedOr} from '../../types';
import {IEntity} from '../entity.interface';

export abstract class ASelectableEntityService<idType extends StringOrNumber, EntityType extends IEntity<idType>> extends AEntityService<idType, EntityType> {
  protected abstract selectedStorageKey: string;

  protected selected!: UndefinedOr<EntityType>;
  public selectedChange: Subject<UndefinedOr<EntityType>> = new Subject<UndefinedOr<EntityType>>();

  protected constructor(httpService: AHttpService, url: string) {
    super(httpService, url);
  }

  public getSelected(): UndefinedOr<EntityType> {
    if (this.selected == undefined) {
      const data = StorageHelper.getObject(this.selectedStorageKey);
      if (data != undefined) {
        this.selected = this.convert(data);
        this.selectedChange.next(this.selected);
      }
    }
    return this.selected;
  }

  public setSelected(selected: UndefinedOr<EntityType>): void {
    this.selected = selected;
    StorageHelper.setObject(this.selectedStorageKey, this.selected);
    this.selectedChange.next(this.selected);
  }
}
