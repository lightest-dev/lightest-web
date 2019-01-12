import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {UserShort} from '../models/UserShort';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {UserPUT} from '../models/UserPUT';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  getUser(id) :Observable<User> {
    return this.http.get<User>(`${API_URL}/profile/${id}`);
  }

  getUsers() :Observable<UserShort[]>{
    return this.http.get<UserShort[]>(`${API_URL}/profile`);
  }

  putUser(id, user: UserPUT) {
    return this.http.put(`${API_URL}/profile/${id}`, user);
  }

  getUsersIDByRole(roleName: string) :Observable<any>{
    return this.http.get(`${API_URL}/profile/role/${roleName}`);
  }
}
