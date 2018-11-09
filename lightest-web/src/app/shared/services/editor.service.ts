import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {THEMES} from '../constants/themes';

@Injectable()
export class EditorService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Bearer': `${sessionStorage.access_token}`
    })
  };

  constructor(private http: HttpClient) {}

  getLanguages () {
    return this.http.get('https://lightest.tk/api/Languages', this.httpOptions);
  }

  getDefaultTheme () {
    return THEMES[0];
  }

  getThemes() {
    return THEMES;
  }
}


