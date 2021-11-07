import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { AccountUnit } from '../model/account';

export interface LoginResult {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(account: AccountUnit) {
    let url = `/api/login`;
    return this.http.post(url, account, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(
      first(),
      map(this.extractToken),
      catchError(this.handleError),
    )
  }

  extractToken(res: Response) {
    localStorage.setItem('token', res['token']);
    return res;
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error.message);
  }

}
