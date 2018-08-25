/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { UserTask } from '../models/user-task';
import { TaskDefinition } from '../models/task-definition';
import { TaskLanguage } from '../models/task-language';
import { Test } from '../models/test';
@Injectable({
  providedIn: 'root',
})
class TasksService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   */
  ApiTasksByIdUsersGetResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Tasks/${id}/users`,
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
   * @param id undefined
   */
  ApiTasksByIdUsersGet(id: number): Observable<void> {
    return this.ApiTasksByIdUsersGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `TasksService.ApiTasksByIdUsersPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `users`:
   */
  ApiTasksByIdUsersPostResponse(params: TasksService.ApiTasksByIdUsersPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.users;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Tasks/${params.id}/users`,
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
   * @param params The `TasksService.ApiTasksByIdUsersPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `users`:
   */
  ApiTasksByIdUsersPost(params: TasksService.ApiTasksByIdUsersPostParams): Observable<void> {
    return this.ApiTasksByIdUsersPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
  ApiTasksByIdGetResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Tasks/${id}`,
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
   * @param id undefined
   */
  ApiTasksByIdGet(id: number): Observable<void> {
    return this.ApiTasksByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `TasksService.ApiTasksByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `task`:
   */
  ApiTasksByIdPutResponse(params: TasksService.ApiTasksByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.task;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Tasks/${params.id}`,
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
   * @param params The `TasksService.ApiTasksByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `task`:
   */
  ApiTasksByIdPut(params: TasksService.ApiTasksByIdPutParams): Observable<void> {
    return this.ApiTasksByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
  ApiTasksByIdDeleteResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Tasks/${id}`,
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
   * @param id undefined
   */
  ApiTasksByIdDelete(id: number): Observable<void> {
    return this.ApiTasksByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  ApiTasksGetResponse(): Observable<HttpResponse<TaskDefinition>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Tasks`,
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
        let _body: TaskDefinition = null;
        _body = _resp.body as TaskDefinition;
        return _resp.clone({body: _body}) as HttpResponse<TaskDefinition>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiTasksGet(): Observable<TaskDefinition> {
    return this.ApiTasksGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param task undefined
   * @return Success
   */
  ApiTasksPostResponse(task?: TaskDefinition): Observable<HttpResponse<TaskDefinition>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = task;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Tasks`,
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
        let _body: TaskDefinition = null;
        _body = _resp.body as TaskDefinition;
        return _resp.clone({body: _body}) as HttpResponse<TaskDefinition>;
      })
    );
  }

  /**
   * @param task undefined
   * @return Success
   */
  ApiTasksPost(task?: TaskDefinition): Observable<TaskDefinition> {
    return this.ApiTasksPostResponse(task).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `TasksService.ApiTasksByIdLanguagesPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `languages`:
   */
  ApiTasksByIdLanguagesPostResponse(params: TasksService.ApiTasksByIdLanguagesPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.languages;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Tasks/${params.id}/languages`,
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
   * @param params The `TasksService.ApiTasksByIdLanguagesPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `languages`:
   */
  ApiTasksByIdLanguagesPost(params: TasksService.ApiTasksByIdLanguagesPostParams): Observable<void> {
    return this.ApiTasksByIdLanguagesPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `TasksService.ApiTasksByIdTestsPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `tests`:
   */
  ApiTasksByIdTestsPostResponse(params: TasksService.ApiTasksByIdTestsPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.tests;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Tasks/${params.id}/tests`,
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
   * @param params The `TasksService.ApiTasksByIdTestsPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `tests`:
   */
  ApiTasksByIdTestsPost(params: TasksService.ApiTasksByIdTestsPostParams): Observable<void> {
    return this.ApiTasksByIdTestsPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }
}

module TasksService {

  /**
   * Parameters for ApiTasksByIdUsersPost
   */
  export interface ApiTasksByIdUsersPostParams {
    id: number;
    users?: Array<UserTask>;
  }

  /**
   * Parameters for ApiTasksByIdPut
   */
  export interface ApiTasksByIdPutParams {
    id: number;
    task?: TaskDefinition;
  }

  /**
   * Parameters for ApiTasksByIdLanguagesPost
   */
  export interface ApiTasksByIdLanguagesPostParams {
    id: number;
    languages?: Array<TaskLanguage>;
  }

  /**
   * Parameters for ApiTasksByIdTestsPost
   */
  export interface ApiTasksByIdTestsPostParams {
    id: number;
    tests?: Array<Test>;
  }
}

export { TasksService }
