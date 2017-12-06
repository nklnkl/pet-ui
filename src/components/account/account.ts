import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app/http.service';
import * as Moment from 'moment';
import {
  Account,
  AccountInterface
} from 'pet-entity';

@Component({
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['account.css']
})
export class AccountComponent implements OnInit {
  private email: string;
  private password: string;
  private password2: string;
  private name: string;
  private birthDate: any;
  private address: string;

  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor (private http: HttpService) {
    this.error = false;
  }

  public update () : void {
    let update: AccountInterface = {
      email: this.email,
      password: this.password,
      name: this.name,
      birthDate: Moment(this.birthDate).valueOf(),
      address: this.address,
      level: undefined,
      id: undefined,
      created: undefined,
      updated: undefined
    };
    this.http.updateAccount(update)
      .subscribe((result: number|Account) => {
        // If received error code instead of account.
        if (typeof result === 'number') {
           this.error = true;
           this.errorTitle = 'Error!';
           this.errorMessage = 'We have encountered an error! Please refresh the page or try again later.';
        }
      });
  }

  ngOnInit () {
    this.http.getAccount()
      .subscribe((result: number|Account) => {
        // If received error code instead of account.
        if (typeof result === 'number') {
           this.error = true;
           this.errorTitle = 'Error!';
           this.errorMessage = 'We have encountered an error! Please refresh the page or try again later.';
        }
        else {
          this.email = result.getEmail();
          this.name = result.getName();
          this.birthDate = Moment(result.getBirthDate()).format('YYYY-MM-DD');
          this.address = result.getAddress();
        }
      });
  }
}
