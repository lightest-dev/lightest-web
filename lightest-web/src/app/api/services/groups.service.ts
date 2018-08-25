/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AccessRightsViewModel } from '../models/access-rights-view-model';
import { CompleteGroupViewModel } from '../models/complete-group-view-model';
import { Group } from '../models/group';
@Injectable({
  providedIn: 'root',
})
class GroupsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `GroupsService.ApiGroupsByGroupIdAddUserPostParams` containing the following parameters:
   *
   * - `groupId`:
   *
   * - `user`:
   */
  ApiGroupsByGroupIdAddUserPostResponse(params: GroupsService.ApiGroupsByGroupIdAddUserPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.user;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Groups/${params.groupId}/add-user`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `GroupsService.ApiGroupsByGroupIdAddUserPostParams` containing the following parameters:
   *
   * - `groupId`:
   *
   * - `user`:
   */
  ApiGroupsByGroupIdAddUserPost(params: GroupsService.ApiGroupsByGroupIdAddUserPostParams): Observable<void> {
    return this.ApiGroupsByGroupIdAddUserPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `GroupsService.ApiGroupsByGroupIdAddUsersPostParams` containing the following parameters:
   *
   * - `groupId`:
   *
   * - `users`:
   */
  ApiGroupsByGroupIdAddUsersPostResponse(params: GroupsService.ApiGroupsByGroupIdAddUsersPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.users;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Groups/${params.groupId}/add-users`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `GroupsService.ApiGroupsByGroupIdAddUsersPostParams` containing the following parameters:
   *
   * - `groupId`:
   *
   * - `users`:
   */
  ApiGroupsByGroupIdAddUsersPost(params: GroupsService.ApiGroupsByGroupIdAddUsersPostParams): Observable<void> {
    return this.ApiGroupsByGroupIdAddUsersPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiGroupsByIdGetResponse(id: number): Observable<HttpResponse<CompleteGroupViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Groups/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: CompleteGroupViewModel = null;
        _body = _resp.body as CompleteGroupViewModel;
        return _resp.clone({body: _body}) as HttpResponse<CompleteGroupViewModel>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiGroupsByIdGet(id: number): Observable<CompleteGroupViewModel> {
    return this.ApiGroupsByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `GroupsService.ApiGroupsByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `group`:
   */
  ApiGroupsByIdPutResponse(params: GroupsService.ApiGroupsByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.group;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Groups/${params.id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;

        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * @param params The `GroupsService.ApiGroupsByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `group`:
   */
  ApiGroupsByIdPut(params: GroupsService.ApiGroupsByIdPutParams): Observable<void> {
    return this.ApiGroupsByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiGroupsByIdDeleteResponse(id: number): Observable<HttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Groups/${id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Group = null;
        _body = _resp.body as Group;
        return _resp.clone({body: _body}) as HttpResponse<Group>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiGroupsByIdDelete(id: number): Observable<Group> {
    return this.ApiGroupsByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  ApiGroupsGetResponse(): Observable<HttpResponse<Array<Group>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Groups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Array<Group> = null;
        _body = _resp.body as Array<Group>;
        return _resp.clone({body: _body}) as HttpResponse<Array<Group>>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiGroupsGet(): Observable<Array<Group>> {
    return this.ApiGroupsGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param group undefined
   * @return Success
   */
  ApiGroupsPostResponse(group?: Group): Observable<HttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = group;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Groups`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Group = null;
        _body = _resp.body as Group;
        return _resp.clone({body: _body}) as HttpResponse<Group>;
      })
    );
  }

  /**
   * @param group undefined
   * @return Success
   */
  ApiGroupsPost(group?: Group): Observable<Group> {
    return this.ApiGroupsPostResponse(group).pipe(
      map(_r => _r.body)
    );
  }
}

module GroupsService {

  /**
   * Parameters for ApiGroupsByGroupIdAddUserPost
   */
  export interface ApiGroupsByGroupIdAddUserPostParams {
    groupId: number;
    user?: AccessRightsViewModel;
  }

  /**
   * Parameters for ApiGroupsByGroupIdAddUsersPost
   */
  export interface ApiGroupsByGroupIdAddUsersPostParams {
    groupId: number;
    users?: Array<AccessRightsViewModel>;
  }

  /**
   * Parameters for ApiGroupsByIdPut
   */
  export interface ApiGroupsByIdPutParams {
    id: number;
    group?: Group;
  }
}

export { GroupsService }
