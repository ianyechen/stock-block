import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { StockObject } from '../stock';
import { StockBoughtObject } from '../boughtStocks';
import { GetStocksBoughtService } from '../get-stocks-bought.service';

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

  // saving the personal stock values into db
  save(index: string, value: number) {

    console.log("saving " + value + " into " + index);
    this.editing[index] = false;

    this.getStockBoughtService.saveStock({
      stockName: "test",
      stockNumber: 2,
      stockValue: (+value).toFixed(2)
    }, index).subscribe(data => {
      console.log(data);
      this.valueOfBought = data;
    })

  }

  makeArray(size: number): any[] {
    return Array(size);
  }

  // getting stocks from API call 
  async getStocks() {

    let stockObject;

    try {
      stockObject = this.stockService.getStocks();
      await stockObject;
      this.stocks = [];
      this.stocks = stockObject["__zone_symbol__value"];
      console.log(this.stocks);
    } catch (error) {
      console.log(error);
    }

  }

  // getting personal stocks values 
  getStocksBought() {

    this.getStockBoughtService.getStockBought().subscribe(data => {
      this.valueOfBought = data;
      console.log(this.valueOfBought);
    });

  }

  constructor(private stockService: StockService,
    private getStockBoughtService: GetStocksBoughtService) { }

  ngOnInit(): void {
    this.getStocks();
    this.getStocksBought();
  }

}
