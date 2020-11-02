import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Category} from '../models/Category';
import {CategoryUser} from '../models/CategoryUser';
import {Observable} from 'rxjs';
import { BaseTask } from '../models/tasks/BaseTask';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }

  addCategory(category: Category): Observable<Category> {
    if (!category.parentId) {
      delete category.parentId;
    }
    return this.http.post<Category>(`${API_URL}/categories`, category);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/categories/${id}`);
  }

  getChildren(id: string): Observable<{
    tasks: BaseTask[],
    subCategories: Category[]
  }> {
    return this.http.get<{
      tasks: BaseTask[],
      subCategories: Category[]
    }>(`${API_URL}/categories/${id}/children`);
  }

  putCategory(id: string, newCategory: Category) {
    return this.http.put(`${API_URL}/categories/${id}`, newCategory);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${API_URL}/categories/${id}`);
  }

  addUsersToCategory(id: string, users: CategoryUser) {
    return this.http.post(`${API_URL}/categories/${id}/add-users`, users);
  }

}
