import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  Account,
  AccountInterface,
  Session,
  SessionInterface
} from 'pet-entity';

@Injectable()
export class HttpService {

  public session: BehaviorSubject<boolean>;

  constructor (private httpClient: HttpClient) {
    this.session = new BehaviorSubject<boolean>(false);
    this.checkSession();
  }

  private checkSession () : void {
    let s: string = localStorage.getItem('sessionId')
    let u: string = localStorage.getItem('userId')
    if ( s && u ) {
      this.session.next(true);
    }
    else
      this.session.next(false);
  }

  /*
    observable error codes:
      1: invalid email/password,
      2: server error.
  */
  public signUp (email: string, password: string) : Observable<number> {
    let url: string = 'http://45.55.65.220:10004/guest/account';
    let body: any = {email: email, password: password};
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.post<AccountInterface>(url, body, options)
      .map((response: HttpResponse<AccountInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        return 0;
      });
  }

  /*
    observable error codes:
      1: invalid email/password,
      2: server error.
  */
  public login (email: string, password: string) : Observable<number> {
    let url: string = 'http://45.55.65.220:10004/guest/session';
    let body: any = {email: email, password: password};
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.post<SessionInterface>(url, body, options)
      .map((response: HttpResponse<SessionInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        localStorage.setItem('sessionId', response.body.id);
        localStorage.setItem('userId', response.body.userId);
        this.session.next(true);
        return 0;
      });
  }

  /*
    observable error codes:
      1: user id not provided, client error, not user error
      2: server error.
  */
  public getAccount () : Observable<Account|number> {
    let url: string = 'http://45.55.65.220:10004/customer/account';
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId'),
      'session-id': localStorage.getItem('sessionId')
    });
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.get<AccountInterface>(url, options)
      .map((response: HttpResponse<AccountInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        this.session.next(true);
        return new Account(response.body);
      });
  }

  /*
    observable error codes:
      1: user id not provided, client error, not user error
      2: server error.
  */
  public updateAccount (update: AccountInterface) : Observable<Account|number> {
    let url: string = 'http://45.55.65.220:10004/customer/account';
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId'),
      'session-id': localStorage.getItem('sessionId')
    });
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.patch<AccountInterface>(url, update, options)
      .map((response: HttpResponse<AccountInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        this.session.next(true);
        return new Account(response.body);
      });
  }
}
