import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionObject } from './transaction';

// const link = 'https://manage-my-stocks-database.herokuapp.com';
const link = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class GetTransactionsService {

  // buying a stock and saving it into db (with no sell values and dates)
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

    return this.http.post(link + '/transactions/add', transaction, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });

  }

  // getting all the transactions 
  getTransaction(): Observable<any> {
    return this.http.get(link + '/transactions/getAll', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // editing a transaction, used for when stocks are being sold 
  editTransaction(transactionObject: TransactionObject, indexNumber): Observable<any> {
    return this.http.put(link + '/transactions/edit/' + indexNumber, transactionObject, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  // deleting an entire transaction
  deleteTransaction(indexNumber: any): Observable<any> {
    return this.http.delete(link + '/transactions/delete/' + indexNumber, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  constructor(private http: HttpClient) { }

}
