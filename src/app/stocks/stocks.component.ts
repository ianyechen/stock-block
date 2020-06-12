import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { UserService } from '../user.service';
import { StockObject } from '../stock';
import { GetStocksBoughtService } from '../get-stocks-bought.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  link: String;
  url: string = "https://www.google.com/search?q=";
  urlSafe: SafeResourceUrl;
  exceededAPI: boolean;

  addNewStock(stockName: string) {
    // this.stockService
    // let indexOf = this.getStockBoughtService.nameOfStock.findIndex(obj => {
    //   console.log(obj);
    //   console.log(name);
    //   return obj.symbol == stockName;
    // });
    // console.log(indexOf);
    // if (this.getStockBoughtService.nameOfStock)
    console.log(this.getStockBoughtService.nameOfStock.length);
    this.getStockBoughtService.saveStock(stockName).subscribe(data => {
      console.log(data);
      this.stockService.adding = true;
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
      // if (data.length != this.stockService.nameOfStock.length) {
      //   this.getStocksBought();
      //   console.log("here");
      //   console.log(data.length );
      //   console.log(this.stockService.nameOfStock.length );

      // }
      // else {
      console.log(data);
      this.stocks = data;
      console.log(this.stocks);
      // }

      // this.getStocksBought();


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
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private user: UserService,
    private router: Router) {
    this.user.user().subscribe(
      data => {
        console.log(data);
        // this.user.loggedIn = true;
        // this.loggedIn = true;
        this.user.changeLoggedIn(true);
      },
      error => this.router.navigate(['/login'])
    );
    this.stockService.currentMessage.subscribe(data => {
      console.log(data);
      this.exceededAPI = data;
    });
  }

  ngOnInit(): void {
    // this.getStocks();
    this.getStocksBought();
    // this.link = "https://www.google.com/search?q=shop+stocks&rlz=1C1CHBF_enCA778CA779&oq=shop+stocks&aqs=chrome.0.69i59j69i57j69i59j69i64j69i60l4.1069j0j1&sourceid=chrome&ie=UTF-8";
    // this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/search?q=shop+stocks&rlz=1C1CHBF_enCA778CA779&oq=shop+stocks&aqs=chrome.0.69i59j69i57j69i59j69i64j69i60l4.1069j0j1&sourceid=chrome&ie=UTF-8");
    // this.urlSafe[1] = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/search?q=shop+stocks&rlz=1C1CHBF_enCA778CA779&oq=shop+stocks&aqs=chrome.0.69i59j69i57j69i59j69i64j69i60l4.1069j0j1&sourceid=chrome&ie=UTF-8");

  }

}
