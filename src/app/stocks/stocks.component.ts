import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { UserService } from '../user.service';
import { StockObject } from '../stock';
import { GetStocksBoughtService } from '../get-stocks-bought.service';
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
  editing = [];
  // whether or not user has exceeded number of API calls 
  exceededAPI: boolean;
  // error message to be shown for the user when error occurs 
  errorMessage: String = "";

  // adding a new stock to be displayed 
  addNewStock(stockName: string) {

    let indexOf = this.getStockBoughtService.stocksSaved.findIndex(obj => {
      return obj.symbol == stockName;
    });

    // if the item is found in the array, display error message, only calls API if it's a new item 
    if (indexOf == -1) {

      this.getStockBoughtService.saveStock(stockName).subscribe(data => {
        this.stockService.adding = true;
        this.getStockBoughtService.getStockBought().subscribe(data => {
          this.stocks = data;
          this.apiCall();
        });
      });

    }

    else {
      this.exceededAPI = true;
      this.errorMessage = "Stock item is already displayed."
    }

  }

  // changes colour depending if it's a positive or negative number 
  getColour(value: string) {
    if (+value >= 0) return "text-success";
    else return "text-danger";
  }

  // changing the editing array for editing personal stock values 
  edit(index: number) {
    console.log("Editing " + index);
    this.editing[index] = true;
  }

  delete(index: number) {
    console.log("Deleting" + index);
    this.getStockBoughtService.deleteStock(index).subscribe(data => {
      this.getStocksBought();
    });
  }

  // saving the cutomized stock names into db
  save(index: number, value: string) {

    console.log("Saving " + value + " into " + index);

    this.editing[index] = false;
    this.getStockBoughtService.editStock(value, index).subscribe(data => {
      this.getStocksBought();
    });

  }

  makeArray(size: number): any[] {
    return Array(size);
  }

  // getting stocks from API call 
  getStocks() {
    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
      console.log("Stocks displaying: " + this.stocks);
    });
  }

  apiCall() {
    this.getStockBoughtService.getStockBought().subscribe(data => {
      this.getStocks();
    });
  }

  // getting personal stocks values from db 
  getStocksBought() {
    this.getStockBoughtService.getStockBought().subscribe(data => {
      // if any values are null, disregard that item 
      if (data[data.length - 1] != null && data[data.length - 1].valueDiff == null) data.splice(data.length - 1, 1);
      this.stocks = data;
    });
  }

  constructor(private stockService: StockService,
    private getStockBoughtService: GetStocksBoughtService,
    private user: UserService,
    private router: Router) {

    // checking if the user is validated 
    this.user.validate().subscribe(
      data => {
        this.user.changeLoggedIn(true);
      },
      error => this.router.navigate(['/login'])
    );

    // checking for if there was an error 
    this.stockService.currentError.subscribe(data => {
      this.exceededAPI = data;
    });

    // checking for if there are stocks being refreshed 
    this.stockService.currentRefreshStocks.subscribe(data => {
      if (data == true) {
        this.getStocksBought();
        this.stockService.changeRefreshVar(false);
      };
    });

    // checking for the error messages 
    this.stockService.currentErrorMessage.subscribe(data => {
      if (data != null) {
        let message = data["Error Message"] || data["Note"];
        if (message.includes("Invalid")) this.errorMessage = 'Incorrect symbol. Please enter a valid stock symbol (Eg. "tsla", "msft")';
        else if (message.includes("standard")) this.errorMessage = "Exceeded maximum API call frequency (5 calls per minute and 500 calls per day). Please try again later.";
      }
    });

    this.exceededAPI = false;

  }

  ngOnInit(): void {
    this.getStocksBought();
  }

}
