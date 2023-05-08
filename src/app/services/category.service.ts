import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Category } from '../models/category.model';

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

  filterCategories(filterValues: any): Observable<Category[]> {
    return this.getCategories().pipe(
      map((categories: Category[]) => {

        return categories.filter((category: Category) => {
          let isMatch = true;

          for (const key in filterValues) {
            if (filterValues.hasOwnProperty(key) && filterValues[key]) {
              if (key === "value") {
                if (!category[key] || !category[key]!.toLowerCase().includes(filterValues[key].toLowerCase())) {
                  isMatch = false;
                  break;
                }
              } else if(category[key] === undefined && category[key] !== filterValues[key]){
                  isMatch = false;
                  break;
              }
            }

          }
          return isMatch;
        });
      })
    );
  }
}