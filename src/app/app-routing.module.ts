import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StocksComponent } from './stocks/stocks.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
  { path: 'stocks', component: StocksComponent },
  { path: 'transactions', component: TransactionsComponent },
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
