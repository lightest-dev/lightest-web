/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Language } from '../models/language';
@Injectable({
  providedIn: 'root',
})
class LanguagesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiLanguagesByIdDeleteResponse(id: number): Observable<HttpResponse<Language>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Languages/${id}`,
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
        let _body: Language = null;
        _body = _resp.body as Language;
        return _resp.clone({body: _body}) as HttpResponse<Language>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiLanguagesByIdDelete(id: number): Observable<Language> {
    return this.ApiLanguagesByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  ApiLanguagesGetResponse(): Observable<HttpResponse<Array<Language>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Languages`,
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
        let _body: Array<Language> = null;
        _body = _resp.body as Array<Language>;
        return _resp.clone({body: _body}) as HttpResponse<Array<Language>>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiLanguagesGet(): Observable<Array<Language>> {
    return this.ApiLanguagesGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param language undefined
   * @return Success
   */
  ApiLanguagesPostResponse(language?: Language): Observable<HttpResponse<Language>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = language;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Languages`,
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
        let _body: Language = null;
        _body = _resp.body as Language;
        return _resp.clone({body: _body}) as HttpResponse<Language>;
      })
    );
  }

  /**
   * @param language undefined
   * @return Success
   */
  ApiLanguagesPost(language?: Language): Observable<Language> {
    return this.ApiLanguagesPostResponse(language).pipe(
      map(_r => _r.body)
    );
  }
}

module LanguagesService {
}

export { LanguagesService }
