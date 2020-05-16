import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// let url = "https://manage-my-stocks-database.herokuapp.com/";
let url = "http://localhost:4000/";

@Injectable({
  providedIn: 'root'
})
export class GetStocksBoughtService {

  
  saveStock(stock, idValue) {
    let link = url + 'stocks/' + idValue;
    return this.http.put(link, stock).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  getStockBought(): Observable<any> {
    return this.http.get(url + 'stocks/all').pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  constructor(private http: HttpClient) { }
}
