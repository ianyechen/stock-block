import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionObject } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class GetTransactionsService {

  saveTransaction(name: string, valueBuy: any, dateBuy: any, numberBuy: any): Observable<any> {

    let transaction = {
      name: name,
      valueBuy: valueBuy,
      dateBuy: dateBuy,
      numberBuy: numberBuy,
      valueSell: null,
      dateSell: null,
      valueDiff: null,
    }

    // let link = 'https://manage-my-stocks-database.herokuapp.com/items/' + 2000;
    return this.http.put('http://localhost:4000/transactions/2000', transaction).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));

  }

  getTransaction(): Observable<any> {

    // let link = 'https://manage-my-stocks-database.herokuapp.com/items/' + 2000;
    return this.http.get('http://localhost:4000/transactions/2000').pipe(map((response: any) => {
      console.log(response);
      return response;
    }));

  }

  editTransaction(transactionObject: TransactionObject, indexNumber): Observable<any> {
    return this.http.put('http://localhost:4000/editTransactions/' + indexNumber, transactionObject).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  deleteTransaction(indexNumber): Observable<any> {
    return this.http.delete('http://localhost:4000/deleteTransactions/' + indexNumber).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }
  constructor(private http: HttpClient) { }

}
