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

  stocks: StockObject[];
  editing = [false, false, false];
  valueOfBought: StockBoughtObject[];

  getColour(value: string) {
    if (+value >= 0) return "text-success";
    else return "text-danger";
  }

  edit(index: number) {
    console.log("editing " + index);
    this.editing[index] = true;
  }

  save(index: number, value: number) {

    console.log("saving " + value + " into " + index);
    this.editing[index] = false;

    this.getStockBoughtService.saveStock({
      _id: index,
      stockName: "test",
      stockNumber: 2,
      stockValue: (+value).toFixed(2)
    }).subscribe(data => {
      console.log(data);
      this.valueOfBought = data;
    })

  }

  makeArray(size: number): any[] {
    return Array(size);
  }

  async getStocks() {

    let stockObject;

    try {
      console.log("in stocks components");
      stockObject = this.stockService.getStocks();
      await stockObject;
      this.stocks = stockObject["__zone_symbol__value"];
      console.log(this.stocks);
    } catch (error) {
      console.log(error);
    }

  }

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
