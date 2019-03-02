import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {THEMES} from '../constants/themes';
import {Language} from '../../api/models/language';
import { API_URL } from 'src/config/apiConfig';

@Injectable()
export class EditorService {
  constructor(private http: HttpClient) {}

  getLanguages () {
    return this.http.get(`${API_URL}/Languages`);
  }

  getThemes() {
    return THEMES;
  }

}


