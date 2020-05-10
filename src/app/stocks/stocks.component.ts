import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { StockObject } from '../stock';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: StockObject[];
  valueOfBought = [1000, 500, 300];
  editing: boolean;

  edit(index: number) {

    console.log("editing"+index);
    this.editing = true;

  }

  makeArray(size: number): any[] {
    return Array(size);
  }

  async getStocks() {

    let stockObject;

    try {
      stockObject = this.stockService.getStocks();
      await stockObject;
      this.stocks = stockObject["__zone_symbol__value"];
    } catch (error) {
      console.log(error);
    }

  }

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

}
