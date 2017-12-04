@Component({
  selector: 'account-component',
  templateUrl: 'account.html',
  styleUrls: ['account.css']
})
class AccountComponent {
  //private email: string; needed/are they allowed to change email?
  private password: string;
  private name: string;
  private birthday: number;
  private address: string;
}
