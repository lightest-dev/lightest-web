import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Language} from '../../api/models/language';
import {API_URL} from '../../../config/apiConfig';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getLanguages() :Observable<Language[]>{
    return this.http.get<Language[]>(`${API_URL}/languages`);
  }

  addLanguage(language: Language){
    return this.http.post(`${API_URL}/languages`, language);
  }

  deleteLanguage(id){
    return this.http.delete(`${API_URL}/languages/${id}`);
  }
}
