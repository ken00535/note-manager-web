import { Injectable } from '@angular/core';
import { EventType } from '../model/const/event-type';
import { AccountService } from './account.service'
import { EventbusService } from './eventbus.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  public isLogged = false;

  constructor(private eventbus: EventbusService) {
    if (localStorage.getItem('token') !== '') {
      this.isLogged = true;
    }
    this.eventbus.on()
      .subscribe((message) => {
        if (message.topic === EventType.HAS_LOGGED_IN) {
          this.isLogged = true;
        } else if (message.topic === EventType.HAS_LOGGED_OUT) {
          this.isLogged = false;
        }
      });
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }
}
