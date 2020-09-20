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

  getCurrentUserUploads(taskId: string): Observable<TaskResult[]> {
    return this.http.get<TaskResult[]>(`${API_URL}/uploads/${taskId}`);
  }

  getTaskUploads(taskId: string, userId?: string): Observable<TaskResult[]> {
    return this.http.get<TaskResult[]>(`${API_URL}/uploads/${taskId}/all/${userId || ''}`);
  }

  getUploadStatus(uploadId: string): Observable<TaskResult> {
    return this.http.get<TaskResult>(`${API_URL}/uploads/${uploadId}/result`);
  }

  uploadTaskSolution(taskSolution: TaskSolution): Observable<string> {
    return this.http.post<string>(`${API_URL}/uploads/code`, taskSolution);
  }



}
