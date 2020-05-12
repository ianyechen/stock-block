import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class GetStocksBoughtService {

  saveStock(stock) {
    let link = "http://localhost:4000/items/"+stock._id;
    return this.http.put(link, stock).pipe(map((response: any) => {
      // response.json();
      console.log(response);
      return response;
    }));
  }

  getStockBought(): Observable<any> {
    console.log("went to get stock");

    return this.http.get('http://localhost:4000/items/all').pipe(map((response: any) => {
      console.log(response);
      return response;
      // response.json()
    }));
  }

  constructor(private http: HttpClient) { }
}
