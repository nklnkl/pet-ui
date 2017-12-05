import { Component } from '@angular/core';
@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.html',
  styleUrls: ['sign-up.css']
})
export class SignUpComponent {
  private email: string;
  private password: string;
  private password2: string;
  private name: string;
  private birthday: number;
  private address: string;

  public signUp () : void {
    // HttpService.registration(email, password, password2, name, birthday, address)
  }
}
