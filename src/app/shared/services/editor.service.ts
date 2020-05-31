import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {THEMES} from '../constants/themes';
import { API_URL } from 'src/config/apiConfig';

@Injectable()
export class EditorService {
  constructor(private http: HttpClient) {}

  getThemes() {
    return THEMES;
  }

}


