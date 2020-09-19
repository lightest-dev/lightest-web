import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {CheckerShort} from '../models/CheckerShort';
import {Observable} from 'rxjs';
import {Checker} from '../models/Checker';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {

  constructor(private http: HttpClient) { }

  getCheckers() :Observable<CheckerShort[]>{
    return this.http.get<CheckerShort[]>(`${API_URL}/checkers`);
  }

  addChecker(checker: CheckerShort) {
    return this.http.post<Checker>(`${API_URL}/checkers`, checker);
  }

  getChecker(id) :Observable<Checker>{
    return this.http.get<Checker>(`${API_URL}/checkers/${id}`);
  }

  changeChecker(id, checker: CheckerShort) {
    return this.http.put(`${API_URL}/checkers/${id}`, checker);
  }

  deleteChecker(id){
    return this.http.delete(`${API_URL}/checkers/${id}`);
  }


}
