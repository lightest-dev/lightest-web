import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {retry, tap, map, filter, catchError, pluck} from 'rxjs/operators';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';
import { UserInfo } from '../models/userInfo';
import { LOGIN_TIMEOUT_MS, LOGIN_URL } from 'src/config/apiConfig';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  private loggedInTime: number;
  request_token;
  headers;
  userID;

  constructor(private http: HttpClient,
    private oauthService: OAuthService) {
    this.loggedInTime = Number(sessionStorage.getItem('logged_in')) || 0;
  }

  configureLogin(config: AuthConfig): void {
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  loginPossible(): boolean {
    const difference = Date.now() - this.loggedInTime;
    return difference < LOGIN_TIMEOUT_MS;
  }

  login(data): Observable<Object> {
    return this.http.post(`${LOGIN_URL}/Account/Login`, data);
  }

  confirmLogin(): void {
    this.loggedInTime = Date.now();
    sessionStorage.setItem('logged_in', this.loggedInTime.toString());
  }

  getUserInfo(): UserInfo {
    const token = this.oauthService.getAccessToken();
    const claims = jwt_decode(token);
    const result = new UserInfo();
    result.id = claims['sub'];
    result.isAdmin = claims['Admin'] && claims['Admin'].toLowerCase() === 'true';
    result.isTeacher = claims['Teacher'] && claims['Teacher'].toLowerCase() === 'true';
    return result;
  }

  register(userName: string, password: string, email: string): Observable<Object> {
    return this.http.post(`${LOGIN_URL}/account/register`, this.loadRegisterObject(userName, password, email))
                    .pipe(
                      catchError((err: HttpErrorResponse) => {
                        if (err.status === 400) {
                          return throwError('Bad Request');
                        }
                      })
                    );
  }

  logout(): Observable<Object> {
    sessionStorage.removeItem('logged_in');
    this.loggedInTime = 0;
    this.oauthService.logOut(true);
    return this.http.post(`${LOGIN_URL}/Account/Logout`, {});
  }

  loadRegisterObject(userName: string, password: string, email: string) {
    return {
      'username': userName,
      'password': password,
      'email': email
    };
  }
}
