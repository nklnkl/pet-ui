import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../app/http.service';
@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.html',
  styleUrls: ['sign-up.css']
})
export class SignUpComponent {
  private email: string;
  private password: string;
  private password2: string;
  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor (private service: HttpService, private router: Router) {
    this.error = false;
  }

  private signUp () : void {
    if (!this.email || !this.password || !this.password2) {
      this.error = true;
      this.errorTitle = 'Error!';
      this.errorMessage = 'Please enter your email, password, and confirm your password.';
      return;
    }
    if (this.password != this.password2) {
      this.error = true;
      this.errorTitle = 'Error!';
      this.errorMessage = 'Please make sure your password and password confirmation matches.';
      return;
    }
    this.service.signUp(this.email, this.password)
      .subscribe((result: number) => {
        console.log(result);
        if (result == 1 ) {
          this.error = true;
          this.errorTitle = 'Error!';
          this.errorMessage = 'Please enter your email, password, and confirm your password.';
          return;
        }
        if (result == 2 ) {
          this.error = true;
          this.errorTitle = 'Error!';
          this.errorMessage = 'We have encountered a server error, please try again later.';
          return;
        }
        this.router.navigate(['login']);
        return;
      });
  }
}
