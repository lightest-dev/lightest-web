import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../../config/apiConfig';
import {Category} from '../models/category';
import {CategoryUser} from '../models/categoryUser';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(`${API_URL}/categories`);
  }

  postCategory(category: Category) {
    return this.http.post(`${API_URL}/categories`, category);
  }

  getCategory(id) {
    return this.http.get(`${API_URL}/categories/${id}`);
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
