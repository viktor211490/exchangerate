import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Unit} from "../models/unit";
import {UnitToUnit, UnitToUnitId} from "../models/unit-to-unit";


@Injectable({
  providedIn: 'root'
})
export class UnitToUnitService {
  private baseUrl = 'http://localhost:8080' + '/api';

  constructor(private http: HttpClient) {
  }

  getByDate(data: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/getByDate' + '/' + data);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl+ '/get');
  }

  create(model: UnitToUnit): Observable<UnitToUnit> {
    return this.http.post<UnitToUnit>(`${this.baseUrl}/create`, model);
  }
  createlist(model: Array<UnitToUnit>): Observable<Array<UnitToUnit>> {
    return this.http.post<Array<UnitToUnit>>(`${this.baseUrl}/createList`, model);
  }

  update(model: UnitToUnit): Observable<UnitToUnit> {
    return this.http.put<UnitToUnit>(`${this.baseUrl}/update`, model);
  }

  deleteAllByDate(data: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/delete/' + data);
  }
  //TODO: Не хорошо,но пока сойдёт. (Черевато ошибками при нормальной разработке.)
  deleteById(unit: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete`, unit);
  }
}
