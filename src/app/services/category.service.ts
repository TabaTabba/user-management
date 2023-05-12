import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, count, map } from 'rxjs';
import { Category } from '../models/categories/category.model';
import { CategoryFilter } from '../models/categories/category-filter.model';
import { environment } from 'src/environmets/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.API_BASE_URI}/categories`);
  }

  getCategoriesWithCount(categoryFilter: CategoryFilter) {
    return this.http.get<Category[]>(`${environment.API_BASE_URI}/categories?value_like=${categoryFilter.value}&_page=${categoryFilter._page}&_limit=${categoryFilter._limit}`, { observe: 'response' })
      .pipe(map(response => {
        return {
          data: response?.body,
          count: +(response?.headers.get('X-Total-Count')!)
        };
      }));
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post(`${environment.API_BASE_URI}/categories`, category);
  }

  deleteCategory(id: number): Observable<Category> {
    const url = `${environment.API_BASE_URI}/categories/${id}`;
    return this.http.delete<Category>(url);
  }

  updateCategory(value: string, id: number): Observable<Category> {
    const url = `${environment.API_BASE_URI}/categories/${id}`;
    return this.http.put<Category>(url, value);
  }
}