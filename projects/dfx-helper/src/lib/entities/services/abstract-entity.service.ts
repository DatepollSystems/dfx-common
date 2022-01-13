import {Observable, Subject} from 'rxjs';

import {AHttpService} from '../../services/abstract-http.service';

import {IEntity} from '../entity.interface';
import {IList} from '../../collection/list.interface';

import {EntityList} from '../../collection/entity-list';
import {ICompute} from '../../functions.interface';
import {AnyOr, Params, StringOrNumber, UndefinedOr} from '../../types';

export abstract class AEntityService<idType extends StringOrNumber, EntityType extends IEntity<idType>> {
  public allChange: Subject<IList<EntityType>> = new Subject<IList<EntityType>>();
  public singleChange: Subject<EntityType> = new Subject<EntityType>();
  protected entities: IList<EntityType> = new EntityList();
  protected entity: UndefinedOr<EntityType> = undefined;

  // region Config properties
  /**
   * @description Overwrites url for get all request
   * @default undefined
   */
  protected globalGetAllUrl: UndefinedOr<string> = undefined;
  /**
   * @description Sets <code>HttpParams</code> for get all request
   * @default undefined
   */
  protected globalGetAllParams: UndefinedOr<Params> = undefined;
  /**
   * @description Overwrites url for get single request but also adds <code>/{id}</code> to url
   * @default undefined
   */
  protected globalGetSingleUrl: UndefinedOr<string> = undefined;
  /**
   * @description Overwrites <code>HttpParams</code> for get single request
   * @default undefined
   */
  protected globalGetSingleParams: UndefinedOr<Params> = undefined;
  /**
   * @description Overwrites url for create request
   * @default undefined
   */
  protected globalCreateUrl: UndefinedOr<string> = undefined;
  /**
   * @description Overwrites url for update request but also adds <code>/{id}</code> to url if enabled via <code>updateUrlHasIdInIt</code>
   * @default undefined
   */
  protected globalUpdateUrl: UndefinedOr<string> = undefined;
  /**
   * @description Overwrites url for delete request but also adds <code>/{id}</code> to url
   * @default undefined
   */
  protected globalDeleteUrl: UndefinedOr<string> = undefined;
  /**
   * @description Enables or disables adding of <code>/{id}</code> to url
   * @default false
   */
  protected updateUrlHasIdInIt = false;

  //endregion

  protected constructor(protected httpService: AHttpService, protected url: string) {
  }

  //region Config setter
  /**
   * Overwrites url for get all requests
   * @param {string} url Get all request url
   */
  public setGetAllUrl(url: string): void {
    this.globalGetAllUrl = url;
  }

  /**
   * Overwrites params for get all requests
   * @param {Params} params Get all request params
   */
  public setGetAllParams(params: Params): void {
    this.globalGetAllParams = params;
  }

  /**
   * Overwrites url for get single requests
   * @param {string} url Get single request url
   */
  public setGetSingleUrl(url: string): void {
    this.globalGetSingleUrl = url;
  }

  /**
   * Overwrites params for get single requests
   * @param {Params} params Get single request params
   */
  public setGetSingleParams(params: Params): void {
    this.globalGetSingleParams = params;
  }
  //endregion

  //region getAll
  public getAll(): IList<EntityType> {
    this.fetchAll();
    return this.entities.clone();
  }

  public removeAll(): void {
    this.setAll(new EntityList());
  }

  public fetchAll(): void {
    this.httpService.get(
      this.globalGetAllUrl ? this.globalGetAllUrl : this.url,
      this.globalGetAllParams,
      'fetchAll').subscribe({
      next: (data: any) => {
        const entities = [];
        for (const dto of data) {
          entities.push(this.convert(dto));
        }
        this.setAll(entities);
      },
      error: error => console.log(error)
    });
  }

  protected setAll(entities: EntityType[]): void {
    this.entities = new EntityList(entities);
    this.allChange.next(this.entities.clone());
  }
  //endregion

  //region getSingle
  public getSingle(id: idType, params?: Params, url?: string): UndefinedOr<EntityType> {
    this.fetchSingle(id, params, url);
    return this.entity;
  }

  public removeSingle(): void {
    this.entity = undefined;
  }

  public fetchSingle(id: idType, params?: Params, url?: string): void {
    this.httpService.get(
      url ? url : ((this.globalGetSingleUrl ? this.globalGetSingleUrl : this.url) + '/' + id),
      this.globalGetSingleParams ? this.globalGetSingleParams : params,
      'fetchSingle').subscribe({
      next: (data: any) => {
        this.setSingle(this.convert(data));
      },
      error: error => console.log(error)
    });
  }

  protected setSingle(entity: EntityType): void {
    this.entity = entity;
    this.singleChange.next(this.entity);
  }
  //endregion

  public _create(entity: AnyOr<EntityType>, params?: Params, url?: string): Observable<unknown> {
    return this.httpService.post(
      url ? url : (this.globalCreateUrl ? this.globalCreateUrl : this.url),
      entity, params, 'create');
  }

  public _update(entity: AnyOr<EntityType>, params?: Params, url?: UndefinedOr<string>): Observable<unknown> {
    return this.httpService.put(
      url ? url : ((this.globalUpdateUrl ? this.globalUpdateUrl : this.url) + (this.updateUrlHasIdInIt ? ('/' + entity.id) : '')),
      entity, params, 'update');
  }

  public _delete(id: idType, params?: Params, url?: UndefinedOr<string>): Observable<unknown> {
    return this.httpService.delete(
      url ? url : ((this.globalDeleteUrl ? this.globalDeleteUrl : this.url) + '/' + id), params, 'delete');
  }

  public delete(id: idType, successFn?: ICompute<any>, params?: Params, url?: string): void {
    this._delete(id, params, url).subscribe({
      next: (responseData: any) => {
        this.fetchAll();
        if (successFn) {
          successFn(responseData);
        }
      },
      error: error => console.log(error)
    });
  }

  public create(entity: AnyOr<EntityType>, successFn?: ICompute<any>, params?: Params, url?: string): void {
    this._create(entity, params, url).subscribe({
      next: (responseData: any) => {
        this.fetchAll();
        if (successFn) {
          successFn(responseData);
        }
      },
      error: error => console.log(error)
    });
  }

  public update(entity: AnyOr<EntityType>, successFn?: ICompute<any>, params?: Params, url?: string): void {
    this._update(entity, params, url).subscribe({
      next: (responseData: any) => {
        this.fetchAll();
        if (successFn) {
          successFn(responseData);
        }
      },
      error: error => console.log(error)
    });
  }

  /**
   * Converts json data to model extending from IEntity
   * @param {any} jsonData
   * @return {IEntity} Returns model
   */
  protected abstract convert(jsonData: any): EntityType;
}
