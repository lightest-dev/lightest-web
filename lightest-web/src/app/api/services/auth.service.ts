import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  private loggedIn = false;
  request_token;

  constructor(private http: HttpClient) {
    // при обновлении страницы смотрим в localStorage чтоб проверить есть ли токен
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  ngOnInit() {
   
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  login(login: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(`https://login.lightest.tk/api/Account/Login`, {
        "login": login,
        "password": password,
        "rememberMe": rememberMe
    });
  }
}
