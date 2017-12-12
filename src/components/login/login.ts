import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpService } from '../../app/http.service';
@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;
  private error: boolean;
  private errorTitle: string;
  private errorMessage: string;

  constructor (private route: ActivatedRoute, private service: HttpService,
   private router: Router) {
    this.error = false;
  }

  ngOnInit () {
  }

  public login() : void {
    console.log(this.email, this.password);
    if (this.email == '' || this.password == '') {
      this.error = true;
      this.errorTitle = 'Error!';
      this.errorMessage = 'Please enter your email and password.';
      return;
    }
    this.service.login(this.email, this.password)
    .subscribe((result: number) => {
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
      this.router.navigate(['pets']);
      return;
    });
  }
}
