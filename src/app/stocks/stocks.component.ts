import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { StockObject } from '../stock';
import { StockBoughtObject } from '../boughtStocks';
import { GetStocksBoughtService } from '../get-stocks-bought.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  // holds all of the current stock information  
  stocks: StockObject[];
  // allows for editing or not of personal stock values 
  editing = [false, false, false];
  // holds all of the personal stock values 
  valueOfBought: any[];

  addNewStock(stockName: string) {
    // this.stockService
    this.getStockBoughtService.saveStock(stockName).subscribe(data => {
      console.log(data);

      this.getStockBoughtService.getStockBought().subscribe(data => {
        this.stocks = data;
        console.log(this.valueOfBought);
        this.apiCall();
      });
    });
  }

  // changes colour depending if it's a pos or neg number 
  getColour(value: string) {
    if (+value >= 0) return "text-success";
    else return "text-danger";
  }

  // changing the editing array for editing personal stock values 
  edit(index: number) {
    console.log("editing " + index);
    this.editing[index] = true;
  }

  delete(index: number) {
    console.log("deleting" + index);
    this.getStockBoughtService.deleteStock(index).subscribe(data => {
      console.log(data);
      this.getStocksBought();

    })
  }

  // saving the personal stock values into db
  save(index: number, value: string) {

    console.log("saving " + value + " into " + index);
    this.editing[index] = false;
    this.getStockBoughtService.editStock(value, index).subscribe(data => {
      console.log(data);
      this.getStocksBought();

    });
    // this.getStockBoughtService.saveStock({
    //   stockName: "test",
    //   stockNumber: 2,
    //   stockValue: (+value).toFixed(2)
    // }, index).subscribe(data => {
    //   console.log(data);
    //   this.valueOfBought = data;
    // })

  }

  makeArray(size: number): any[] {
    return Array(size);
  }

  // getting stocks from API call 
  getStocks() {

    let stockObject;
    console.log("hio");
    // try {
    this.stockService.getStocks().subscribe(data => {
      console.log(data);
      // this.stocks = [];
      this.stocks = data;
      // this.stockService.stocksObjects = [];
      // this.http.put('http://127.0.0.1:3000/stocks/updateValues', data, {
      //   observe: 'body',
      //   withCredentials: true,
      //   headers: new HttpHeaders().append('Content-Type', 'application/json')
      // }).subscribe(data2 => {
      //   console.log(data2);
      // });
    });

    // console.log(stockObject);

    // this.stocks = [];
    // this.stocks = stockObject["__zone_symbol__value"];
    // console.log(this.stocks);
    // this.http.put('http://127.0.0.1:3000/stocks/updateValues', this.stocks, {
    //   observe: 'body',
    //   withCredentials: true,
    //   headers: new HttpHeaders().append('Content-Type', 'application/json')
    // }).subscribe(data => {
    //   console.log(data);
    // });
    // } catch (error) {
    //   console.log(error);
    // }

  }

  apiCall() {
    this.getStockBoughtService.getStockBought().subscribe(data => {

      this.getStocks();
    });
  }

  // getting personal stocks values 
  getStocksBought() {

    this.getStockBoughtService.getStockBought().subscribe(data => {
      this.stocks = data;
      console.log(this.valueOfBought);
      // this.getStocks();
    });

  }

  constructor(private stockService: StockService,
    private getStockBoughtService: GetStocksBoughtService,
    private http: HttpClient) { }

  ngOnInit(): void {
    // this.getStocks();
    this.getStocksBought();
  }

}
