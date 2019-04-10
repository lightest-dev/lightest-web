import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {combineLatest, Observable, of} from 'rxjs';
import {Test} from '../models/Test';
import {map} from 'rxjs/operators';
import {TaskService} from './task.service';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient,
              private taskService: TaskService) { }

  getTest(taskId) :Observable<Test[]>{
    return this.http.get<Test[]>(`${API_URL}/tests/${taskId}`);
  }

  changeTest(id, tests: Test[]){
    return this.http.put(`${API_URL}/tests/${id}`, tests);
  }

  deleteTest(id){
    return this.http.delete(`${API_URL}/tests/${id}`);
  }

  addTest(test: Test){
    return this.http.post(`${API_URL}/tests`, test);
  }


}
