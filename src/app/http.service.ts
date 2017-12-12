import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  Account,
  AccountInterface,
  Session,
  SessionInterface,
  Pet,
  PetInterface
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
    let u: string = localStorage.getItem('accountId')
    if ( s && u ) {
      this.session.next(true);
    }
    else
      this.session.next(false);
  }

  /*
    observable codes:
      0: success
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
    observable codes:
      0: success
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
        localStorage.setItem('sessionId', response.body.id);
        localStorage.setItem('accountId', response.body.accountId);
        this.session.next(true);
        return 0;
      });
  }

  public logout () {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('accountId');
    this.session.next(false);
    /* for now, there is no log out api, just delete local cache.
    let url: string = 'http://45.55.65.220:10004/guest/session';
    let body: any = {email: email, password: password};
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.post<SessionInterface>(url, body, options)
      .map((response: HttpResponse<SessionInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        localStorage.setItem('sessionId', response.body.id);
        localStorage.setItem('accountId', response.body.accountId);
        this.session.next(true);
        return 0;
      });
    */
  }

  /*
    observable codes:
      account: success
      1: user id not provided, client error, not user error
      2: server error.
      3: account not found
  */
  public getAccount () : Observable<Account|number> {
    let url: string = 'http://45.55.65.220:10004/customer/account';
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'account-id': localStorage.getItem('accountId'),
      'session-id': localStorage.getItem('sessionId')
    });
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.get<AccountInterface>(url, options)
      .map((response: HttpResponse<AccountInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        if (response.status == 404) return 3;
        return new Account(response.body);
      });
  }

  /*
    observable codes:
      0: success
      1: user id not provided, client error, not user error
      2: server error.
  */
  public updateAccount (update: AccountInterface) : Observable<number> {
    let url: string = 'http://45.55.65.220:10004/customer/account';
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'account-id': localStorage.getItem('accountId'),
      'session-id': localStorage.getItem('sessionId')
    });
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.patch<AccountInterface>(url, update, options)
      .map((response: HttpResponse<AccountInterface>) => {
        if (response.status == 422) return 1;
        if (response.status == 500) return 2;
        return 0;
      });
  }

  /*
    observable codes:
      Array<Pet>: success
      2: server error.
  */
  public getPets (species?: number, breed?: number) : Observable<Array<Pet>|number> {
    let url: string = 'http://45.55.65.220:10004/guest/pet';
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.get<Array<PetInterface>>(url, options)
      .map((response: HttpResponse<Array<PetInterface>>) => {
        if (response.status == 500) return 2;
        let pets: Array<Pet> = [];
        response.body.forEach((pet: PetInterface) => {
          pets.push(new Pet(pet));
        });
        return pets;
      });
  }

  /*
    observable codes:
      0: success
      1: missing fields
      2: server error.
  */
  public submitPet (pet: PetInterface) : Observable<number> {
    let url: string = 'http://45.55.65.220:10004/customer/pet';
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'account-id': localStorage.getItem('accountId'),
      'session-id': localStorage.getItem('sessionId')
    });
    let options: any = { headers: headers, observe: 'response' };
    return this.httpClient.post<PetInterface>(url, pet, options)
      .map((response: HttpResponse<PetInterface>) => {
        return 0;
      });
  }
}
