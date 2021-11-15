import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface BroadcastEvent {
  topic: string;
  payload: Object;
}

@Injectable({
  providedIn: 'root'
})
export class EventbusService {
  // event bus
  private static eventBus: Subject<BroadcastEvent> = new Subject<BroadcastEvent>();
  private static eventSubject = EventbusService.eventBus.asObservable();

  constructor() { }

  broadcast(topic: string, payload?: Object): void {
    const be: BroadcastEvent = { topic: topic, payload: payload };
    if (EventbusService.eventBus && !EventbusService.eventBus.isStopped) {
      EventbusService.eventBus.next(be);
    }
  }

  on(): Observable<BroadcastEvent> {
    return EventbusService.eventSubject;
  }

}
