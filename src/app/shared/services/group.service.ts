import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../config/apiConfig';
import { Observable } from 'rxjs';
import { GroupShort } from '../models/GroupShort';
import { Group } from '../models/Group';
import { UserForGroup } from '../models/UserForGroup';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getAssignedGroups(): Observable<GroupShort[]> {
    return this.http.get<GroupShort[]>(`${API_URL}/groups`);
  }

  // admin-only
  getAllGroups(): Observable<GroupShort[]> {
    return this.http.get<GroupShort[]>(`${API_URL}/groups/all`);
  }

  getAccesibleGroups(): Observable<GroupShort[]> {
    if (this.authService.getUserInfo().isAdmin) {
      return this.getAllGroups();
    }
    return this.getAssignedGroups();
  }

  addGroup(group: GroupShort): Observable<GroupShort> {
    if (!group.parentId) {
      delete group.parentId;
    }
    return this.http.post<GroupShort>(`${API_URL}/groups`, group);
  }

  getGroup(id): Observable<Group> {
    return this.http.get<Group>(`${API_URL}/groups/${id}`);
  }

  changeGroupInfo(id, group: GroupShort) {
    return this.http.put<GroupShort>(`${API_URL}/groups/${id}`, group);
  }

  deleteGroup(id) {
    return this.http.delete(`${API_URL}/groups/${id}`);
  }

  addUsersToGroup(id, users: UserForGroup) {
    return this.http.post(`${API_URL}/groups/${id}/add-users`, users);
  }
}
