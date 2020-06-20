import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const link = 'https://manage-my-stocks-database.herokuapp.com';
// const link = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class GetStocksBoughtService {

  // holds the stocks obtained from db 
  stocksSaved: any;

  // saving a stock into db (with only the symbol)
  saveStock(stockName: string) {

    let stock = {
      name: null,
      symbol: stockName,
      currentValue: null,
      openValue: null,
      closeValue: null,
      valueDiff: null,
    };

    return this.http.post(link + '/stocks/save', stock, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  deleteStock(index: number): Observable<any> {
    return this.http.delete(link + '/stocks/delete/' + index, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // editing the stock symbol to customized name 
  editStock(value: string, index): Observable<any> {

    let nameObj = {
      stockName: value
    }

    return this.http.put(link + '/stocks/edit/' + index, nameObj, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  // getting all the stocks in the db and saving a copy locally 
  getStockBought(): Observable<any> {
    return this.http.get(link + '/stocks/getAll', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }).pipe(map(stocksArray => {
      this.stocksSaved = stocksArray;
      return stocksArray;
    }));
  }

  constructor(private http: HttpClient) { }

}
