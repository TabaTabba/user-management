import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Status } from '../models/statuses/status.model';
import { StatusFilter } from '../models/statuses/status-filter.model';
import { environment } from 'src/environmets/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatus(id: number): Observable<Status> {
    const url = `${environment.API_BASE_URI}/statuses/${id}`;
    return this.http.get<Status>(url);
  }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${environment.API_BASE_URI}/statuses`);
  }

  getStatusesWithCount(statusFilter: StatusFilter) {
    return this.http.get<Status[]>(`${environment.API_BASE_URI}/statuses?value_like=${statusFilter.value}&_page=${statusFilter._page}&_limit=${statusFilter._limit}`, { observe: 'response' })
      .pipe(map(response => {
        return {
          data: response?.body,
          count: +(response?.headers.get('X-Total-Count')!)
        };
      }));
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post(`${environment.API_BASE_URI}/statuses`, status);
  }

  deleteStatus(id: number): Observable<Status> {
    const url = `${environment.API_BASE_URI}/statuses/${id}`;
    return this.http.delete<Status>(url);
  }

  updateStatus(value: string, id: number): Observable<Status> {
    const url = `${environment.API_BASE_URI}/statuses/${id}`;
    return this.http.put<Status>(url, value);
  }
}