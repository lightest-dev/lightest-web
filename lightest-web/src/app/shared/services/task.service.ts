import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${API_URL}/tasks`);
  }

  addNewTask(task) {
    return this.http.post(`${API_URL}/tasks`, task);
  }


}
