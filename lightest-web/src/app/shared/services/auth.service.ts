import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {retry, tap, map, filter, catchError, pluck} from 'rxjs/operators';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { LOGIN_TIMEOUT_MS } from '../constants/loginTimeout';

@Injectable()
export class AuthService {

  private loggedInTime : number;
  request_token;
  headers;

  constructor(private http: HttpClient,
    private oauthService: OAuthService) {
    this.loggedInTime = Number(sessionStorage.getItem('logged_in')) || 0;
  }

  configureLogin(config: AuthConfig) {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  loginPossible() {
    const difference = Date.now() - this.loggedInTime;
    return difference < LOGIN_TIMEOUT_MS;
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

  confirmLogin(data) {
    this.loggedInTime = Date.now();
    sessionStorage.setItem('logged_in', this.loggedInTime.toString());
    sessionStorage.setItem('admin', data.isAdmin);
    sessionStorage.setItem('teacher', data.isTeacher);
    sessionStorage.setItem('userId', data.id);
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
    sessionStorage.removeItem('logged_in');
    sessionStorage.removeItem('admin');
    sessionStorage.removeItem('teacher');
    sessionStorage.removeItem('userId');
    this.loggedInTime = 0;
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
