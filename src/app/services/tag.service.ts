import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TagUnit } from '../model/tag';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  createHeader(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    };
    return httpOptions;
  }

  getTags(): Observable<TagUnit[]> {
    let url = `/api/tags`
    return this.http.get<TagUnit[]>(url, this.createHeader());
  }
}
