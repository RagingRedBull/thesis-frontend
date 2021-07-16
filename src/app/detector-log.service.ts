import { Injectable } from '@angular/core';

import { DetectorLog } from './models/detector-log';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Pagination } from './models/pagination';
@Injectable({
  providedIn: 'root'
})
export class DetectorLogService {
  // READ: https://nehalist.io/working-with-models-in-angular/
  constructor(private http: HttpClient) { }

  getLogs(pageSize: number, page: number): Observable<Pagination<DetectorLog[]>>{
    let params = new HttpParams().append("page", page-1).append("pageSize", pageSize);
    return this.http.get<Pagination<DetectorLog[]>>("http://192.168.0.129:8080/logs",{params: params}).pipe(
      map((res) => {
        return <Pagination<DetectorLog[]>> {
          content: res.content,
          totalElements: res.totalElements,
          totalPages: res.totalPages
        }
      })
    );
  }
}
