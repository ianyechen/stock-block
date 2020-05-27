// this service gets, edits, and deletes the transaction history 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionObject } from './transaction';

const link = "http://localhost:4000";
// const link = 'https://manage-my-stocks-database.herokuapp.com;

@Injectable({
  providedIn: 'root'
})
export class GetTransactionsService {

  // buying a stock and saving it into the db 
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

    return this.http.put(link + '/transactions/2000', transaction).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));

  }

  // getting all the transactions 
  getTransaction(): Observable<any> {
    return this.http.get(link + '/transactions/2000').pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  // editing a transaction, used for when stocks are being sold 
  editTransaction(transactionObject: TransactionObject, indexNumber): Observable<any> {
    return this.http.put(link + '/editTransactions/' + indexNumber, transactionObject).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  // deleting an entire transaction
  deleteTransaction(indexNumber): Observable<any> {
    return this.http.delete(link + '/deleteTransactions/' + indexNumber).pipe(map((response: any) => {
      console.log(response);
      return response;
    }));
  }

  constructor(private http: HttpClient) { }

}
