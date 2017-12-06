import { Component } from '@angular/core';
import { HttpService } from './http.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private session: boolean;

  constructor (private http: HttpService, private router: Router) {
    this.http.session.subscribe((session: boolean) => {
      this.session = session;
    });
  }

  logout () {
    this.http.logout();
    this.router.navigate(['pets']);
  }
}
