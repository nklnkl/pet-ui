import { Component } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private session: boolean;

  constructor (private http: HttpService) {
    this.http.session.subscribe((session: boolean) => {
      this.session = session;
    });
  }
}
