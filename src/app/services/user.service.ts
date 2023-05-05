import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, map } from 'rxjs';

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

  filterUsers(filterValues: any): Observable<User[]> {
    return this.getUsers().pipe(
      map((users: User[]) => {
        return users.filter((user: User) => {
          let isMatch = true;

          for (const key in filterValues) {
            if (filterValues.hasOwnProperty(key) && filterValues[key]) {
              if (key === 'email' || key === 'firstName' || key === 'lastName') {
                if (!user[key]!.toLowerCase().includes(filterValues[key].toLowerCase())) {
                  isMatch = false;
                  break;
                }
              } else {
                if (user[key] !== filterValues[key]) {
                  isMatch = false;
                  break;
                }
              }
            }
          }

          return isMatch;
        });
      })
    );
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
