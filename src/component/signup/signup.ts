@Component({
  selector: 'signup-component',
  templateUrl: 'signup.html',
  styleUrls: ['signup.css']
})
class SignupComponent {
  private email: string;
  private password: string;
  private name: string;
  private birthday: number;
  private address: string;
}
