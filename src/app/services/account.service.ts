import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AccountUnit } from '../model/account';
import { EventbusService } from './eventbus.service';
import { EventType } from '../model/const/event-type';

export interface LoginResult {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private eventbus: EventbusService) { }

  login(account: AccountUnit) {
    let url = `/api/login`;
    return this.http.post(url, account, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(
      first(),
      map((res: Response) => (this.extractToken(res))),
      catchError(this.handleError),
    )
  }

  logout() {
    console.log('AccountService logout');
    localStorage.setItem('token', '');
    return new Observable(observer => {
      observer.next();
    })
  }

  extractToken(res: Response) {
    localStorage.setItem('token', res['token']);
    this.eventbus.broadcast(EventType.HAS_LOGGED_IN)
    return res;
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.message);
  }

}
