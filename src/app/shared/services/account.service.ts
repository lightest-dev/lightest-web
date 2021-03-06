import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { LOGIN_URL } from 'src/config/apiConfig';
import { ResetPasswordResult } from '../models/ResetPasswordResult';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  register(userName: string, password: string, email: string): Observable<Object> {
    const options = {
      withCredentials: true
    };
    return this.http.post(`${LOGIN_URL}/account/register`, this.loadRegisterObject(userName, password, email), options)
                    .pipe(
                      catchError((err: HttpErrorResponse) => {
                        if (err.status === 400) {
                          return throwError('Bad Request');
                        }
                      })
                    );
  }

  private loadRegisterObject(userName: string, password: string, email: string) {
    return {
      'username': userName,
      'password': password,
      'email': email
    };
  }

  addToRole(data: {
    userId: string,
    role: string,
  }): Observable<any> {
    const options = {
      withCredentials: true
    };

    return this.http.post(`${LOGIN_URL}/account/role`, data, options);
  }

  changePassword(data : {
    newPassword: string,
  }): Observable<any> {
    const options = {
      withCredentials: true
    };

    return this.http.post(`${LOGIN_URL}/account/change-password`, data, options);
  }

  resetPassword(data: {
    userName: string,
  }): Observable<ResetPasswordResult> {
    const options = {
      withCredentials: true
    };

    return this.http.post<ResetPasswordResult>(`${LOGIN_URL}/account/reset-password`, data, options);
  }
}
