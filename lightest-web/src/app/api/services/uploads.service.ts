/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { IUpload } from '../models/iupload';
import { CodeUpload } from '../models/code-upload';
import { ArchiveUpload } from '../models/archive-upload';
@Injectable({
  providedIn: 'root',
})
class UploadsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `UploadsService.ApiUploadsByTypeByIdStatusGetParams` containing the following parameters:
   *
   * - `type`:
   *
   * - `id`:
   *
   * @return Success
   */
  ApiUploadsByTypeByIdStatusGetResponse(params: UploadsService.ApiUploadsByTypeByIdStatusGetParams): Observable<HttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Uploads/${params.type}/${params.id}/status`,
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
        let _body: boolean = null;
        _body = _resp.body == 'true';
        return _resp.clone({body: _body}) as HttpResponse<boolean>;
      })
    );
  }

  /**
   * @param params The `UploadsService.ApiUploadsByTypeByIdStatusGetParams` containing the following parameters:
   *
   * - `type`:
   *
   * - `id`:
   *
   * @return Success
   */
  ApiUploadsByTypeByIdStatusGet(params: UploadsService.ApiUploadsByTypeByIdStatusGetParams): Observable<boolean> {
    return this.ApiUploadsByTypeByIdStatusGetResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `UploadsService.ApiUploadsByTypeByIdResultGetParams` containing the following parameters:
   *
   * - `type`:
   *
   * - `id`:
   *
   * @return Success
   */
  ApiUploadsByTypeByIdResultGetResponse(params: UploadsService.ApiUploadsByTypeByIdResultGetParams): Observable<HttpResponse<IUpload>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Uploads/${params.type}/${params.id}/result`,
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
        let _body: IUpload = null;
        _body = _resp.body as IUpload;
        return _resp.clone({body: _body}) as HttpResponse<IUpload>;
      })
    );
  }

  /**
   * @param params The `UploadsService.ApiUploadsByTypeByIdResultGetParams` containing the following parameters:
   *
   * - `type`:
   *
   * - `id`:
   *
   * @return Success
   */
  ApiUploadsByTypeByIdResultGet(params: UploadsService.ApiUploadsByTypeByIdResultGetParams): Observable<IUpload> {
    return this.ApiUploadsByTypeByIdResultGetResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param upload undefined
   * @return Success
   */
  ApiUploadsCodePostResponse(upload?: CodeUpload): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = upload;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Uploads/code`,
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
        let _body: number = null;
        _body = parseFloat(_resp.body as string);
        return _resp.clone({body: _body}) as HttpResponse<number>;
      })
    );
  }

  /**
   * @param upload undefined
   * @return Success
   */
  ApiUploadsCodePost(upload?: CodeUpload): Observable<number> {
    return this.ApiUploadsCodePostResponse(upload).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param upload undefined
   * @return Success
   */
  ApiUploadsProjectPostResponse(upload?: ArchiveUpload): Observable<HttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = upload;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Uploads/project`,
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
        let _body: number = null;
        _body = parseFloat(_resp.body as string);
        return _resp.clone({body: _body}) as HttpResponse<number>;
      })
    );
  }

  /**
   * @param upload undefined
   * @return Success
   */
  ApiUploadsProjectPost(upload?: ArchiveUpload): Observable<number> {
    return this.ApiUploadsProjectPostResponse(upload).pipe(
      map(_r => _r.body)
    );
  }
}

module UploadsService {

  /**
   * Parameters for ApiUploadsByTypeByIdStatusGet
   */
  export interface ApiUploadsByTypeByIdStatusGetParams {
    type: string;
    id: number;
  }

  /**
   * Parameters for ApiUploadsByTypeByIdResultGet
   */
  export interface ApiUploadsByTypeByIdResultGetParams {
    type: string;
    id: number;
  }
}

export { UploadsService }
