import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapModel } from './models/map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient) { 

  }

  getLogs(): Observable<MapModel[]>{
    return this.http.get<MapModel[]>("http://192.168.0.129:8080/map");
  }
}
