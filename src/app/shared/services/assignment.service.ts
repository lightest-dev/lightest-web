import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Observable} from 'rxjs';
import {UserForTask} from '../models/UserForTask';
import { Assignment } from '../models/assignments/Assignment';
import { AssignmentModification } from '../models/assignments/AssignmentModification';
import { GroupAssignment } from '../models/assignments/GroupAssignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAssignedTasks(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(`${API_URL}/assignments/my`);
  }

  getAssignedUsersToTask(taskId: string) :Observable<UserForTask[]>{
    return this.http.get<UserForTask[]>(`${API_URL}/assignments/${taskId}`);
  }

  assignTaskToUsers(request: AssignmentModification) {
    return this.http.post(`${API_URL}/assignments/${request.taskId}`, request);
  }

  assignTaskToGroup(request: GroupAssignment) {
    return this.http.post(`${API_URL}/assignments/${request.taskId}/from-group`, request);
  }
}
