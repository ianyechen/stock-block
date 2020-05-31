import { Component, OnInit } from '@angular/core';
import { TransactionObject } from '../transaction';
import { GetTransactionsService } from '../get-transactions.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  // holds all of the transactions 
  transactions: TransactionObject[];
  // holds the number for modal pop up and edit 
  modalNumber: number;
  // holds all the stock names for selecting which one to display 
  stockNames: String[];
  // holds the string name for the stock which is displaying 
  showHistory: string;
  // holds the total amount of money being displayed 
  totalAmountOfMoney: number;

  loggedIn: boolean;

  // changing the showHistory variable 
  editHistoryShown(type: string) {

    this.showHistory = type;
    this.totalAmountOfMoney = 0;

    for (let transaction of this.transactions) {
      if (transaction.name == type) this.totalAmountOfMoney += transaction.valueDiff;
      else if (type == 'all') this.totalAmountOfMoney += transaction.valueDiff;
    }

  }

  fillStockNames() {

    this.stockNames = [];
    for (let transaction of this.transactions) {
      if (!this.stockNames.includes(transaction.name) && transaction.valueSell != null) {
        this.stockNames.push(transaction.name);
      }
    }

  }

  // changes colour depending if it's a pos or neg number 
  getColour(value: string) {
    if (+value >= 0) return "text-success";
    else return "text-danger";
  }

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
      this.totalAmountOfMoney = 0;
      for (let transaction of this.transactions) {
        this.totalAmountOfMoney += transaction.valueDiff;
      }
    })
  }

  // editing the transactions (for selling)
  edit(transactionObject: TransactionObject) {
    this.getTransactionsService.editTransaction(transactionObject, this.modalNumber).subscribe(data => {
      console.log(data);
      this.get();
    });
  }

  // selling the stock 
  sell(valueSell: number, dateSell: string) {
    this.transactions[this.modalNumber].valueSell = valueSell;
    this.transactions[this.modalNumber].dateSell = dateSell;
    this.transactions[this.modalNumber].valueDiff = (valueSell - this.transactions[this.modalNumber].valueBuy) * this.transactions[this.modalNumber].numberBuy - 20;
    console.log(this.transactions[this.modalNumber]);
    this.edit(this.transactions[this.modalNumber]);
    (<HTMLInputElement>document.getElementById('formGroupvalueSell')).value = '';
    (<HTMLInputElement>document.getElementById('formGroupdateSell')).value = '';
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

  constructor(private getTransactionsService: GetTransactionsService, private user: UserService, private router: Router) {
    this.user.user().subscribe(
      data => {
        console.log(data);
        this.user.loggedIn = true;
        this.loggedIn = this.user.loggedIn;
      },
      error => this.router.navigate(['/login'])
    )
    this.showHistory = "all";
    this.totalAmountOfMoney = 0;
  }

  ngOnInit(): void {
    this.get();
  }

}
