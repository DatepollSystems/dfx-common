import {Subject} from 'rxjs';

import {StorageHelper} from '../../helper/storage-helper';

import {AEntityService} from './abstract-entity.service';
import {AHttpService} from '../../services/abstract-http.service';

import {AnyOr, StringOrNumber, UndefinedOr} from '../../types';
import {IEntity} from '../entity.interface';
import {KeyValuePair} from '../../key-value-pair';
import {EntityList} from '../../collection/entity-list';

export abstract class ASelectableEntityService<idType extends StringOrNumber, EntityType extends IEntity<idType>> extends AEntityService<
  idType,
  EntityType
> {
  protected abstract selectedStorageKey: string;

  protected selected: UndefinedOr<EntityType>;
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
    StorageHelper.set(this.selectedStorageKey, this.selected);
    this.selectedChange.next(this.selected);
  }

  public override fetchAll(urlKeyPairs?: KeyValuePair[], params?: KeyValuePair[]): void {
    const url = KeyValuePair.parse(this.globalGetAllUrl, urlKeyPairs);
    const httpParams = KeyValuePair.parseIntoHttpParams(params ? params : this.globalGetAllParams);
    this.httpService.get(url ? url : this.globalGetAllUrl ? this.globalGetAllUrl : this.url, httpParams, 'fetchAll').subscribe({
      next: (data: any) => {
        const entities = new EntityList<EntityType>();
        for (const dto of data) {
          const entity = this.convert(dto);
          if (this.selected?.id === entity.id) {
            this.setSelected(entity);
          }
          entities.push(entity);
        }
        this.setAll(entities);
      },
      error: (error) => console.log(error),
    });
  }
}
