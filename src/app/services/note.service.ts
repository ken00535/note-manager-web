import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NoteUnit } from '../model/note';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteData: NoteUnit = null;
  private notesData: NoteUnit[] = [];
  private pageData: number = 1;
  private queryTerm: string = "";

  constructor(private http: HttpClient) { }

  set selectedNote(note: NoteUnit) {
    this.noteData = note;
  }

  get selectedNote(): NoteUnit {
    return this.noteData;
  }

  set displayNotes(notes: NoteUnit[]) {
    this.notesData = notes;
  }

  get displayNotes(): NoteUnit[] {
    return this.notesData;
  }

  set page(p: number) {
    this.pageData = p;
  }

  get page(): number {
    return this.pageData;
  }

  set query(s: string) {
    this.queryTerm = s;
  }

  createHeader(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    };
    return httpOptions;
  }

  getNotes(query = ''): Observable<NoteUnit[]> {
    if (query === '') {
      query = this.queryTerm;
    } else {
      this.queryTerm = query;
    }
    let url = `/api/notes?kw=${query};page=${this.pageData}`
    return this.http.get<NoteUnit[]>(url, this.createHeader())
  }

  createNote(note: NoteUnit[]): Observable<any> {
    return this.http.post('/api/notes', note, this.createHeader());
  }

  deleteNote(note: NoteUnit): Observable<any> {
    return this.http.delete(`/api/notes/${note.id}`, this.createHeader());
  }

  updateNote(note: NoteUnit): Observable<any> {
    return this.http.put(`/api/notes/${note.id}`, note, this.createHeader());
  }
}
