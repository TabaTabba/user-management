import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users/user.model';
import { Observable, map } from 'rxjs';
import { UserFilter } from '../models/users/user-filter.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    const url = 'http://localhost:3000/users/' + id;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  getUsersWithCount(userFilter: UserFilter) {
    let queryString = `http://localhost:3000/users`;

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

    if (userFilter.dateOfBirth) {
      params = params.append('dateOfBirth', userFilter.dateOfBirth);
    }

    if (userFilter.category) {
      params = params.append('category', userFilter.category);
    }

    if (userFilter.status) {
      params = params.append('status', userFilter.status);
    }

    return this.http.get<User[]>(queryString, { params, observe: 'response' })
      .pipe(map(response => {
        console.log(+(response?.headers.get('X-Total-Count')!));
        return {
          data: response?.body,
          count: +(response?.headers.get('X-Total-Count')!)
        };
      }));
  }

  addUser(user: User): Observable<User> {
    return this.http.post('http://localhost:3000/users', user);
  }

  deleteUser(id: number): Observable<User> {
    const url = 'http://localhost:3000/users/' + id;
    return this.http.delete<User>(url);
  }

  updateUser(user: User, id: number | null) {
    const url = 'http://localhost:3000/users/' + id;
    return this.http.put<User>(url, user);
  }
}
