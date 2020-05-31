import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Observable} from 'rxjs';
import {TaskShort} from '../models/TaskShort';
import {Task} from '../models/Task';
import {UserForTask} from '../models/UserForTask';
import {LanguageForTask} from '../models/LanguageForTask';
import {Test} from '../models/Test';
import { Assignment } from '../models/Assignment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // TODO: review current usage and replace with getAssignedTasks for non-admin users
  getTasks(): Observable<TaskShort[]> {
    return this.http.get<TaskShort[]>(`${API_URL}/tasks`);
  }

  addNewTask(task: TaskShort) {
    return this.http.post(`${API_URL}/tasks`, task);
  }

  getTask(id): Observable<Task>{
    return this.http.get<Task>(`${API_URL}/tasks/${id}`);
  }

  changeTask(id, task: TaskShort): void{
     this.http.put(`${API_URL}/tasks/${id}`, task);
  }

  deleteTask(id) {
    return this.http.delete(`${API_URL}/tasks/${id}`);
  }

  // TODO: move to a separate service
  getAssignedTasks(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${API_URL}/assignments/my`);
  }

  getAssignedUsersToTask(taskId: string) :Observable<UserForTask[]>{
    return this.http.get<UserForTask[]>(`${API_URL}/assignments/${taskId}`);
  }

  assignTaskToUsers(taskId: string, users: UserForTask[]) {
     return this.http.post(`${API_URL}/assignments/${taskId}`, users);
  }

  addLanguagesForTask(taskId, languages: LanguageForTask[]): Observable<LanguageForTask[]>{
     return this.http.post<LanguageForTask[]>(`${API_URL}/tasks/${taskId}/languages`, languages);
  }

  addTestsForTask(taskId, tests: Test[]) {
    return this.http.post(`${API_URL}/tasks/${taskId}/tests`, tests);
  }

  findDoneTasks(tasks) {
    return tasks.filter(task => {
      return task.completed === true;
    });
  }

  findNotDoneTasks(tasks) {
    return tasks.filter(task => {
      return task.completed === false;
    });
  }
}
