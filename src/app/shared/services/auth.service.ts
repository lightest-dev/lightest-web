import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { UserRoleInfo } from '../models/UserRoleInfo';
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

  login(data: { login: string; password: string; }): Observable<Object> {
    const options = {
      withCredentials: true
    };
    return this.http.post(`${LOGIN_URL}/Account/Login`, data, options)
                      .pipe(
                        catchError((err: HttpErrorResponse) => {
                          if (err.status === 400) {
                            return throwError('Bad Request');
                          }
                        })
                      );
  }

  confirmLogin(): void {
    this.loggedInTime = Date.now();
    sessionStorage.setItem('logged_in', this.loggedInTime.toString());
  }

  getUserInfo(): UserRoleInfo {
    const token = this.oauthService.getAccessToken();
    const claims = jwt_decode(token);
    const result = new UserRoleInfo();
    result.id = claims['sub'];
    result.isAdmin = claims['Admin'] && claims['Admin'].toLowerCase() === 'true';
    result.isTeacher = claims['Teacher'] && claims['Teacher'].toLowerCase() === 'true';
    return result;
  }

  logout(): Observable<Object> {
    const options = {
        withCredentials: true
    };
    const data = {
      clientName: 'client'
    };
    sessionStorage.removeItem('logged_in');
    this.loggedInTime = 0;
    this.oauthService.logOut(true);
    return this.http.post(`${LOGIN_URL}/Account/Logout`, data, options);
  }
}
