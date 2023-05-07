import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  updateStatus(value: string, id: number): Observable<Status> {
    const url = 'http://localhost:3000/statuses/' + id;
    return this.http.put<Status>(url, value);
  }

  filterStatuses(filterValues: any): Observable<Status[]> {
    return this.getStatuses().pipe(
      map((statuses: Status[]) => {

        return statuses.filter((status: Status) => {
          let isMatch = true;

          for (const key in filterValues) {
            if (filterValues.hasOwnProperty(key) && filterValues[key]) {
              if (key === "value") {
                if (!status[key] || !status[key]!.toLowerCase().includes(filterValues[key].toLowerCase())) {
                  isMatch = false;
                  break;
                }
              } else if(status[key] === undefined && status[key] !== filterValues[key]){
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
