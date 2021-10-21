import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteUnit } from '../model/note';

import { Observable } from 'rxjs';
import { of as ObservableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteData: NoteUnit = null;

  constructor(private http: HttpClient) { }

  set selectedNote(note: NoteUnit) {
    this.noteData = note;
  }

  get selectedNote(): NoteUnit {
    return this.noteData;
  }

  getNotes(): Observable<NoteUnit[]> {
    return this.http.get<NoteUnit[]>('/api/notes')
  }

  createNote(note: NoteUnit[]): Observable<any> {
    return this.http.post('/api/notes', note);
  }

  deleteNote(note: NoteUnit): Observable<any> {
    return this.http.delete(`/api/notes/${note.id}`);
  }

  updateNote(note: NoteUnit): Observable<any> {
    return this.http.put(`/api/notes/${note.id}`, note);
  }
}
