import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Observable} from 'rxjs';
import {Test} from '../models/Test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTest(id) :Observable<Test[]>{
    return this.http.get<Test[]>(`${API_URL}/tests/${id}`);
  }

  changeTest(id, tests: Test[]){
    return this.http.put(`${API_URL}/tests/${id}`, tests);
  }

  deleteTest(id){
    return this.http.delete(`${API_URL}/tests/${id}`);
  }

  addTest(id, test: Test){
    return this.http.post(`${API_URL}/tests/${id}`, test);
  }
}
