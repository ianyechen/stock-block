// this service gets the current stock information from AlphaVantage 
import { Injectable } from '@angular/core';
import { StockObject } from './stock';

import fetch from 'node-fetch';
import { GetStocksBoughtService } from './get-stocks-bought.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const key = require('../../key.json').key;
// const key = process.env.KEY;
// const link = 'https://manage-my-stocks-database.herokuapp.com';
const url = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  nameOfStock = [];
  lastTimeUsedAPI: any;
  stocksObjects: any;
  adding: boolean;
  exceededAPI: boolean;
  
  event = new BehaviorSubject(null);
  currentMessage = this.event.asObservable();

  refreshStocks = new BehaviorSubject(null);
  refresh = this.refreshStocks.asObservable();

  errorMessage = new BehaviorSubject(null);
  errorM = this.errorMessage.asObservable();

  changeAPIVar(message: boolean) {
    this.event.next(message);
    this.exceededAPI = message;
  }

  changeRefreshVar(message: boolean) {
    this.refreshStocks.next(message);
  }

  changeErrorMes(message: any) {
    console.log(message);
    this.errorMessage.next(message);
  }

  getStocks(): Observable<any[]> {

    let name: string, openValue: number, closeValue: number, prevCloseValue: number;
    let countInner = 0;
    console.log("in getStocks()");
    this.nameOfStock = this.stocks.nameOfStock;
    console.log(this.nameOfStock);
    this.stocksObjects = this.nameOfStock;
    this.changeAPIVar(false);
    console.log(this.currentMessage);
    // let newTime = Date.now();
    // console.log(this.lastTimeUsedAPI);
    // console.log(newTime);
    // if (newTime - this.lastTimeUsedAPI <= 1000*60) {
    //   console.log("too soon");
    //   return of(this.nameOfStock);
    // }
    // this.lastTimeUsedAPI = newTime;

    // let stocks = [];

    for (let count = 0; count < this.nameOfStock.length; count++) {
      // for (let count = 0; count < 1; count++) {
      if (this.adding && count != this.nameOfStock.length - 1) {
        console.log("conitnue");
        continue;
      }


      let link = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + this.nameOfStock[count].symbol + `&apikey=${key}`;
      fetch(link)
        .then(res => res.json())
        .then(data => {

          console.log(data);
          try {
            name = data["Meta Data"]["2. Symbol"];
            // this.changeAPIVar(false);
          }
          catch (err) {
            this.changeAPIVar(true);
            this.exceededAPI = true;
            console.log(err);
            console.log(this.currentMessage);
            this.changeErrorMes(data);

            // if (this.adding) {
            //   this.http.delete(url + '/stocks/delete/' + count, {
            //     observe: 'body',
            //     withCredentials: true,
            //     headers: new HttpHeaders().append('Content-Type', 'application/json')
            //   }).subscribe(data2 => {
            //     console.log(data2);
            //   });
            // }
          }
          console.log(this.currentMessage);

          if (this.exceededAPI) {
            if (this.adding) {
              this.stocks.deleteStock(count).subscribe(data => {
                console.log(data);
                this.changeRefreshVar(true);
              });
              this.adding = false;
              console.log("deleting");
            }
            console.log("exceeded");
            return;
          }

          else if (this.adding && count == this.nameOfStock.length - 1) {
            this.adding = false;
            console.log("changing to false");

          }


          // getting the latest day and second latest day 
          for (let property in data["Time Series (Daily)"]) {

            if (countInner == 0) {
              closeValue = +data["Time Series (Daily)"][property]["4. close"];
              openValue = +data["Time Series (Daily)"][property]["1. open"];
              countInner++;
              continue;
            }

            else if (countInner == 1) {
              prevCloseValue = +data["Time Series (Daily)"][property]["4. close"];
              countInner = 0;
              break;
            }

          }

          let stockObject = {
            name: (this.nameOfStock[count].name) ? this.nameOfStock[count].name : name,
            symbol: name,
            openValue: (openValue).toFixed(2),
            closeValue: (closeValue).toFixed(2),
            valueDiff: (closeValue - openValue).toFixed(2),
            currentValue: (prevCloseValue).toFixed(2)
          }

          console.log(stockObject);
          let indexOf: number;
          console.log(this.nameOfStock);
          indexOf = this.nameOfStock.findIndex(obj => {
            console.log(obj);
            console.log(name);
            return obj.symbol == name;
          });
          console.log(indexOf);
          this.stocksObjects[indexOf] = stockObject;
          this.http.put(url + '/stocks/updateValues/' + indexOf, stockObject, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
          }).subscribe(data2 => {
            console.log(data2);
          });
        });

    }

    if (this.nameOfStock.length) {
      console.log(this.stocksObjects);
      return of(this.stocksObjects);
    }
    else return of([]);

  }

  constructor(private stocks: GetStocksBoughtService, private http: HttpClient) {
    // this.stocks.getStockBought().subscribe(data => {
    //   console.log(data);
    //   this.nameOfStock = data;
    //   console.log("got dats");
    // });
    this.stocksObjects = [];

  }

}
