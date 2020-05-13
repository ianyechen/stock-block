import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetStocksBoughtService {

  saveStock(stock) {
    let link = 'https://manage-my-stocks-database.herokuapp.com/items/' + stock._id;
    return this.http.put(link, stock).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  getStockBought(): Observable<any> {
    return this.http.get('https://manage-my-stocks-database.herokuapp.com/items/all').pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  constructor(private http: HttpClient) { }
}
