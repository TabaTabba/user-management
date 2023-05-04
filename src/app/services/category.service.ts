import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(id: number):Observable<Category>{
    const url = 'http://localhost:3000/categories/' + id;
    return this.http.get<Category>(url);
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post('http://localhost:3000/categories', category);
  }

  deleteCategory(id: number): Observable<Category> {
    const url = 'http://localhost:3000/categories/' + id;
    return this.http.delete<Category>(url);
  }
  
  updateCategory(category: Category, id: number): Observable<Category> {
    const url = 'http://localhost:3000/categories/' + id;
    return this.http.put<Category>(url, category);
  }
}