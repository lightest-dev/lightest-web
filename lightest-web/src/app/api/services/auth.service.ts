import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry, tap} from 'rxjs/operators';

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

  login(login: string, password: string, rememberMe: boolean): Observable<any> {
    this.headers = new Headers();
    this.headers = {
      "Access-Control-Allow-Origin": "*"
    }
    return this.http.post(`https://login.lightest.tk/api/Account/Login`, 
                          this.loadLoginObject(login, password, rememberMe), 
                          {headers: this.headers});
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
    
  }

  register(userName: string, password: string, email: string) {
    return this.http.post(`https://login.lightest.tk/api/Account/Register`, this.loadRegisterObject(userName, password, email))
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
