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

  getToken() {
    let body = new HttpParams();
    body.set('client_id', "client");
    body.set('response_type', "code id_token token");
    body.set('redirect_uri', "http://localhost:4200/auth");
    body.set('scope', "openid profile api");
    body.set("nonce", "1244452");

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    
    this.http.post('https://login.lightest.tk/connect/authorize', body, { headers: headers })
              .subscribe(
                data => console.log(data)
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
