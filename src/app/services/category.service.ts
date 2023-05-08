import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, count, map } from 'rxjs';
import { Category } from '../models/categories/category.model';
import { CategoryFilter } from '../models/categories/category-filter.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getCategory(id: number): Observable<Category> {
    const url = 'http://localhost:3000/categories/' + id;
    return this.http.get<Category>(url);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  getCategoriesWithCount(categoryFilter: CategoryFilter) {
    if (categoryFilter.value) {
      return this.http.get<Category[]>(`http://localhost:3000/categories?q=${categoryFilter.value}&_page=1&_limit=1`, { observe: 'response' })
        .pipe(map(response => {
          return {
            data: response?.body,
            count: +(response?.headers.get('X-Total-Count')!)
          };
        }));
    }else{
      return this.http.get<Category[]>(`http://localhost:3000/categories?_page=1&_limit=10`, { observe: 'response' })
        .pipe(map(response => {
          return {
            data: response?.body,
            count: +(response?.headers.get('X-Total-Count')!)
          };
        }));
    }
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post('http://localhost:3000/categories', category);
  }

  deleteCategory(id: number): Observable<Category> {
    const url = 'http://localhost:3000/categories/' + id;
    return this.http.delete<Category>(url);
  }

  updateCategory(value: string, id: number): Observable<Category> {
    const url = 'http://localhost:3000/categories/' + id;
    return this.http.put<Category>(url, value);
  }
}