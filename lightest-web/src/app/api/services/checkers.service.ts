/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Checker } from '../models/checker';
import { BasicCheckerViewModel } from '../models/basic-checker-view-model';
@Injectable({
  providedIn: 'root',
})
class CheckersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   */
  ApiCheckersByIdGetResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Checkers/${id}`,
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
  ApiCheckersByIdGet(id: number): Observable<void> {
    return this.ApiCheckersByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `CheckersService.ApiCheckersByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `checker`:
   */
  ApiCheckersByIdPutResponse(params: CheckersService.ApiCheckersByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.checker;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Checkers/${params.id}`,
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
   * @param params The `CheckersService.ApiCheckersByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `checker`:
   */
  ApiCheckersByIdPut(params: CheckersService.ApiCheckersByIdPutParams): Observable<void> {
    return this.ApiCheckersByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   */
  ApiCheckersByIdDeleteResponse(id: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Checkers/${id}`,
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
  ApiCheckersByIdDelete(id: number): Observable<void> {
    return this.ApiCheckersByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  ApiCheckersGetResponse(): Observable<HttpResponse<Array<BasicCheckerViewModel>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Checkers`,
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
        let _body: Array<BasicCheckerViewModel> = null;
        _body = _resp.body as Array<BasicCheckerViewModel>;
        return _resp.clone({body: _body}) as HttpResponse<Array<BasicCheckerViewModel>>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiCheckersGet(): Observable<Array<BasicCheckerViewModel>> {
    return this.ApiCheckersGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param checker undefined
   */
  ApiCheckersPostResponse(checker?: Checker): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = checker;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Checkers`,
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
   * @param checker undefined
   */
  ApiCheckersPost(checker?: Checker): Observable<void> {
    return this.ApiCheckersPostResponse(checker).pipe(
      map(_r => _r.body)
    );
  }
}

module CheckersService {

  /**
   * Parameters for ApiCheckersByIdPut
   */
  export interface ApiCheckersByIdPutParams {
    id: number;
    checker?: Checker;
  }
}

export { CheckersService }
