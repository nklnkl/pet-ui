@Component({
  selector: 'account-component',
  templateUrl: 'account.html',
  styleUrls: ['account.css']
})
class AccountComponent {
  private email: string;
  private password: string;
  private password2: string;
  private name: string;
  private birthday: number;
  private address: string;

  public update (email,  password,  name,  birthday,  address) : void {
    // HttpService.update();
  }
}
