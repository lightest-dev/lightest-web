import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) {}

  getUser(id) {
     this.http.get(`${API_URL}/profile/${id}`).subscribe(data => {
       console.log(data);
     })
  }
}
