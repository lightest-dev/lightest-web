import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {THEMES} from '../constants/themes';
import {Language} from '../../api/models/language';
import {APIURL} from '../constants/apiUrl';

@Injectable()
export class EditorService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.access_token}`
    })
  };

  constructor(private http: HttpClient) {}

  getLanguages () {
    return this.http.get(`${APIURL}/Languages`, this.httpOptions);
  }

  getThemes() {
    return THEMES;
  }

}


