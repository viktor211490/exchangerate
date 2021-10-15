import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BankDataService {
  // private baseUrl = 'https://www.cbr-xml-daily.ru/latest.js';
  // private baseUrl = 'https://www.cbr-xml-daily.ru/archive/2021/10/11/daily_json.js';
  private baseUrl = 'https://www.cbr-xml-daily.ru/archive/2021/10/13/daily_json.js';

  constructor(private http: HttpClient) {
  }
  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
