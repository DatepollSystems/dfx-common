import {HttpClient} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';

import {IEntity} from '../entity.interface';

import {EntityList, IEntityList} from '../../collection/entity-list';
import {AnyOr, StringOrNumber, UndefinedOr} from '../../types';
import {KeyValuePair} from '../../key-value-pair';

export abstract class AEntityService<idType extends StringOrNumber, EntityType extends IEntity<idType>> {
  public allChange: Subject<IEntityList<EntityType>> = new Subject<IEntityList<EntityType>>();
  protected entities: IEntityList<EntityType> = new EntityList();

  public singleChange: Subject<UndefinedOr<EntityType>> = new Subject<UndefinedOr<EntityType>>();
  protected entity: UndefinedOr<EntityType> = undefined;

  protected constructor(protected httpClient: HttpClient, url?: string) {
    if (url) {
      this.url = url;
    }
  }

  // region Config properties
  /**
   * @description Sets base url for all requests
   */
  protected url!: string;

  /**
   * @description Overwrites url for get all request
   * @default undefined
   */
  protected globalGetAllUrl?: string;
  /**
   * @description Sets <code>HttpParams</code> for get all request
   * @default undefined
   */
  protected globalGetAllParams?: KeyValuePair[];
  /**
   * @description Overwrites url for get single request but also adds <code>/{id}</code> to url
   * @default undefined
   */
  protected globalGetSingleUrl?: string;
  /**
   * @description Overwrites <code>HttpParams</code> for get single request
   * @default undefined
   */
  protected globalGetSingleParams?: KeyValuePair[];
  /**
   * @description Overwrites url for create request
   * @default undefined
   */
  protected globalCreateUrl?: string;
  /**
   * @description Overwrites url for update request but also adds <code>/{id}</code> to url if enabled via <code>updateUrlHasIdInIt</code>
   * @default undefined
   */
  protected globalUpdateUrl?: string;
  /**
   * @description Overwrites url for delete request but also adds <code>/{id}</code> to url
   * @default undefined
   */
  protected globalDeleteUrl?: string;
  /**
   * @description Enables or disables adding of <code>/{id}</code> to url
   * @default false
   */
  protected updateUrlHasIdInIt = false;

  /**
   * Overwrites url for get all requests
   * @param {UndefinedOr<string>} url Get all request url
   */
  public setGetAllUrl(url?: string): void {
    this.globalGetAllUrl = url;
  }

  /**
   * Overwrites params for get all requests
   * @param {UndefinedOr<KeyValuePair[]} params Get all request params
   */
  public setGetAllParams(params?: KeyValuePair[]): void {
    this.globalGetAllParams = params;
  }

  /**
   * Overwrites url for get single requests
   * @param {UndefinedOr<string>} url Get single request url
   */
  public setGetSingleUrl(url?: string): void {
    this.globalGetSingleUrl = url;
  }

  /**
   * Overwrites params for get single requests
   * @param {UndefinedOr<KeyValuePair[]>} params Get single request params
   */
  public setGetSingleParams(params?: KeyValuePair[]): void {
    this.globalGetSingleParams = params;
  }
  //endregion

  //region getAll
  public getAll(urlKeyPairs?: KeyValuePair[], params?: KeyValuePair[]): IEntityList<EntityType> {
    this.fetchAll(urlKeyPairs, params);
    return this.entities.clone();
  }

  protected setAll(entities: EntityList<EntityType>): void {
    this.entities = entities;
    this.allChange.next(this.entities.clone());
  }

  public removeAll(): void {
    this.setAll(new EntityList<EntityType>());
  }

  public fetchAll(urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): void {
    const url = KeyValuePair.parse(this.globalGetAllUrl, urlKeyPairs);
    const params = KeyValuePair.parseIntoHttpParams(httpParams ? httpParams : this.globalGetAllParams);

    this.httpClient.get(url ?? this.globalGetAllUrl ?? this.url, {params}).subscribe({
      next: (data: any) => {
        const entities = new EntityList<EntityType>();
        for (const dto of data) {
          entities.push(this.convert(dto));
        }
        this.setAll(entities);
      },
    });
  }

  //endregion

  //region getSingle
  protected setSingle(entity?: EntityType): void {
    this.entity = entity;
    this.singleChange.next(this.entity);
  }

  public getSingle(id: idType, urlKeyPairs?: KeyValuePair[], params?: KeyValuePair[]): UndefinedOr<EntityType> {
    this.fetchSingle(id, params, urlKeyPairs);
    return this.entity;
  }

  public removeSingle(): void {
    this.setSingle(undefined);
  }

  public fetchSingle(id: idType, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): void {
    const url = KeyValuePair.parse(this.globalGetSingleUrl, urlKeyPairs);
    const params = KeyValuePair.parseIntoHttpParams(httpParams ? httpParams : this.globalGetSingleParams);
    this.httpClient.get(`${url ?? this.globalGetSingleUrl ?? this.url}/${id}`, {params}).subscribe({
      next: (data: any) => {
        this.setSingle(this.convert(data));
      },
    });
  }

  //endregion

  public _create(entity: AnyOr<EntityType>, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): Observable<unknown> {
    const url = KeyValuePair.parse(this.globalCreateUrl, urlKeyPairs);
    const params = KeyValuePair.parseIntoHttpParams(httpParams);
    return this.httpClient.post(url ?? this.globalCreateUrl ?? this.url, entity, {params});
  }

  public _update(entity: AnyOr<EntityType>, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): Observable<unknown> {
    const url = KeyValuePair.parse(this.globalUpdateUrl, urlKeyPairs);
    const params = KeyValuePair.parseIntoHttpParams(httpParams);
    return this.httpClient.put(
      `${(url ?? this.globalUpdateUrl ?? this.url) + (this.updateUrlHasIdInIt ? '/' + (entity as EntityType).id : '')}`,
      entity,
      {params}
    );
  }

  public _delete(id: idType, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): Observable<unknown> {
    const url = KeyValuePair.parse(this.globalDeleteUrl, urlKeyPairs);
    const params = KeyValuePair.parseIntoHttpParams(httpParams);
    return this.httpClient.delete(`${url ?? this.globalDeleteUrl ?? this.url}/${id}`, {params});
  }

  public create(entity: AnyOr<EntityType>, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): Observable<unknown> {
    return this._create(entity, urlKeyPairs, httpParams).pipe(
      tap(() => {
        this.fetchAll();
      })
    );
  }

  public update(entity: AnyOr<EntityType>, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): Observable<unknown> {
    return this._update(entity, urlKeyPairs, httpParams).pipe(
      tap(() => {
        this.fetchAll();
      })
    );
  }

  public delete(id: idType, urlKeyPairs?: KeyValuePair[], httpParams?: KeyValuePair[]): Observable<unknown> {
    return this._delete(id, urlKeyPairs, httpParams).pipe(
      tap(() => {
        this.fetchAll();
      })
    );
  }

  /**
   * Converts json data to model extending from IEntity
   * @param {any} jsonData
   * @return Converted model
   */
  protected abstract convert(jsonData: any): EntityType;
}
