import { Component } from '@angular/core';
@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})
export class LoginComponent {
  private email: string;
  private password: string;

  public login() : void {
    // this does nothing yet.
    // HttpService.login(email, password); <= async result
  }
}
