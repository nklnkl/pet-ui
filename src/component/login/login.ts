@Component({
  selector: 'login-component',
  templateUrl: 'login.html',
  styleUrls: ['login.css']
})
class LoginComponent {
  private email: string;
  private password: string;

  public login() : void {
    // this does nothing yet.
    // HttpService.login(email, password); <= async result
  }
}
