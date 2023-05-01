import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User>{
    const url = 'http://localhost:3000/users/' + id;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  addUser(user: User): Observable<User>{
    return this.http.post('http://localhost:3000/users', user);
  }

  deleteUser(id: number): Observable<User>{
    const url = 'http://localhost:3000/users/' + id;
    return this.http.delete<User>(url);
  }

  updateUser(user: User, id: number | null){
    const url =  'http://localhost:3000/users/' + id;
    return this.http.put<User>(url, user);
  }
}
