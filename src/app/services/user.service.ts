import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users/user.model';
import { Observable, map } from 'rxjs';
import { UserFilter } from '../models/users/user-filter.model';
import { environment } from 'src/environmets/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const url = `${environment.API_BASE_URI}/users/${id}`;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_BASE_URI}/users`);
  }

  getUsersWithCount(userFilter: UserFilter) {
    let queryString = `${environment.API_BASE_URI}/users`;

    let params = new HttpParams();

    if (userFilter.email) {
      params = params.append('email_like', userFilter.email);
    }

    if (userFilter.personalId) {
      params = params.append('personalId', userFilter.personalId);
    }

    if (userFilter.firstName) {
      params = params.append('firstName_like', userFilter.firstName);
    }

    if (userFilter.lastName) {
      params = params.append('lastName_like', userFilter.lastName);
    }

    if (userFilter.category) {
      params = params.append('category', userFilter.category);
    }

    if (userFilter.status) {
      params = params.append('status', userFilter.status);
    }

    if (userFilter._page) {
      params = params.append('_page', userFilter._page);
    }

    if (userFilter._limit) {
      params = params.append('_limit', userFilter._limit);
    }

    return this.http.get<User[]>(queryString, { params, observe: 'response' })
      .pipe(map(response => {
        return {
          data: response?.body,
          count: +(response?.headers.get('X-Total-Count')!)
        };
      }));
  }

  addUser(user: User): Observable<User> {
    return this.http.post(`${environment.API_BASE_URI}/users`, user);
  }

  deleteUser(id: number): Observable<User> {
    const url = `${environment.API_BASE_URI}/users/${id}`;
    return this.http.delete<User>(url);
  }

  updateUser(user: User, id: number | null) {
    const url = `${environment.API_BASE_URI}/users/${id}`;
    return this.http.put<User>(url, user);
  }
}