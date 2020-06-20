# Stock Block

A web application that allows users to keep track of their favourite stocks and record down all of their transactions history.

[Try it out now!](https://stock-block-101.herokuapp.com/)

## Get Started 

Register for an account using a unique email and username and proceed to login upon successful registration. That's all you need to do! Remember to keep your username and password safe and don't forget it! 

## Functionalities 

### Stock Values Page 
1. To **add** a stock for display, type in the stock symbol in the search bar and press the "add" button.
- After the stock is added, it will appear in one of the columns and you can **customize** the displayed name by pressing the "edit" button
- You will also be able to **delete** the stock by expanding out the drop-down menu 
2. To **refresh** the values obtained from Alpha Vantage API, press the "refresh" button and the values will be updated.
- Note that the API has a restriction of maximum 5 calls per minute and 500 calls per day
- Note that there may be a slight discrepancy between the data from Alpha Vantage and real-time values 

### Transactions Page
1. To **buy** a stock, fill in all the required information and press the "buy" button.
2. To **sell** a stock, press the "sell" button and fill in the required information in the modal. 
3. To **delete** any transactions, simply press the "delete" button beside the transaction.
4. To choose what to **display**, press the "display" button and select which transactions you would like to display (the default display is 'all')
