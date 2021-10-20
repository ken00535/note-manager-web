import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../model/note';

import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes')
  }

  createNote(note: Note[]): Observable<any> {
    return this.http.post('/api/notes', note);
  }

  deleteNote(note: Note): Observable<any> {
    return this.http.delete(`/api/notes/${note.id}`);
  }
}
