// this service gets, edits, and deletes the transaction history 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post('http://127.0.0.1:3000/transactions/add', transaction, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
    // return this.http.put(link + '/transactions/2000', transaction).pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));

  }

  // getting all the transactions 
  getTransaction(): Observable<any> {
    // return this.http.get('http://127.0.0.1:3000/transactions/getAll').pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));
    return this.http.get('http://127.0.0.1:3000/transactions/getAll', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
    // return this.http.get(link + '/transactions/2000').pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));
  }

  // editing a transaction, used for when stocks are being sold 
  editTransaction(transactionObject: TransactionObject, indexNumber): Observable<any> {
    // return this.http.put(link + '/editTransactions/' + indexNumber, transactionObject).pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));
    console.log(transactionObject);
    return this.http.put('http://127.0.0.1:3000/transactions/edit/' + indexNumber, transactionObject, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // deleting an entire transaction
  deleteTransaction(indexNumber): Observable<any> {
    // return this.http.delete(link + '/deleteTransactions/' + indexNumber).pipe(map((response: any) => {
    //   console.log(response);
    //   return response;
    // }));
    return this.http.delete('http://127.0.0.1:3000/transactions/delete/' + indexNumber, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  constructor(private http: HttpClient) { }

}
