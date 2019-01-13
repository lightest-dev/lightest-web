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

  getTask(id) {
    return this.http.get(`${API_URL}/tasks/${id}`);
  }

  changeTask(id, task) {
    return this.http.put(`${API_URL}/tasks/${id}`, task);
  }

  deleteTask(id) {
    return this.http.delete(`${API_URL}/tasks/${id}`);
  }

  getAssignedUsersToTask(taskId) {
    return this.http.get(`${API_URL}/tasks/${taskId}/users`);
  }

  assignTaskToUsers(taskId, users) {
    return this.http.post(`${API_URL}/tasks/${taskId}/users`, users);
  }

  addLanguagesForTask(taskId, languages) {
    return this.http.post(`${API_URL}/tasks/${taskId}/languages`, languages);
  }

  addTestsForTask(taskId, tests) {
    return this.http.post(`${API_URL}/tasks/${taskId}/tests`, tests);
  }
}
