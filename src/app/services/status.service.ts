import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Status } from '../models/statuses/status.model';
import { StatusFilter } from '../models/statuses/status-filter.model';

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

  getStatusesWithCount(statusFilter: StatusFilter) {
    return this.http.get<Status[]>(`http://localhost:3000/statuses?value_like=${statusFilter.value}&_page=${statusFilter._page}&_limit=${statusFilter._limit}`, { observe: 'response' })
      .pipe(map(response => {
        return {
          data: response?.body,
          count: +(response?.headers.get('X-Total-Count')!)
        };
      }));
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post('http://localhost:3000/statuses', status);
  }

  deleteStatus(id: number): Observable<Status> {
    const url = 'http://localhost:3000/statuses/' + id;
    return this.http.delete<Status>(url);
  }

  updateStatus(value: string, id: number): Observable<Status> {
    const url = 'http://localhost:3000/statuses/' + id;
    return this.http.put<Status>(url, value);
  }
  
}
