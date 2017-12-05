import { Component } from '@angular/core';
@Component({
  selector: 'account',
  templateUrl: 'account.html',
  styleUrls: ['account.css']
})
export class AccountComponent {
  private email: string;
  private password: string;
  private password2: string;
  private name: string;
  private birthday: number;
  private address: string;

  public update () : void {
    // AccountHttp.update();
  }
}
