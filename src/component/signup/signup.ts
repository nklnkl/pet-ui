@Component({
  selector: 'signup-component',
  templateUrl: 'signup.html',
  styleUrls: ['signup.css']
})
class SignupComponent {
  private email: string;
  private password: string;
  private password2: string;
  private name: string;
  private birthday: number;
  private address: string;

  public signup () : void {
    // HttpService.registration(email, password, password2, name, birthday, address)
  }
}
