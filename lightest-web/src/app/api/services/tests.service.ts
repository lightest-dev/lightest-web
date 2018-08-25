/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Test } from '../models/test';
@Injectable({
  providedIn: 'root',
})
class TestsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   */
  ApiTestsByIdGetResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Tests/${id}`,
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
  ApiTestsByIdGet(id: number): Observable<void> {
    return this.ApiTestsByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `TestsService.ApiTestsByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `test`:
   */
  ApiTestsByIdPutResponse(params: TestsService.ApiTestsByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.test;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Tests/${params.id}`,
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
   * @param params The `TestsService.ApiTestsByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `test`:
   */
  ApiTestsByIdPut(params: TestsService.ApiTestsByIdPutParams): Observable<void> {
    return this.ApiTestsByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiTestsByIdDeleteResponse(id: number): Observable<HttpResponse<Test>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Tests/${id}`,
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
        let _body: Test = null;
        _body = _resp.body as Test;
        return _resp.clone({body: _body}) as HttpResponse<Test>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiTestsByIdDelete(id: number): Observable<Test> {
    return this.ApiTestsByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param test undefined
   * @return Success
   */
  ApiTestsPostResponse(test?: Test): Observable<HttpResponse<Test>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = test;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Tests`,
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
        let _body: Test = null;
        _body = _resp.body as Test;
        return _resp.clone({body: _body}) as HttpResponse<Test>;
      })
    );
  }

  /**
   * @param test undefined
   * @return Success
   */
  ApiTestsPost(test?: Test): Observable<Test> {
    return this.ApiTestsPostResponse(test).pipe(
      map(_r => _r.body)
    );
  }
}

module TestsService {

  /**
   * Parameters for ApiTestsByIdPut
   */
  export interface ApiTestsByIdPutParams {
    id: number;
    test?: Test;
  }
}

export { TestsService }
