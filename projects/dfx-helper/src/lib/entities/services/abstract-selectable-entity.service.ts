import {Subject} from 'rxjs';

import {StorageHelper} from '../../helper/storage-helper';

import {AEntityService} from './abstract-entity.service';

import {StringOrNumber, UndefinedOr} from '../../types';
import {IEntity} from '../entity.interface';
import {HttpClient} from '@angular/common/http';

export abstract class ASelectableEntityService<idType extends StringOrNumber, EntityType extends IEntity<idType>> extends AEntityService<
  idType,
  EntityType
> {
  protected abstract selectedStorageKey: string;

  protected selected: UndefinedOr<EntityType>;
  public selectedChange: Subject<UndefinedOr<EntityType>> = new Subject<UndefinedOr<EntityType>>();

  protected constructor(httpClient: HttpClient, url?: string) {
    super(httpClient, url);

    this.allChange.subscribe((entities) => {
      for (const entity of entities) {
        if (this.selected?.id === entity.id) {
          this.setSelected(entity);
        }
      }
    });
  }

  public getSelected(): UndefinedOr<EntityType> {
    if (this.selected == undefined) {
      const selected = StorageHelper.getObject(this.selectedStorageKey) as EntityType;
      if (selected) {
        this.selected = selected;
        this.selectedChange.next(this.selected);
      }
    }
    return this.selected;
  }

  public setSelected(selected: UndefinedOr<EntityType>): void {
    this.selected = selected;
    StorageHelper.set(this.selectedStorageKey, this.selected);
    this.selectedChange.next(this.selected);
  }
}
