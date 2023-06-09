import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Transaction } from 'src/app/model/transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-fund',
  templateUrl: './add-fund.component.html',
  styleUrls: ['./add-fund.component.css']
})

export class AddFundComponent {
  @Input()
  transaction : Transaction  = {
    transactionId: 0,
    timestamp: 0,
    description: '',
    transactionType: '',
    amount: 0,
    balance: 0
  }

  //inputAmount: Number = 0;
  buttonClickMessage = "";
  selectAccount: any;

  showInputBox : boolean = false;

  selectBox : HTMLSelectElement | null = null;

  constructor(
    private userService : UserService, 
    public accountService : AccountService, 
    public transactionService : TransactionService, 
    private router : Router
    ) { }

  to : Account = {}

  postDeposit(): void {
    if (this.transaction.amount !== undefined 
      && this.transaction.amount > 0
      && this.to.accountId != undefined
    ){

      const currentDate = new Date();
      let transaction : Transaction  = {transactionType: "Deposit", amount: this.transaction.amount};

      transaction.timestamp = currentDate.getTime();
      transaction.description = "Deposited Amount: " + this.transaction.amount;
      transaction.transactionType = "Deposit"
      // transaction.moneyAccount = {accountId: this.to.accountId};
      transaction.moneyAccount = {accountId: this.to.accountId};

      this.transactionService.lastDeposit = this.transaction.amount;
      this.transactionService.deposit(transaction);

      this.thanksMessage();
      this.showInputBox = false;
    }
  }

  thanksMessage() {
    this.buttonClickMessage = "Thanks for your deposit!";
  }

  setTo(e : Account): void{
    this.to = e;
  }

  onSelect(event : any) {
    const target = event.target as HTMLSelectElement;
    const value = Number.parseInt(target.value);
    if (value > 0) {

      let accountId : number = value;
      this.setTo(this.accountService.accounts.filter(x => x.accountId === accountId)[0])
      this.showInputBox = true;
    } else {
      this.showInputBox = false;
    }
  }

  ngOnInit(){

  }
}
