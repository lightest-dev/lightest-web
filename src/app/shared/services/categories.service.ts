import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Category} from '../models/Category';
import {CategoryUser} from '../models/CategoryUser';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getAssignedCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories`);
  }

  // admin-only
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}/categories/all`);
  }

  getAccesibleCategories(): Observable<Category[]> {
    if (this.authService.getUserInfo().isAdmin) {
      return this.getAllCategories();
    }
    return this.getAssignedCategories();
  }

  addCategory(category: Category): Observable<Category> {
    if (!category.parentId) {
      delete category.parentId;
    }
    return this.http.post<Category>(`${API_URL}/categories`, category);
  }

  getCategory(id): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/categories/${id}`);
  }

  putCategory(id, newCategory: Category) {
    return this.http.put(`${API_URL}/categories/${id}`, newCategory);
  }

  deleteCategory(id) {
    return this.http.delete(`${API_URL}/categories/${id}`);
  }

  addUsersToCategory(id, users: CategoryUser) {
    return this.http.post(`${API_URL}/categories/${id}/add-users`, users);
  }

}
