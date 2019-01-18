import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfiguration} from '../../api/api-configuration';
import {API_URL} from '../../../config/apiConfig';
import {Observable} from 'rxjs';
import {GroupShort} from '../models/GroupShort';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups() :Observable<GroupShort[]>{
    return this.http.get<GroupShort[]>(`${API_URL}/groups`);
  }


}
