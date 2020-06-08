import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// let url = "https://manage-my-stocks-database.herokuapp.com/";
let url = "http://localhost:4000/";

@Injectable({
  providedIn: 'root'
})
export class GetStocksBoughtService {

  nameOfStock: any;

  saveStock(stockName: string) {
    // let link = url + 'stocks/' + idValue;
    // return this.http.put(link, stock).pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));
    console.log(stockName);
    let stock = {
      name: null,
      symbol: stockName,
      currentValue: null,
      openValue: null,
      closeValue: null,
      valueDiff: null,
    };

    return this.http.post('http://127.0.0.1:3000/stocks/save', stock, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  deleteStock(index: number): Observable<any> {
    return this.http.delete('http://127.0.0.1:3000/stocks/delete/' + index, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  editStock(value: string, index): Observable<any> {
    console.log(value);
    console.log(index);
    //why cant i pass strings for put 
    let temp = {
      stockName: value
    }
    return this.http.put('http://127.0.0.1:3000/stocks/edit/' + index, temp, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getStockBought(): Observable<any> {
    return this.http.get('http://127.0.0.1:3000/stocks/getAll', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(map(data => {
      console.log(data);
      this.nameOfStock = data;
      return data;
    }));
    // return this.http.get(url + 'stocks/all').pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));
  }

  constructor(private http: HttpClient) { }

}
