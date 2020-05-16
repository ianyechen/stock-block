import { Component, OnInit } from '@angular/core';
import { TransactionObject } from '../transaction';
import { GetTransactionsService } from '../get-transactions.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  // holds all of the transactions 
  transactions: TransactionObject[];
  modalNumber: number;

  // saving a transaction (only bought)
  save(name: string, valueBuy: number, dateBuy: number, numberBuy: number) {
    this.getTransactionsService.saveTransaction(name, valueBuy, dateBuy, numberBuy).subscribe(data => {
      console.log(data);
      this.get();
    })
  }

  // getting all transactions 
  get() {
    this.getTransactionsService.getTransaction().subscribe(data => {
      console.log(data);
      this.transactions = data.item.array;
    })
  }

  edit(transactionObject: TransactionObject) {
    this.getTransactionsService.editTransaction(transactionObject, this.modalNumber).subscribe(data => {
      console.log(data);
      this.get();
    });
  }

  sell(valueSell: number, dateSell: string) {
    this.transactions[this.modalNumber].valueSell = valueSell;
    this.transactions[this.modalNumber].dateSell = dateSell;
    this.transactions[this.modalNumber].valueDiff = (valueSell - this.transactions[this.modalNumber].valueBuy) * this.transactions[this.modalNumber].numberBuy;
    console.log(this.transactions[this.modalNumber]);
    this.edit(this.transactions[this.modalNumber]);
  }

  delete(index: number) {
    this.getTransactionsService.deleteTransaction(index).subscribe(data => {
      console.log(data);
      this.get();
    })
  }

  updateDataForModal(index: number) {
    console.log(index);
    console.log(this.transactions[index]);
    this.modalNumber = index;
  }

  constructor(private getTransactionsService: GetTransactionsService) { }

  ngOnInit(): void {
    this.get();
  }

}
