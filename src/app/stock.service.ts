import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { StockObject } from './stock';

import fetch from 'node-fetch';

const key = require('../key.json');

@Injectable({
  providedIn: 'root'
})
export class StockService {

  async getStocks(): Promise<StockObject[]> {

    let name: string, openValue: number, closeValue: number, prevCloseValue: number;
    let stocks = [];
    let nameOfStock = ["tsla", "shop", "shop.trt"];
    let stringOfProperty: string;
    let stocksClosed = false;
    let countInner = 0;

    for (let count = 0; count < nameOfStock.length; count++) {

      let link = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + nameOfStock[count] + `&apikey=${key.key}`;
      fetch(link)
        .then(res => res.json())
        .then(data => {

          console.log(data["Meta Data"]["2. Symbol"]);
          name = data["Meta Data"]["2. Symbol"];
          console.log(data);

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

          stocks.push(stockObject);

        });

    }

    console.log(stocks);
    return stocks;

  }

  constructor() { }

}
