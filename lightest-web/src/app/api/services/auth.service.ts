import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {retry, tap, map, filter, catchError, pluck} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private loggedIn = false;
  request_token;
  headers;

  constructor(private http: HttpClient) {
    // при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  ngOnInit() {
   
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  login(login: string, password: string, rememberMe: boolean) {
    return this.http.post(`https://login.lightest.tk/api/Account/Login`, this.loadLoginObject(login, password, rememberMe))
                      .pipe(
                        catchError((err: HttpErrorResponse) => {
                          if (err.status === 400) {
                            return throwError('Bad Request');
                          } 
                        })
                      )              
  }

  authorize() {
    let body = new FormData();
    body.append('client_id', "client");
    body.append('response_type', "code id_token token");
    body.append('redirect_uri', "http://localhost:4200/auth");
    body.append('scope', "openid profile api");
    body.append("nonce", Math.floor(Math.random()* 2147483647).toString());
    
    return this.http.post('https://login.lightest.tk/connect/authorize', body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            return throwError('Bad Request');
          } 
        })
      );
  }

  getToken(code: string) {
    let body = new FormData();
    body.append('client_id', "client");
    body.append('client_secret', 'secret');
    body.append('grant_type', 'authorization_code')
    body.append('redirect_uri', "http://localhost:4200/auth");
    body.append('scope', "openid profile api");
    body.append('code', code);
    
    return this.http.post('https://login.lightest.tk/connect/token', body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 400) {
            return throwError('Bad Request');
          } 
        })
      );
  }

  register(userName: string, password: string, email: string) {
    return this.http.post(`https://login.lightest.tk/api/Account/Register`, this.loadRegisterObject(userName, password, email))
                    .pipe(
                      catchError((err: HttpErrorResponse) => {
                        if (err.status === 400) {
                          return throwError('Bad Request');
                        } 
                      })
                    )   
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
    // запит на logout 
  }

  loadRegisterObject(userName: string, password: string, email: string) {
    return {
      "username": userName,
      "password": password,
      "email": email
    }
  }

  loadLoginObject(login: string, password: string, rememberMe: boolean) {
    return {
      "login": login,
      "password": password,
      "rememberMe": rememberMe
    }
  }
}
