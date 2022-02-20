import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly APIUrl = "http://localhost:42704";

  constructor(private httpClient: HttpClient) { }

  getCryptoCurrencyData(records: number) {
    return this.httpClient.get<any>(this.APIUrl + `/cryptocurrency?records=${records}`)
      .pipe(map((result) => {
        return result.data;
      }));
  }
}
