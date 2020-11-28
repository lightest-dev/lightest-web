import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Observable} from 'rxjs';
import {TaskShort} from '../models/tasks/TaskShort';
import {Task} from '../models/tasks/Task';
import {LanguageForTask} from '../models/LanguageForTask';
import {Test} from '../models/Test';
import { AssignmentService } from './assignment.service';
import { AuthService } from './auth.service';
import { AssignedTask } from '../models/tasks/AssignedTask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private assignmentsService: AssignmentService) { }

  // admin-onlys
  getAllTasks(): Observable<TaskShort[]> {
    return this.http.get<TaskShort[]>(`${API_URL}/tasks`);
  }

  getAccessibleTasks(): Observable<AssignedTask[]> {
    if (this.authService.getUserInfo().isAdmin) {
      return this.getAllTasks();
    }
    return this.assignmentsService.getAssignedTasks();
  }

  addNewTask(task: TaskShort) {
    return this.http.post(`${API_URL}/tasks`, task);
  }

  getTask(id): Observable<Task>{
    return this.http.get<Task>(`${API_URL}/tasks/${id}`);
  }

  changeTask(id, task: TaskShort): Observable<void>{
     return this.http.put<void>(`${API_URL}/tasks/${id}`, task);
  }

  deleteTask(id) {
    return this.http.delete(`${API_URL}/tasks/${id}`);
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
