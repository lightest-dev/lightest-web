import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {TaskResult} from '../models/TaskResult';
import {Observable} from 'rxjs';
import {TaskSolution} from '../models/TaskSolution';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  getTaskUploads(taskId): Observable<TaskResult[]> {
    return this.http.get<TaskResult[]>(`${API_URL}/uploads/${taskId}`);
  }

  getTaskResult(taskId): Observable<TaskResult> {
    return this.http.get<TaskResult>(`${API_URL}/uploads/code/${taskId}/result`);
  }

  getTaskUploadsAllUsers(taskId): Observable<TaskResult[]> {
    return this.http.get<TaskResult[]>(`${API_URL}/uploads/code/${taskId}/result`);
  }

  uploadTaskSolution(taskSolution: TaskSolution) {
    return this.http.post(`${API_URL}/uploads/code`, taskSolution);
  }



}
