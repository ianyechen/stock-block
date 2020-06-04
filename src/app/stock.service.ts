// this service gets the current stock information from AlphaVantage 
import { Injectable } from '@angular/core';
import { StockObject } from './stock';

import fetch from 'node-fetch';
import { GetStocksBoughtService } from './get-stocks-bought.service';

// const key = require('../key.json').key;
const key = process.env.KEY;

@Injectable({
  providedIn: 'root'
})
export class StockService {

  nameOfStock = [];

  async getStocks(): Promise<StockObject[]> {

    let name: string, openValue: number, closeValue: number, prevCloseValue: number;
    let stocks = [];
    let countInner = 0;
    console.log("in getStocks()");
    for (let count = 0; count < this.nameOfStock.length; count++) {

      let link = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + this.nameOfStock[count].symbol + `&apikey=${key}`;
      fetch(link)
        .then(res => res.json())
        .then(data => {

          console.log(data);
          name = data["Meta Data"]["2. Symbol"];

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
            name: name,
            openValue: (openValue).toFixed(2),
            closeValue: (closeValue).toFixed(2),
            valueDiff: (closeValue - openValue).toFixed(2),
            prevCloseValue: (prevCloseValue).toFixed(2)
          }

          let indexOf: number;
          console.log(this.nameOfStock);
          indexOf = this.nameOfStock.findIndex(obj => {
            console.log(obj);
            console.log(name);
            return obj.symbol == name;
          });
          console.log(indexOf);
          stocks[indexOf] = stockObject;

        });

    }

    console.log(stocks);
    return stocks;

  }

  constructor(private stocks: GetStocksBoughtService) {
    this.stocks.getStockBought().subscribe(data => {
      console.log(data);
      this.nameOfStock = data;
      console.log("got dats");
    });
  }

}
