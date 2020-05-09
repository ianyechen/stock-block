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

  async getStocks() {

    let stockObject = this.stockService.getStocks();

    // this.stockService.getStocks().subscribe(stockObject => {
      console.log(await stockObject);
      console.log(stockObject["__zone_symbol__value"]);
      this.stocks = (stockObject["__zone_symbol__value"]);

      
    // });
  }

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

}
