import { Injectable } from '@angular/core';
import { GetStocksBoughtService } from './get-stocks-bought.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import fetch from 'node-fetch';

const key = process.env.KEY;
const url = 'https://manage-my-stocks-database.herokuapp.com';

// const key = require('../../key.json').key;
// const url = 'http://127.0.0.1:3000';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // this holds all the stocks that are in the database for display
  stocksDisplayed = [];
  // this holds all the stocks with updated values after the API calls 
  stocksObjects: any;
  // this holds whether or not a new stock is being added for display (only calls API when adding)
  adding: boolean;
  // this holds whether the API restrictions have been exceeded or not 
  exceededAPI: boolean;

  // for when API calls are exceeded, used in other files
  error = new BehaviorSubject(null);
  currentError = this.error.asObservable();

  // for when the refresh button is clicked
  refreshStocks = new BehaviorSubject(null);
  currentRefreshStocks = this.refreshStocks.asObservable();

  // for the message of the error 
  errorMessage = new BehaviorSubject(null);
  currentErrorMessage = this.errorMessage.asObservable();

  changeAPIVar(errorStatus: boolean) {
    this.error.next(errorStatus);
    this.exceededAPI = errorStatus;
  }

  changeRefreshVar(refresh: boolean) {
    this.refreshStocks.next(refresh);
  }

  changeErrorMes(message: any) {
    this.errorMessage.next(message);
  }

  getStocks(): Observable<any[]> {

    let name: string, _currentValue: number, _closeValue: number, _openValue: number;
    let countInner = 0;

    // getting the stocks array in the database
    this.stocksDisplayed = this.stocks.stocksSaved;
    this.stocksObjects = this.stocksDisplayed;

    // no error at first
    this.changeAPIVar(false);

    for (let count = 0; count < this.stocksDisplayed.length; count++) {

      // if adding, only need to call api for the one being added, the others just used old data from db
      if (this.adding && count != this.stocksDisplayed.length - 1) continue;

      let link = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + this.stocksDisplayed[count].symbol + `&interval=5min&apikey=${key}&outputsize=compact`;

      fetch(link)
        .then(res => res.json())
        .then(stocksData => {

          console.log(stocksData);

          // see if API was succesful or not
          try {
            name = stocksData["Meta Data"]["2. Symbol"];
          }

          catch (err) {
            this.changeAPIVar(true);
            this.exceededAPI = true;
            this.changeErrorMes(stocksData);
            console.log("An error has occured while attempting to call API: " + err);
          }

          // if API calls exceeded, return 
          if (this.exceededAPI) {

            // if adding, delete the stock that was added 
            if (this.adding) {
              this.stocks.deleteStock(count).subscribe(data => {
                this.changeRefreshVar(true);
              });
              this.adding = false;
            }
            return;

          }

          else if (this.adding && count == this.stocksDisplayed.length - 1) {
            this.adding = false;
          }

          let time = new Date();
          let lastProperty: any;
          countInner = 0;

          for (let property in stocksData["Time Series (5min)"]) {

            // getting the latest values 
            if (countInner == 0) {
              _currentValue = +stocksData["Time Series (5min)"][property]["1. open"];
              lastProperty = stocksData["Time Series (5min)"][property];
              countInner++;
              continue;
            }

            let dateString = (time.getFullYear().toString() + "-0" + (time.getMonth() + 1).toString() + "-" + time.getDate().toString());

            // getting the close and open values 
            if (dateString != property.substr(0, 10)) {
              _closeValue = +stocksData["Time Series (5min)"][property]["4. close"];;
              _openValue = +lastProperty["1. open"];
              break;
            }

            lastProperty = stocksData["Time Series (5min)"][property];

          }

          let stockObject = {
            name: (this.stocksDisplayed[count].name) ? this.stocksDisplayed[count].name : name,
            symbol: name,
            openValue: (_openValue).toFixed(2),
            closeValue: (_closeValue).toFixed(2),
            valueDiff: (_currentValue - _closeValue).toFixed(2),
            currentValue: (_currentValue).toFixed(2)
          }

          let indexOf: number;

          indexOf = this.stocksDisplayed.findIndex(obj => {
            return obj.symbol == name;
          });

          // updating the stockObject in its index 
          this.stocksObjects[indexOf] = stockObject;
          // updating the arrary object in the db 
          this.http.put(url + '/stocks/updateValues/' + indexOf, stockObject, {
            observe: 'body',
            withCredentials: true,
            headers: new HttpHeaders().append('Content-Type', 'application/json')
          }).subscribe(data => {
            console.log(data);
          });

        });

    }

    if (this.stocksDisplayed.length) {
      return of(this.stocksObjects);
    }

    else return of([]);

  }

  constructor(private stocks: GetStocksBoughtService, private http: HttpClient) {
    this.stocksObjects = [];
  }

}
