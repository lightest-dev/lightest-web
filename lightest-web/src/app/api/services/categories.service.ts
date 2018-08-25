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
import { CompleteCategoryViewModel } from '../models/complete-category-view-model';
import { Category } from '../models/category';
@Injectable({
  providedIn: 'root',
})
class CategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `CategoriesService.ApiCategoriesByIdAccessPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `model`:
   */
  ApiCategoriesByIdAccessPostResponse(params: CategoriesService.ApiCategoriesByIdAccessPostParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.model;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Categories/${params.id}/access`,
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
   * @param params The `CategoriesService.ApiCategoriesByIdAccessPostParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `model`:
   */
  ApiCategoriesByIdAccessPost(params: CategoriesService.ApiCategoriesByIdAccessPostParams): Observable<void> {
    return this.ApiCategoriesByIdAccessPostResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiCategoriesByIdGetResponse(id: number): Observable<HttpResponse<CompleteCategoryViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Categories/${id}`,
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
        let _body: CompleteCategoryViewModel = null;
        _body = _resp.body as CompleteCategoryViewModel;
        return _resp.clone({body: _body}) as HttpResponse<CompleteCategoryViewModel>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiCategoriesByIdGet(id: number): Observable<CompleteCategoryViewModel> {
    return this.ApiCategoriesByIdGetResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param params The `CategoriesService.ApiCategoriesByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `category`:
   */
  ApiCategoriesByIdPutResponse(params: CategoriesService.ApiCategoriesByIdPutParams): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.category;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Categories/${params.id}`,
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
   * @param params The `CategoriesService.ApiCategoriesByIdPutParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `category`:
   */
  ApiCategoriesByIdPut(params: CategoriesService.ApiCategoriesByIdPutParams): Observable<void> {
    return this.ApiCategoriesByIdPutResponse(params).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiCategoriesByIdDeleteResponse(id: number): Observable<HttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Categories/${id}`,
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
        let _body: Category = null;
        _body = _resp.body as Category;
        return _resp.clone({body: _body}) as HttpResponse<Category>;
      })
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  ApiCategoriesByIdDelete(id: number): Observable<Category> {
    return this.ApiCategoriesByIdDeleteResponse(id).pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @return Success
   */
  ApiCategoriesGetResponse(): Observable<HttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Categories`,
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
        let _body: Category = null;
        _body = _resp.body as Category;
        return _resp.clone({body: _body}) as HttpResponse<Category>;
      })
    );
  }

  /**
   * @return Success
   */
  ApiCategoriesGet(): Observable<Category> {
    return this.ApiCategoriesGetResponse().pipe(
      map(_r => _r.body)
    );
  }

  /**
   * @param category undefined
   * @return Success
   */
  ApiCategoriesPostResponse(category?: Category): Observable<HttpResponse<CompleteCategoryViewModel>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = category;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Categories`,
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
        let _body: CompleteCategoryViewModel = null;
        _body = _resp.body as CompleteCategoryViewModel;
        return _resp.clone({body: _body}) as HttpResponse<CompleteCategoryViewModel>;
      })
    );
  }

  /**
   * @param category undefined
   * @return Success
   */
  ApiCategoriesPost(category?: Category): Observable<CompleteCategoryViewModel> {
    return this.ApiCategoriesPostResponse(category).pipe(
      map(_r => _r.body)
    );
  }
}

module CategoriesService {

  /**
   * Parameters for ApiCategoriesByIdAccessPost
   */
  export interface ApiCategoriesByIdAccessPostParams {
    id: number;
    model?: AccessRightsViewModel;
  }

  /**
   * Parameters for ApiCategoriesByIdPut
   */
  export interface ApiCategoriesByIdPutParams {
    id: number;
    category?: Category;
  }
}

export { CategoriesService }
