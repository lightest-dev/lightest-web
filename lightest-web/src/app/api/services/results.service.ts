/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse,
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CheckerResult } from '../models/checker-result';
@Injectable({
  providedIn: 'root',
})
class ResultsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param result undefined
   */
  ApiResultsPostResponse(result?: CheckerResult): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = result;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Results`,
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
   * @param result undefined
   */
  ApiResultsPost(result?: CheckerResult): Observable<void> {
    return this.ApiResultsPostResponse(result).pipe(
      map(_r => _r.body)
    );
  }
}

module ResultsService {
}

export { ResultsService }
