import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatus(id: number): Observable<Status> {
    const url = 'http://localhost:3000/statuses/' + id;
    return this.http.get<Status>(url);
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>('http://localhost:3000/statuses');
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post('http://localhost:3000/statuses', status);
  }

  deleteStatus(id: number): Observable<Status> {
    const url = 'http://localhost:3000/statuses/' + id;
    return this.http.delete<Status>(url);
  }

  updateStatus(status: Status, id: number) {
    const url = 'http://localhost:3000/statuses/' + id;
    return this.http.put<Status>(url, status);
  }
}
