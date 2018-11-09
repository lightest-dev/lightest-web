import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {retry, tap, map, filter, catchError, pluck} from 'rxjs/operators';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {

  private passwordLogged = false;
  request_token;
  headers;

  constructor(private http: HttpClient,
    private oauthService: OAuthService) {
    // при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
    // this.loggedIn = !!localStorage.getItem('access_token');
    this.passwordLogged = !!localStorage.getItem('logged_in');
  }

  configureLogin(config: AuthConfig) {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  loginPossible() {
    return this.passwordLogged;
  }

  login(login: string, password: string, rememberMe: boolean) {
    return this.http.post(`https://login.lightest.tk/api/Account/Login`, this.loadLoginObject(login, password, rememberMe))
                      .pipe(
                        catchError((err: HttpErrorResponse) => {
                          if (err.status === 400) {
                            return throwError('Bad Request');
                          }
                        })
                      );
  }

  confirmLogin() {
    this.passwordLogged = true;
    localStorage.setItem('logged_in', 'true');
  }

  register(userName: string, password: string, email: string) {
    return this.http.post(`https://login.lightest.tk/api/Account/Register`, this.loadRegisterObject(userName, password, email))
                    .pipe(
                      catchError((err: HttpErrorResponse) => {
                        if (err.status === 400) {
                          return throwError('Bad Request');
                        }
                      })
                    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.passwordLogged = false;
    this.oauthService.logOut(true);
    return this.http.post(`https://login.lightest.tk/api/Account/Logout`,{});
  }

  loadRegisterObject(userName: string, password: string, email: string) {
    return {
      'username': userName,
      'password': password,
      'email': email
    };
  }

  loadLoginObject(login: string, password: string, rememberMe: boolean) {
    return {
      'login': login,
      'password': password,
      'rememberMe': rememberMe
    };
  }
}
