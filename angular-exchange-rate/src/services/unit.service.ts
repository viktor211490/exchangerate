import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Unit} from "../models/unit";


@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private baseUrl = 'http://localhost:8080' + '/api/unit';

  constructor(private http: HttpClient) {
  }

  getOne(id: string): Observable<Unit> {
    return this.http.get<Unit>(this.baseUrl+'/getone' + '/' + id);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl+ '/getList');
  }

  create(model: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.baseUrl}/create`, model);
  }

  update(model: Unit): Observable<Unit> {
    return this.http.put<Unit>(`${this.baseUrl}/update`, model);
  }

  delete(id: string): Observable<Unit> {
    return this.http.delete<Unit>(this.baseUrl + '/delete/' + id);
  }
}
